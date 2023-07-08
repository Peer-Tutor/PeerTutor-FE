import React, { useEffect, useState } from "react";
import { Subdomain } from "../../constants/Subdomain";
import { AuthenticationStorage } from "../../constants/Model";
import { PageLink, SessionStorage } from "../../constants/Constant";
import { getSessionTokenValues, getUrl } from "../../utils/apiUtils";
import { Card } from "primereact/card";
import { Paginator } from 'primereact/paginator';
import { Rating } from "primereact/rating";
import { TutorReviewCard } from "./TutorReviewCard";
import { ScrollPanel } from 'primereact/scrollpanel';
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Divider } from "primereact/divider";

export type TutorResponse = {
    tutorId: string;
    rating: number;
    comment: string;
}

const TutorReview = () => {   
    const [tutorReviewList, setTutorReviewList] = useState<TutorResponse[]>([])
    const url = getUrl(Subdomain.REVIEW_MGR, '/reviews');
    const navigate = useNavigate();
    const onClickHandler = ()=>{
        navigate(PageLink.ADD_TUTOR_REVIEW)
    }
    
    return (
        <div>
            <Card className="flex flex-column flex-1 p-2">
                <div className="flex flex-column">
                    <label className="flex flex-1 text-xl font-semibold text-black ml-2 mb-3">Tutor Reviews</label>
                    <div className="flex flex-1 flex-row flex-wrap">
                        <TutorReviewCard tutorId="" rating= {3} comment="Tutor reviews"/>
                        <TutorReviewCard tutorId="2" rating= {4} comment="Tutor reviews"/>
                        <TutorReviewCard tutorId="2" rating= {4} comment="Tutor reviews"/>
                    </div>
                    <div className="flex flex-row justify-content-end mt-4">
                        <Button onClick={onClickHandler} className="p-button-secondary text-sm" icon="pi pi-send" label="Review"></Button>
                    </div>
                </div>
                
            </Card>
        </div>
    )
}
export { TutorReview }
