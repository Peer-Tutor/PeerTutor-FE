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
            navigate(PageLink.MANAGE_ACCOUNT);
        }).catch(err => {
            console.log('error!', err);
        });
    };

    return (
        <div className="global-component">
            <Toast ref={toast} />
            <Card className="col-12 my-auto py-8" title="Review">
                <label className="text-base font-bold text-dark-blue" style={{ lineHeight: '3' }}>Rating:</label>
                <Rating value={rating} cancel={false} onChange={(e) => setRating(e.target.value)} />
                <div className="content-section implementation">
                    <div className="card">
                        <h5 className="text-base font-bold text-dark-blue">Comment:</h5>
                        <InputTextarea className="comment" value={comment} autoResize onChange={(e) => setComment(e.target.value)} />
                        <Link to={route} onClick={addReview}>
                            <Button label="Add Review" className="p-button-primary flex"  />
                        </Link>
                    </div>
                </div>


            </Card>

        </div>
    )
}
export { AddTutorReview }