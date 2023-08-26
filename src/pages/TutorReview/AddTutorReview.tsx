import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { useToastHook } from "../../utils/toastHooks";
import { Toast } from "primereact/toast";
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { useNavigate } from "react-router-dom";
import { Rating } from "primereact/rating";
import { InputTextarea } from "primereact/inputtextarea";
import { PageLink } from "../../constants/Constant";
import { CustomizedState } from "../../constants/Model";
import { REMARKS_SIZE } from "../../constants/Validation";
import axios from "axios";
import { Subdomain } from "../../constants/Subdomain";
import { getUrl, getProfileName, getSessionToken, getProfileId } from "../../utils/apiUtils";
import { GetRequestResponse } from '../ManageSessions/IncomingRequestCard';
import { useLocation } from "react-router-dom";

type IOption = { id: any; name: any };
const AddTutorReview = () => {
    const location = useLocation();
    const [toast] = useToastHook()
    const navigate = useNavigate();
    const [rating, setRating] = useState<any>(null);
    const [comment, setComment] = useState('');
    const [tuitionOrderList, setTuitionOrderList] = useState<GetRequestResponse[]>();

    const data = location.state as CustomizedState; // Type Casting, then you can get the params passed via router
    const [tutorList, setTutorList] = useState<IOption[] | []>();

    const [sessionList, setSessionList] = useState<IOption[] | []>();
    const [session, setSession] = useState('');

    const addReview = () => {
        const url = getUrl(Subdomain.REVIEW_MGR, '/review');
        axios.post(url, {
            name: getProfileName(),
            sessionToken: getSessionToken(),
            rating: rating,
            comment: comment,
            id: data.tutorId,
            tutionOrderID: session
        }).then(res => {
            toast?.current?.show({ severity: 'success', content: successUpdate(), closable : false, life: 5000 });
            setTimeout(() => { navigate(PageLink.TUTOR_REVIEW, { state: data }); }, 1000 );
        }).catch(err => {
        });
    };

    const successUpdate = () => {
        return (
            <div className="flex flex-row align-items-center" style={{flex: '1'}}>
                <div className="flex mx-3">
                    <i className="text-xl text-green fa-solid fa-circle-check"></i>
                </div>
                <div className="flex flex-1 flex-column">
                    <label className="flex text-lg text-green font-bold">Successfully submitted</label>
                    <label className="text-xs text-white font-normal">New review has been successfully submitted.</label>
                </div>
            </div>
        );
    };

    const isButtonDisabled = (session === '' || rating === null || comment === ''); // Disable button when inputValue is empty

    const tuitionTaken = (tuition: GetRequestResponse):boolean =>{
        return true;
    };

    const getTuitionOrderList = () => {
        const url = getUrl(Subdomain.TUITION_ORDER_MGR, '/detailedTuitionOrders');
        axios.get<GetRequestResponse[]>(url, {
            params: {
                name: getProfileName(),
                sessionToken: getSessionToken()
            }
        }).then(res => {
            const filteredList = res.data?.filter(record => (record.status === 1 && record.studentId === getProfileId() && record.tutorId === data.tutorId && tuitionTaken(record)));
            const tutorMapList = filteredList
                                    .map(element=> { return { id: element.tutorId, name: element.tutorName }; } )
                                    .filter((thing, i, arr) => arr.findIndex(t => t.id === thing.id) === i ) ?? [];
            setTutorList(tutorMapList);
            const sessions = filteredList?.filter(element=> element.tutorId === data.tutorId).map(element => { return { id: element.id, name: element.selectedDates.replace('[','').replace(']','') }; } ) ?? [];
            setSessionList(sessions);
        }).catch(err => {
        });
    };

    const cancelReview = () => { navigate(PageLink.TUTOR_REVIEW, { state: data }); };

    useEffect(() => { getTuitionOrderList(); }, [navigate])

    return (
        <div className="global-component">
            <Toast ref={toast} />
            <Card>
            <div className="flex flex-column p-3 gap-3">
                <label className="flex flex-1 text-xl font-bold text-orange">New Review for {data.tutorName}</label>
                <div className="flex flex-row flex-wrap justify-content-between align-items-center gap-3">
                    <div className="flex flex-row gap-2">
                        <div className="flex flex-column gap-2">
                            <label className="flex flex-1 text-sm font-semibold text-black">Tutor Date <span className="text-red">*</span></label>
                            <Dropdown   value={session} options={sessionList} optionLabel="name" optionValue="id"
                                        style={{ width:'20rem' }}
                                        onChange={(e: { value: any }) => { setSession(e.value); } }/>
                        </div>
                    </div>
                    <div className="flex flex-column gap-3">
                        <div className="flex flex-row align-items-center gap-3">
                            <label className="flex text-base font-semibold text-black">Rating <span className="text-red">*</span></label>
                            <Rating value={rating} cancel={false} onChange={(e) => setRating(e.target.value)}
                                    tooltip="Rating of service" tooltipOptions={{ event: 'both', position: 'top' }}/>
                        </div>
                        <label className="flex text-xs text-right font-normal text-orange">Lowest 1 Star, Highest 5 Stars</label>
                    </div>
                </div>
                <div className="flex flex-column">
                    <InputTextarea  className="comment" value={comment} onChange={(e) => setComment(e.target.value)} autoResize
                                    maxLength={REMARKS_SIZE}
                                    tooltip="Review summary of tutoring services experience" tooltipOptions={{ event: 'both', position: 'top' }}/>
                </div>
                <div className="flex flex-1 justify-content-end mt-4">
                    <Button label="Cancel" className="p-button-secondary flex" onClick={ cancelReview } />
                    <Button icon="pi pi-send" label="Submit" className="p-button-primary flex" onClick={ addReview } disabled={isButtonDisabled}/>
                </div>
                </div>
            </Card>
        </div>
    )
}
export { AddTutorReview }