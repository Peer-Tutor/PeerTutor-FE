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
import axios from "axios";
import { Subdomain } from "../../constants/Subdomain";
import { getUrl, getProfileName, getSessionToken, getProfileId } from "../../utils/apiUtils";
import { GetRequestResponse } from '../ManageSessions/IncomingRequestCard';

type IOption = { id: any; name: any };
const AddTutorReview = () => {
    const [toast] = useToastHook()
    const navigate = useNavigate();
    const [rating, setRating] = useState<any>(null);
    const [comment, setComment] = useState('');
    const [tuitionOrderList, setTuitionOrderList] = useState<GetRequestResponse[]>();

    const [tutorList, setTutorList] = useState<IOption[] | []>();
    const [tutorId, setTutorId] = useState('');

    const [sessionList, setSessionList] = useState<IOption[] | []>();
    const [session, setSession] = useState('');

    const addReview = () => {
        const url = getUrl(Subdomain.REVIEW_MGR, '/reviews');
        axios.post(url, {
            name: getProfileName(),
            sessionToken: getSessionToken(),
            rating: rating,
            comment: comment,
            id: 2,
            tutionOrderID: 21
        }).then(res => {
            navigate(PageLink.TUTOR_REVIEW);
        }).catch(err => {
        });
    };

    const isButtonDisabled = (tutorId === '' || session === '' || rating === null || comment === ''); // Disable button when inputValue is empty

    const tuitionTaken = (tuition: GetRequestResponse):boolean =>{ return true; };

    const getTuitionOrderList = () => {
        const url = getUrl(Subdomain.TUITION_ORDER_MGR, '/detailedTuitionOrders');
        axios.get<GetRequestResponse[]>(url, {
            params: {
                name: getProfileName(),
                sessionToken: getSessionToken()
            }
        }).then(res => {
            const filteredList = res.data?.filter(record => (record.status === 1 && record.studentId === getProfileId() && tuitionTaken(record)));
            const tutorMapList = filteredList.map(element=> { return { id: element.tutorId, name: element.tutorName }; } ) ?? [];
            setTutorList(tutorMapList);
            setTuitionOrderList(filteredList);
        }).catch(err => {
        });
    };

    const resetSession = (e: { value: any }) => {
        setTutorId(e.value);
        setSession('');
        const sessions = tuitionOrderList?.filter(element=> element.tutorId === e.value).map(element => { return { id: element.id, name: element.selectedDates.replace('[','').replace(']','') }; } ) ?? [];
        setSessionList(sessions);
    }

    const cancelReview = () => { navigate(PageLink.TUTOR_REVIEW); };

    useEffect(() => { getTuitionOrderList(); }, [navigate])

    return (
        <div className="global-component">
            <Toast ref={toast} />
            <Card>
            <div className="flex flex-column p-3 gap-3">
                <label className="flex flex-1 text-xl font-bold text-orange">New Review</label>
                <div className="flex flex-row flex-wrap justify-content-between align-items-center gap-3">
                    <div className="flex flex-row gap-2">
                        <div className="flex flex-column gap-2">
                            <label className="flex flex-1 text-sm font-semibold text-black">Tutor Name <span className="text-red">*</span></label>
                            <Dropdown   value={tutorId} options={tutorList} optionLabel="name" optionValue="id"
                                        style={{ width:'20rem' }}
                                        onChange={resetSession}/>
                        </div>
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
                                    tooltip="Rating of service" tooltipOptions={{ position: 'top' }}/>
                        </div>
                        <label className="flex text-xs text-right font-normal text-orange">Lowest 1 Star, Highest 5 Stars{tutorId}{session}</label>
                    </div>
                </div>
                <div className="flex flex-column">
                    <InputTextarea  className="comment" value={comment} onChange={(e) => setComment(e.target.value)} autoResize
                                    tooltip="Review summary of tutoring services experience" tooltipOptions={{ position: 'top' }}/>
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