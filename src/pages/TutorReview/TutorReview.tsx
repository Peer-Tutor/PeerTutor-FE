import React, { useEffect, useState } from "react";
import { PageLink } from "../../constants/Constant";
import { CustomizedState } from "../../constants/Model";
import { Card } from "primereact/card";
import { TutorReviewCard } from "./TutorReviewCard";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Subdomain } from "../../constants/Subdomain";
import { getUrl, getProfileName, getSessionToken, authorisedRoute } from "../../utils/apiUtils";
import { useLocation } from "react-router-dom";
import axios from "axios";

export type TutorResponse = {
    tutorId: string;
    rating: number;
    comment: string;
}
const TutorReview = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [reviewList, setReviewList] = useState<TutorResponse[] | []>();

    const data = location.state as CustomizedState; // Type Casting, then you can get the params passed via router
    const tutorId = data ? data.tutorId : '';
    const tutorName = data ? data.tutorName : '';

    const listReview = () => {
        if(!authorisedRoute(PageLink.TUTOR_REVIEW)){
            navigate(PageLink.UNAUTHORISED);
        }else{
            const url = getUrl(Subdomain.REVIEW_MGR, '/reviews');
            axios.get<TutorResponse[]>(url, { params: {
                name: getProfileName(),
                sessionToken: getSessionToken(),
                tutorID: tutorId
              }
            }).then(res => {
                setReviewList(res.data);
            }).catch(err => {
            });
        }
    };

    const onClickHandler = ()=>{
        navigate(PageLink.ADD_TUTOR_REVIEW, { state: data } )
    }

    useEffect(() => { listReview(); }, [navigate])
    
    return (
        <div>
            <Card className="flex flex-column flex-1 p-2">
                <div className="flex flex-column">
                    <label className="flex flex-1 text-xl font-semibold text-black">{tutorName} Reviews</label>
                    <div className="flex flex-1 flex-row flex-wrap align-items-center gap-2">
                      {reviewList && reviewList?.length > 0 ? reviewList?.map((review, idx) => {
                        return (
                            <>
                                <TutorReviewCard tutorId="" rating= {review.rating} comment={review.comment}/>
                            </>
                        )
                      }) : <label className="text-sm text-center text-black font-normal mx-0 my-2">No reviews available.</label>}
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
