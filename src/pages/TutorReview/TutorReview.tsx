import React, { useEffect, useState } from "react";
import { Subdomain } from "../../constants/Subdomain";
import { AuthenticationStorage } from "../../constants/Model";
import { PageLink, SessionStorage } from "../../constants/Constant";
import { getSessionTokenValues, getUrl } from "../../utils/apiUtils";
import { Card } from "primereact/card";
import { Paginator } from 'primereact/paginator';


export type TutorReviewResponse = {
    id: string,
    rating: BigInteger,
    comment: string,
}

const TutorReview = () => { 
    const [reviewList, setReviewList] = useState<TutorReviewResponse[]>([]) // todo type script
    const { name, sessionToken, profileId } = getSessionTokenValues()
    const url = getUrl(Subdomain.TUTOR_MGR, '/tutors');
    // console.log('page two rendered')
    
    return (
        <div >
            <h1>Tutor REVIEW</h1>
          
               
        </div>
    )
}
export { TutorReview }
