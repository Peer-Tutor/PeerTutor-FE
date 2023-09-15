import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLink } from "../../constants/Constant";
import { Button } from 'primereact/button';
import { deleteBookmark } from './BookmarkedServices';
import { TutorResponse } from "../../pages/SearchTutor/SearchTutor";

type BookmarkInfo = {
    TutorId?: string;
    StudentId?: string;
    Id?: number;
    Tutor?: TutorResponse;
    forceUpdate?: any;
}

const BookmarkedTutorsCard = (props: BookmarkInfo) => {
    const [bookmarked, BookmarkTutor] = useState(false);

    const navigate = useNavigate();
    const TutorDisplayName = ( props.Tutor !== undefined ) ? props.Tutor.displayName : '';
    const TutorSubject = ( props.Tutor !== undefined ) ? props.Tutor.subjects : '';
    const TutorCertificate = ( props.Tutor !== undefined ) ? props.Tutor.certificates : '';

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
        <div className="flex flex-grow-1 flex-row flex-nowrap bg-white py-4 px-2 border-round border-solid border-orange justify-content-between align-items-center">
            <div className="flex flex-1"  onClick={() => { navigate(PageLink.TUITION_BOOKING, { state: { tutorId: props.TutorId } } ) } }>
                 <i className="text-2xl text-orange fa-solid fa-chalkboard-user mx-3"></i>
            </div>
            <div className="flex flex-column flex-grow-1"  onClick={() => { navigate(PageLink.TUITION_BOOKING, { state: { tutorId: props.TutorId } } ) } }>
                <label className="flex flex-1 text-lg text-black font-semibold m-0">{TutorDisplayName ? TutorDisplayName : '-'}</label>
                <label className="flex flex-1 text-xs text-black font-normal m-0">{TutorSubject ? TutorSubject.replaceAll(';', ', ') : '-'}</label>
                <label className="flex flex-1 w-full text-xs text-black font-normal m-0">{TutorCertificate ? TutorCertificate.replaceAll(';', ', ') : '-'}</label>
            </div>
            <div className="flex">
                <Button icon="fa-solid fa-bookmark" style={{backgroundColor: "pink"}} className="p-button-primary-outlined" aria-label="Bookmark" onClick={() => handleBookmarkSubmit(props.TutorId ?? '')}
                    tooltip={bookmarked ? "Remove Bookmark" : "Bookmark"} tooltipOptions={{position: 'top'}}/>
            </div>
        </div>
    );
};
export { BookmarkedTutorsCard };