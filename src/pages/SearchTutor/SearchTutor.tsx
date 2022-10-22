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
import { getRecommendationsForMyself, getTutorList } from "./Service";
import { Badge } from "primereact/badge";
import { Panel } from "primereact/panel";
import { HeaderTemplate } from "../../components/Shared/HeaderTemplate";
import { BookmarkedTutorResponse, getBookmarkedTutorOfStudent } from "../../pages/BookmarkedTutors/BookmarkedServices";

export type TutorRecommendationResponse = {
    id: string,
    accountName: string,
    displayName: string,
    introduction: string,
    subjects: string,
    certificates: string,
    accountId: string
}[]

export type TutorResponse = {
    id: string,
    displayName: string,
    introduction: string,
    subjects: string,
    certificates: string,
};
const SearchTutor = () => {
    const [tutorList, setTutorList] = useState<TutorResponse[]>([]) // todo type script
    const [currentPage, setCurrentPage] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [recommendationList, setRecommendationList] = useState<TutorRecommendationResponse>([]);
    const [bookmarkedTutorList, setBookmarkedTutorList] = useState<BookmarkedTutorResponse[]>([])

    useEffect(() => {
        getTutorList(setTotalRecords, setTutorList, currentPage)
        getRecommendationsForMyself(setRecommendationList)
        getBookmarkedTutorOfStudent(setBookmarkedTutorList)

    }, []);

    return (
        <div className="grid col-12">
            <div className="field col-7 ">
                <Panel header={HeaderTemplate({ title: 'Search Tutors', totalCount: totalRecords })} className="flex flex-column">
                    <div className="ml-3 flex flex-row">
                        <SearchBar setTutorList={setTutorList} />
                        <Paginator
                            className="flex"
                            rows={TUTOR_RESULTS_PAGINATION_PAGE_SIZE}
                            totalRecords={totalRecords}
                            first={currentPage}
                            template="PrevPageLink CurrentPageReport NextPageLink"
                            onPageChange={(e) => {
                                setCurrentPage(e.first)
                                console.log('e.first', e.first, 'e', e)
                                if (totalRecords != 0) {
                                    const nextPageNum = Math.floor(e.first / TUTOR_RESULTS_PAGINATION_PAGE_SIZE);
                                    getTutorList(setTotalRecords, setTutorList, nextPageNum)
                                } else {
                                    console.error('divide by 0 error!')
                                }
                            }}>
                        </Paginator>
                    </div>
                    {tutorList && tutorList?.length > 0 ? tutorList?.map((tutor, idx) => {
                        // console.log(tutor.introduction)
                        return (
                            <>
                                <TutorCard key={idx} intro={tutor.introduction} certs={tutor.certificates} tutorId={tutor.id} subject={tutor.subjects} name={tutor.displayName} getTutorList={getTutorList} setTotalRecords={setTotalRecords} setTutorList={setTutorList} currentPage={currentPage} bookmarkedTutorList={bookmarkedTutorList} />
                                <Divider key={idx + 1} />
                            </>
                        )
                    }) : <p className="text-center">No tutors found.</p>}

                </Panel>
            </div>
            <div className="field col-5 ">
                <Panel header={HeaderTemplate({ title: 'Recommended Tutors', totalCount: recommendationList.length })} className="flex flex-column ">
                    <RecommendationList recommendationList={recommendationList} />
                </Panel>
            </div>
        </div>
    );
};


const RecommendationList = ({ recommendationList }: { recommendationList: TutorRecommendationResponse }) => {
    return (
        <div className="flex flex-row flex-wrap justify-content-center gap-3 ">
            {recommendationList.length > 0 ?
                recommendationList.map(elt => {
                    return (
                        <RecommendationCard tutorName={elt.displayName} subjectList={elt.subjects} />

                    )
                })

                : <p className="text-center">No recommendations found.</p>}
        </div>
    );
};

const RecommendationCard = ({ tutorName, subjectList }: { tutorName: string, subjectList: string }) => {
    return (
        <div className="surface-ground p-4 border-round w-5">
            <div className="flex flex-column justify-content-center align-items-center gap-3">
                <i className="text-5xl text-orange fa-solid fa-chalkboard-user"></i>
                <label className="flex text-xl text-black font-bold">{tutorName}</label>
                <label className="flex flex-1 text-xs text-black">{subjectList.replaceAll(';', ', ')}</label>
                <Rating className="text-xs" value={5} stars={5} cancel={false} readOnly />
            </div>
        </div>
    );
};

export { SearchTutor };