import React, { useState } from "react";
import { Button } from 'primereact/button';
import { useToastHook } from "../../utils/toastHooks";
import { Toast } from "primereact/toast";
import { Card } from 'primereact/card';
import { useNavigate } from "react-router-dom";
import { Rating } from "primereact/rating";
import { InputTextarea } from "primereact/inputtextarea";
import { PageLink } from "../../constants/Constant";
import axios from "axios";
import { Subdomain } from "../../constants/Subdomain";
import { getUrl, getProfileId } from "../../utils/apiUtils";


const AddTutorReview = () => {
    const [toast] = useToastHook()
    const navigate = useNavigate();
    const [rating, setRating] = useState<any>(null);
    const [comment, setComment] = useState('');

    const addReview = () => {
        const url = getUrl(Subdomain.REVIEW_MGR, '/reviews');
        axios.post(url, { rating: rating, comment: comment, tutorId: getProfileId()}).then(res => {
            navigate(PageLink.TUTOR_REVIEW);
        }).catch(err => {
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
                    <Button label="Cancel" className="p-button-secondary flex" onClick={ cancelReview } />
                    <Button icon="pi pi-send" label="Submit" className="p-button-primary flex" onClick={ addReview }/>
                </div>
            </Card>
        </div>
    )
}
export { AddTutorReview }