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
        <div className="flex flex-row align-items-center flex-grow-1 justify-content-between border-solid border-orange-500 border-round p-3 m-3" >
            <div className="flex flex-row flex-grow-1 align-items-center gap-3">
                <div className="flex flex-column">
                    <i className="text-5xl text-orange fa-regular fa-circle-user"></i>
                </div>
                <div className="flex flex-column flex-1">
                    <div className="flex flex-row mt-3 justify-content-between">
                        <label className="text-base font-bold text-dark-blue" >Rating:</label>
                        <Rating className="rating" value={props.rating} readOnly stars={5} cancel={false} />
                    </div>
                    <div className="flex flex-column mt-3">
                        <InputTextarea readOnly className="comment" value={props.comment} autoResize />
                    </div>
                </div>
            </div>
        </div>
    )
    
}
export { TutorReviewCard }