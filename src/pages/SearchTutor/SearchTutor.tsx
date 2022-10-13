import axios from "axios"
import React, { useEffect, useState } from "react";
import { Subdomain } from "../../constants/Subdomain";
import { AuthenticationStorage } from "../../constants/Model";
import { PageLink, TUTOR_RESULTS_PAGINATION_PAGE_SIZE, SessionStorage } from "../../constants/Constant";
import { getSessionTokenValues, getUrl } from "../../utils/apiUtils";
import { Card } from "primereact/card";
import { Paginator } from 'primereact/paginator';
import { TutorCard } from "./TutorCard";
import { SearchBar } from "./SearchBar";

import { Rating } from 'primereact/rating';
import { Divider } from "primereact/divider";
import { getTutorList } from "./Service";


export type TutorResponse = {
    id: string,
    displayName: string,
    introduction: string,
    subjects: string,
    certificates: string,
}
const SearchTutor = () => {
    const [tutorList, setTutorList] = useState<TutorResponse[]>([]) // todo type script
    const [currentPage, setCurrentPage] = useState(1)
    const [totalRecords, setTotalRecords] = useState(0)

    const { name, sessionToken, profileId } = getSessionTokenValues()
    const url = getUrl(Subdomain.TUTOR_MGR, '/tutors');
    useEffect(() => {
        getTutorList( setTotalRecords, setTutorList, currentPage)
        
    }, [])

    return (
        <div className="grid col-12">
            <div className="field col-7 ">
                <Card className="flex flex-column px-4 py-4 w-full">
                    <SearchBar setTutorList={setTutorList} />
                    {tutorList && tutorList?.length > 0 ? tutorList?.map((tutor, idx) => {
                        // console.log(tutor.introduction)
                        return (
                            <>
                                <TutorCard key={idx} intro={tutor.introduction} certs={tutor.certificates} tutorId={tutor.id} subject={tutor.subjects} name={tutor.displayName} />
                                <Divider key={idx+1}/>
                            </>
                        )
                    }) : <p className="text-center">No tutors found.</p>}
                    <Paginator rows={TUTOR_RESULTS_PAGINATION_PAGE_SIZE}
                        totalRecords={totalRecords}
                        first={currentPage}
                        onPageChange={(e) => {
                            setCurrentPage(e.first)
                            console.log('e.first', e.first, 'e', e)
                            // @ts-ignore
                            if(TUTOR_RESULTS_PAGINATION_PAGE_SIZE != 0){
                                const nextPageNum = e.first / TUTOR_RESULTS_PAGINATION_PAGE_SIZE 
                                getTutorList( setTotalRecords, setTutorList, nextPageNum)

                            } else {
                                console.error('divide by 0 error!')
                            }
                             }}>
                    </Paginator>
                </Card>
            </div>
            <div className="field col-5 ">
                <Card header={<h4>Recommendation</h4>} className="flex flex-column w-full px-4 py-4">
                    <RecommendationList />
                </Card>

            </div>


        </div>
    )
}

const RecommendationList = () => {
    return (
        <div className="flex gap-3 flex-wrap">
            <RecommendationCard />
            <RecommendationCard />
            <RecommendationCard />
        </div>
    )
}

const RecommendationCard = () => {
    return (
        <div className="surface-ground py-4 px-4 border-round">
            <div className="flex flex-row  justify-content-center align-items-center">
                <i className="fa-regular fa-user fa-2x"></i>

                <div className=" flex flex-column ml-3">
                    <b><p className="m-0 mb-2">Tutor one</p></b>
                    <Rating value={3} stars={5} cancel={false} readOnly />
                </div>
            </div>
            <i><p className="m-0 mt-2">Good tutor</p></i>
        </div>
    )
}

export { SearchTutor }