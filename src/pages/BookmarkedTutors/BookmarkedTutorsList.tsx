import axios from "axios"
import React, { useEffect, useState } from "react";
import { Subdomain } from "../../constants/Subdomain";
import { AuthenticationStorage } from "../../constants/Model";
import { getSessionTokenValues, getUrl } from "../../utils/apiUtils";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { useNavigate } from "react-router-dom";
import { PageLink } from "../../constants/Constant";
import { ScrollPanel } from 'primereact/scrollpanel';
import { BookmarkedTutorsCard } from './BookmarkedTutorsCard';
import { BookmarkedTutorResponse, getBookmarkedTutorOfStudent } from './BookmarkedServices';

type AccountInfo = { tutorView?: boolean; refresh: number};

const BookmarkedTutorsList = (props: AccountInfo, props2: BookmarkedTutorResponse) => {
    const [bookmarkedTutorList, setBookmarkedTutorList] = useState<BookmarkedTutorResponse[]>([]) // todo type script
    const { name, sessionToken, profileId } = getSessionTokenValues();

    useEffect(() => {
        getBookmarkedTutorOfStudent(setBookmarkedTutorList)
    }, [props.refresh])
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
            <Card>
                <label className="flex text-xl font-semibold text-black ml-2 mb-3">Bookmarked Tutors List</label>
                <div className="flex">
                    <div className="flex flex-row">
                    <ScrollPanel style={{ width: '300%', height: '100%' }}>
                        {bookmarkedTutorList && bookmarkedTutorList?.length > 0  ? bookmarkedTutorList?.map((record, idx) => {
                                return <BookmarkedTutorsCard key={idx} Id={record.id} Tutor={record.tutor} TutorId={record.tutorID} StudentId={record.studentID} />
                        }) : <p className="text-center">No students found.</p>}
                    </ScrollPanel>

                    </div>
                </div>
            </Card>
        );
    }
};
export { BookmarkedTutorsList };
