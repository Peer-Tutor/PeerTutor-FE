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
            <Card>
            <div className="flex flex-column p-3 gap-3">
                <label className="flex flex-1 text-xl font-bold text-orange">New Review</label>
                <div className="flex flex-column flex-wrap align-self-end align-items-end gap-3">
                    <div className="flex flex-row align-items-center gap-3">
                        <label className="flex text-base font-semibold text-black">Rating:</label>
                        <Rating value={rating} cancel={false} onChange={(e) => setRating(e.target.value)}
                                tooltip="Rating of service" tooltipOptions={{ position: 'top' }}/>
                    </div>
                    <label className="flex text-xs text-right font-normal text-orange">Lowest 1 Star, Highest 5 Stars</label>
                </div>
                <div className="flex flex-column">
                    <InputTextarea  className="comment" value={comment} onChange={(e) => setComment(e.target.value)} autoResize
                                    tooltip="Review summary of tutoring services experience" tooltipOptions={{ position: 'top' }}/>
                </div>
                <div className="flex flex-1 justify-content-end mt-4">
                    <Button label="Cancel" className="p-button-secondary flex" onClick={ cancelReview } />
                    <Button icon="pi pi-send" label="Submit" className="p-button-primary flex" onClick={ addReview }/>
                </div>
                </div>
            </Card>
        </div>
    )
}
export { AddTutorReview }