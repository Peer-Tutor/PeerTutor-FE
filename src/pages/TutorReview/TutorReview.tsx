import React from "react";
import { PageLink } from "../../constants/Constant";
import { Card } from "primereact/card";
import { TutorReviewCard } from "./TutorReviewCard";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export type TutorResponse = {
    tutorId: string;
    rating: number;
    comment: string;
}

const TutorReview = () => {   
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
