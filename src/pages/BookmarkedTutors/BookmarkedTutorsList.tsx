import axios from "axios"
import React, { useEffect, useState } from "react";
import { Subdomain } from "../../constants/Subdomain";
import { AuthenticationStorage } from "../../constants/Model";
import { getUrl } from "../../utils/apiUtils";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { useNavigate } from "react-router-dom";
import { PageLink } from "../../constants/Constant";
import { ScrollPanel } from 'primereact/scrollpanel';
import { BookmarkedTutorsCard } from './BookmarkedTutorsCard';
import { BookmarkedTutorResponse, getBookmarkedTutorOfStudent } from './BookmarkedServices';
import { useForceUpdate } from '../../utils/HookUtils';

type AccountInfo = { tutorView?: boolean; refresh: number};

const BookmarkedTutorsList = (props: AccountInfo, props2: BookmarkedTutorResponse) => {
    const [bookmarkedTutorList, setBookmarkedTutorList] = useState<BookmarkedTutorResponse[]>([]) // todo type script
    const [onForceUpdate, forceUpdate] = useForceUpdate();

    useEffect(() => {
        getBookmarkedTutorOfStudent(setBookmarkedTutorList)
    }, [props.refresh, onForceUpdate])
    const template = (options:any) => {
        const className = `${options.className} justify-content-start`;
        const titleClassName = `Bookmarked Tutors List`;

        return (
            <div className={className}>
                <label className="text-base font-semibold text-dark-blue mr-1">
                    {titleClassName}
                </label>
            </div>
        )
    };
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
                    <div className="flex flex-row">
                     {bookmarkedTutorList && bookmarkedTutorList?.length > 0  ? bookmarkedTutorList?.map((record, idx) => {
                        return (
                            <ScrollPanel style={{ width: '300%', height: '100%' }}>
                                <BookmarkedTutorsCard key={idx} Id={record.id} Tutor={record.tutor} TutorId={record.tutorID} StudentId={record.studentID} forceUpdate={forceUpdate}/>
                            </ScrollPanel> )
                     }) : <p className="text-sm text-center text-black font-semibold">No tutors found.</p>}
                     </div>
                </div>
            </Card>
        );
    }
};
export { BookmarkedTutorsList };
