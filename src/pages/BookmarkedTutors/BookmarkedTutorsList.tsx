import React, { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { ScrollPanel } from 'primereact/scrollpanel';
import { BookmarkedTutorsCard } from './BookmarkedTutorsCard';
import { BookmarkedTutorResponse, getBookmarkedTutorOfStudent } from './BookmarkedServices';
import { useForceUpdate } from '../../utils/HookUtils';
import { useNavigate } from "react-router-dom";
import { PageLink } from "../../constants/Constant";
import { authenticatedSession } from "../../utils/apiUtils";

type AccountInfo = { tutorView?: boolean; refresh: number};

const BookmarkedTutorsList = (props: AccountInfo, props2: BookmarkedTutorResponse) => {
    const navigate = useNavigate();
    const [bookmarkedTutorList, setBookmarkedTutorList] = useState<BookmarkedTutorResponse[]>([]) // todo type script
    const [onForceUpdate, forceUpdate] = useForceUpdate();

    useEffect(() => {
        if(authenticatedSession()){
            getBookmarkedTutorOfStudent(setBookmarkedTutorList);
        }else{
            navigate(PageLink.UNAUTHORISED);
        }
    }, [props.refresh, onForceUpdate])

    if(props.tutorView){
        return(
            <div>
            </div>
        );
    }else{
        return(
            <Card className="flex flex-1">
                <label className="flex text-xl font-semibold text-black mb-3 ml-1">Bookmarked Tutors List</label>
                <div className="flex">
                    <ScrollPanel>
                        <div className="flex flex-row gap-3">
                         {bookmarkedTutorList && bookmarkedTutorList?.length > 0  ? bookmarkedTutorList?.map((record, idx) => {
                            return (
                            <React.Fragment key={idx} >
                                    <BookmarkedTutorsCard key={idx} Id={record.id} Tutor={record.tutor} TutorId={record.tutorID} StudentId={record.studentID} forceUpdate={forceUpdate}/>
                            </React.Fragment>
                            )
                         }) : <p className="text-sm text-center text-black font-semibold">No tutors found.</p>}
                        </div>
                    </ScrollPanel>
                </div>
            </Card>
        );
    }
};
export { BookmarkedTutorsList };
