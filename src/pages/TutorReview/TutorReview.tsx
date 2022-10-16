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
            <Card className="flex flex-column px-4 py-4 w-8">
            <div className="grid">
                    <div className="col-12 md:col-4">
                    <label className="flex text-xl font-semibold text-black ml-2 mb-3">Tutor Reviews</label>
                    <div className="flex">
                    <div className="flex flex-column">
                        <TutorReviewCard tutorId="" rating= {3} comment="Tutor reviews"/>
                        <TutorReviewCard tutorId="2" rating= {4} comment="Tutor reviews"/>
                        <TutorReviewCard tutorId="2" rating= {4} comment="Tutor reviews"/>
                        
                    </div>
                </div>
                                   
                    <button onClick={onClickHandler} className="flex flex-column align-items-center gap-2 p-4">
                        <label className="text-base font-bold text-dark-blue">Add new Review</label>
                    </button>
                    </div>
                </div>
                
            </Card>
        </div>
    )
}
export { TutorReview }
