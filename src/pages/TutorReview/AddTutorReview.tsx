import React, { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { useToastHook } from "../../utils/toastHooks";
import { Toast } from "primereact/toast";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Link, useNavigate } from "react-router-dom";
import { Rating } from "primereact/rating";
import { InputTextarea } from "primereact/inputtextarea";
import { PageLink, SessionStorage } from "../../constants/Constant";
import axios from "axios";
import { Subdomain } from "../../constants/Subdomain";
import { getSessionTokenValues, getUrl } from "../../utils/apiUtils";


const AddTutorReview = () => {
    const [toast] = useToastHook()
    const navigate = useNavigate();
    const [tutorId, setTutorId] = useState<any>(null);
    const [rating, setRating] = useState<any>(null);
    const [comment, setComment] = useState('');
    const [route, setRoute] = useState(PageLink.TUTOR_REVIEW);

    const addReview = () => {
        const url = getUrl(Subdomain.REVIEW_MGR, '/reviews');
        const { name, sessionToken, profileId } = getSessionTokenValues()
        axios.post(url, { rating: rating, comment: comment, tutorId: profileId}).then(res => {
            navigate(PageLink.TUTOR_REVIEW);
        }).catch(err => {
            console.log('error!', err);
        });
    };

    const cancelReview = () => { navigate(PageLink.TUTOR_REVIEW); };

    return (
        <div className="global-component">
            <Toast ref={toast} />
            <Card className="flex flex-column p-3 gap-3">
                <label className="flex flex-1 text-xl font-bold text-orange">New Review</label>
                <div className="flex flex-row flex-wrap justify-content-between">
                    <label className="flex text-base font-bold text-dark-blue" style={{ lineHeight: '3' }}>Rating:</label>
                    <Rating value={rating} cancel={false} onChange={(e) => setRating(e.target.value)} />
                </div>
                <div className="flex flex-column">
                    <InputTextarea className="comment" value={comment} onChange={(e) => setComment(e.target.value)} autoResize />
                </div>
                <div className="flex flex-1 justify-content-end mt-4">
                    <Link to={route} onClick={addReview}>
                        <Button label="Cancel" className="p-button-secondary flex"  />
                    </Link>
                    <Link to={route} onClick={addReview}>
                        <Button icon="pi pi-send" label="Submit" className="p-button-primary flex"  />
                    </Link>
                </div>
            </Card>
        </div>
    )
}
export { AddTutorReview }