import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLink } from "../../constants/Constant";
import { Rating } from "primereact/rating";
import { InputTextarea} from "primereact/inputtextarea";

type TutorReviewCardProps ={
    tutorId: string;
    rating: number;
    comment: string;
}

const TutorReviewCard = (props: TutorReviewCardProps) => {
    const { tutorId, rating, comment } = props
    
    return (
        <div className="flex flex-row align-items-center justify-content-between border-solid border-orange-500 border-round p-3 my-3" >
            <div className="flex flex-row align-items-center gap-3">
                <div className="flex flex-column">
                    <div className="flex flex-column mt-3">
                        <InputTextarea disabled className="comment" value={props.comment} autoResize />
                    </div>
                    <div className="flex flex-row mt-3 justify-content-between">
                        <Rating className="rating" value={props.rating} readOnly stars={5} cancel={false} />
                    </div>
                </div>
            </div>
        </div>
    )
    
}
export { TutorReviewCard }