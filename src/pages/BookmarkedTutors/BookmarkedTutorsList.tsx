import React, { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { useNavigate } from "react-router-dom";
import { PageLink } from "../../constants/Constant";
import { ScrollPanel } from 'primereact/scrollpanel';
import { BookmarkedTutorsCard } from './BookmarkedTutorsCard';
import { Panel } from "primereact/panel";
import { HeaderTemplate } from "../../components/Shared/HeaderTemplate";

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


    if (props.tutorView) {
        return (
            <div>
            </div>
        );
    } else {
        return (
            <Panel header={HeaderTemplate({ title: 'Bookmarked Tutors', hideBadge: true })}>
                <div className="flex flex-row flex-wrap gap-3">
                    <BookmarkedTutorsCard Name="Tutor1" />
                    <BookmarkedTutorsCard Name="Tutor2" />
                </div>
            </Panel>
        );
    }
};
export { BookmarkedTutorsList };
