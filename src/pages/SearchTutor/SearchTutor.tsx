import React, { useEffect, useState } from "react";
import { PageLink, TUTOR_RESULTS_PAGINATION_PAGE_SIZE } from "../../constants/Constant";
import { Paginator } from 'primereact/paginator';
import { TutorCard } from "./TutorCard";
import { SearchBar } from "./SearchBar";

import { Rating } from 'primereact/rating';
import { Divider } from "primereact/divider";
import { getRecommendationsForMyself, getTutorList } from "./Service";
import { Panel } from "primereact/panel";
import { HeaderTemplate } from "../../components/Shared/HeaderTemplate";
import { BookmarkedTutorResponse, getBookmarkedTutorOfStudentTutorCard } from "../../pages/BookmarkedTutors/BookmarkedServices";
import { useNavigate } from "react-router-dom";
import { useForceUpdate } from '../../utils/HookUtils';
import { authenticatedSession, authorisedRoute } from '../../utils/apiUtils';

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
    const [onForceUpdate, forceUpdate] = useForceUpdate();
    const navigate = useNavigate();
    useEffect(() => {
        if(!authorisedRoute(PageLink.SEARCH_TUTOR)){ navigate(PageLink.UNAUTHORISED); }
        else{
            getTutorList(setTutorList, currentPage);
            getBookmarkedTutorOfStudentTutorCard(setBookmarkedTutorList);
            getRecommendationsForMyself(setRecommendationList, setTotalRecords);
        }
    }, []);

    useEffect(() => {
        if(!authorisedRoute(PageLink.SEARCH_TUTOR)){ navigate(PageLink.UNAUTHORISED); }
        else{ getBookmarkedTutorOfStudentTutorCard(setBookmarkedTutorList); }
    }, [onForceUpdate]);

    return (
        <div className="flex flex-row flex-wrap flex-1 gap-3">
            <div className="flex flex-grow-1">
                <Panel header={HeaderTemplate({ title: 'Search Tutors', totalCount: totalRecords })} className="flex flex-column flex-1">
                    <div className="ml-3 flex flex-row mb-3">
                        <SearchBar setTutorList={setTutorList} />
                        { totalRecords > TUTOR_RESULTS_PAGINATION_PAGE_SIZE ? <Paginator
                            className="flex text-sm"
                            rows={TUTOR_RESULTS_PAGINATION_PAGE_SIZE}
                            totalRecords={totalRecords}
                            first={currentPage}
                            template="PrevPageLink CurrentPageReport NextPageLink"
                            onPageChange={(e) => {
                                setCurrentPage(e.first)
                                if (totalRecords !== 0) {
                                    const nextPageNum = Math.floor(e.first / TUTOR_RESULTS_PAGINATION_PAGE_SIZE);
                                    getTutorList(setTutorList, nextPageNum)
                                } else {
                                    console.error('divide by 0 error!')
                                }
                            }}>
                        </Paginator> : <div></div> }
                    </div>
                    <div className="flex flex-column flex-1">
                    {tutorList && tutorList?.length > 0 ? tutorList?.map((tutor, idx) => {
                        return (
                            <React.Fragment key={idx} >
                                <TutorCard key={idx} intro={tutor.introduction} certs={tutor.certificates} tutorId={tutor.id} subject={tutor.subjects} name={tutor.displayName} getTutorList={getTutorList} setTotalRecords={setTotalRecords} setTutorList={setTutorList} currentPage={currentPage} bookmarkedTutorList={bookmarkedTutorList} forceUpdate={forceUpdate} />
                                <Divider key={idx + 1} />
                            </React.Fragment>
                        )
                    }) : <p className="text-sm text-center text-black font-semibold">No tutors found.</p>}
                    </div>

                </Panel>
            </div>
            <div className="flex flex-grow-1">
                <Panel header={HeaderTemplate({ title: 'Recommended Tutors', totalCount: recommendationList.length  })} className="flex flex-column flex-1">
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
                recommendationList.map((elt, idx) => {
                        return (
                        <React.Fragment key={elt.id} >
                            <RecommendationCard tutorName={elt.displayName} subjectList={elt.subjects} tutorId={elt.id} />
                        </React.Fragment>
                        )
                })

                : <p className="text-sm text-center text-black font-semibold">No recommendations found.</p>}
        </div>
    );
};

const RecommendationCard = ({ tutorName, subjectList, tutorId }: { tutorName: string, subjectList: string, tutorId: string }) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => { navigate(PageLink.TUITION_BOOKING, { state: { tutorId: tutorId } }) }} className="bg-white p-4 border-round border-orange border-solid w-5">
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