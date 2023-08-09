import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLink } from "../../constants/Constant";
import { getUrl } from "../../utils/apiUtils";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';
import { TutorCardProps } from "../../constants/Model";
import { BookmarkResponse, deleteBookmark } from './BookmarkedServices';
import { Subdomain } from "../../constants/Subdomain";
import { TutorResponse } from "../../pages/SearchTutor/SearchTutor";
import { useForceUpdate } from '../../utils/HookUtils';


type BookmarkInfo = {
    TutorId?: string;
    StudentId?: string;
    Id?: number;
    Tutor?: TutorResponse;
    forceUpdate?: any;
}

const BookmarkedTutorsCard = (props: BookmarkInfo) => {
    const [studentName, setStudentName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [tutorId, setTutorId] = useState<any>(null);
    const [bookmarked, BookmarkTutor] = useState(false);
    const bookmarkUrl = getUrl(Subdomain.BOOKMARK_MGR, '/bookmark');

    const navigate = useNavigate();
    const TutorDisplayName = ( props.Tutor != undefined ) ? props.Tutor.displayName : '';
    const TutorSubject = ( props.Tutor != undefined ) ? props.Tutor.subjects : '';
    const TutorCertificate = ( props.Tutor != undefined ) ? props.Tutor.certificates : '';

    // set bookmark flag to true
    useEffect(() => {
        BookmarkTutor(true);
    }, []);

    const handleBookmarkSubmit = (id: string)=> {
        // delete bookmark
        deleteBookmark(id, props.forceUpdate);
        BookmarkTutor(false);
    }

    return (
        <div className="flex surface-ground py-4 px-2 border-round border-solid justify-content-between align-items-center">
            <div className="flex">
                 <i className="text-2xl text-orange fa-solid fa-chalkboard-user mx-3"></i>
            </div>
            <div className="flex flex-column flex-1">
                <label className="flex text-xl text-black font-semibold m-0">{TutorDisplayName ? TutorDisplayName : '-'}</label>
                <label className="flex text-sm text-black font-normal m-0">{TutorSubject ? TutorSubject.replaceAll(';', ', ') : '-'}</label>
                <label className="flex text-sm text-black font-normal m-0">{TutorCertificate ? TutorCertificate.replaceAll(';', ', ') : '-'}</label>
            </div>
                <Button icon="fa-solid fa-bookmark" style={{backgroundColor: "pink"}} className="p-button-primary-outlined" aria-label="Bookmark" onClick={() => handleBookmarkSubmit(props.TutorId ?? '')}
                    tooltip={bookmarked ? "Remove Bookmark" : "Bookmark"} tooltipOptions={{position: 'top'}}/>
                <Button icon="fa-solid fa-calendar-check" className="p-button-secondary" aria-label="Schedule" onClick={() => { navigate(PageLink.TUITION_BOOKING, { state: { tutorId: props.TutorId } } ) } }
                    tooltip="Schedule Session" tooltipOptions={{position: 'top'}}/>
        </div>
    );
};
export { BookmarkedTutorsCard };