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
                    <ScrollPanel style={{ width: '310%', height: '80%' }}>
                       return(
                               <>
                           <TutorReviewCard tutorId="12"rating= {3} comment="test"/>
                           <TutorReviewCard tutorId="122"rating= {2} comment="test112"/>
                           </>
                           ) 
                    </ScrollPanel>
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
