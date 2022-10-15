import React, { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { useNavigate } from "react-router-dom";
import { PageLink } from "../../constants/Constant";
import { ScrollPanel } from 'primereact/scrollpanel';
import { BookmarkedTutorsCard } from './BookmarkedTutorsCard';

type AccountInfo = { tutorView?: boolean; };
export type BookmarkTutorResponse = {
    TutorId: string;
    StudentId: string,
    Name: string,
}

const BookmarkedTutorsList = (props: AccountInfo, props2: BookmarkTutorResponse) => {
    const [bookmarkedTutorList, setBookmarkedTutorList] = useState<BookmarkTutorResponse[]>([]) // todo type script
    const navigate = useNavigate();
    const onClickHandler = (id: string) => {
        // navigate(PageLink.DASHBOARD_TUTOR, {tutorId: tutorId});
    }

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
                        <BookmarkedTutorsCard Name="Tutor1" />
                        <BookmarkedTutorsCard Name="Tutor2" />
                    </div>
                </div>
            </Card>
        );
    }
};
export { BookmarkedTutorsList };
