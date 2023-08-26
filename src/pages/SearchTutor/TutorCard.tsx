import axios from "axios";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { Subdomain } from "../../constants/Subdomain";
import { useNavigate } from "react-router-dom";
import { PageLink } from "../../constants/Constant";
import { TutorCardProps } from "../../constants/Model";
import { getUrl } from "../../utils/apiUtils";
import { BookmarkResponse, addBookmarkTutorCard, deleteBookmarkTutorCard } from "../../pages/BookmarkedTutors/BookmarkedServices";
import { Tooltip } from 'primereact/tooltip';

const TutorCard = (props: TutorCardProps) => {
    const { tutorId, subject, name, certs, intro, bookmarkedTutorList } = props
    const [bookmarked, BookmarkTutor] = useState(false);

    const navigate = useNavigate();

    const reviewHandler = (id: string, name: string) => {
        navigate(PageLink.TUTOR_REVIEW, { state: { tutorId: tutorId, tutorName: name } });
    }
    const scheduleHandler = (id: string) => {
        navigate(PageLink.BOOK_TUITION, { state: { tutorId: tutorId } });
    }

    useEffect(() => {
        setBookmarkValue()
    }, [tutorId]);

    const setBookmarkValue = () => {
        let result = props.bookmarkedTutorList;
        result = result?.filter((record) => {
            return record.tutorID === tutorId;
        });

        if (result !== undefined && result?.length > 0) {
            BookmarkTutor(true);
        }
        else {
            BookmarkTutor(false);
        }
    }

    const handleBookmarkSubmit = () => {
        if (bookmarked == true) {
            deleteBookmarkTutorCard(tutorId, props.forceUpdate);
            BookmarkTutor(false);
        }
        else {
            addBookmarkTutorCard(tutorId ?? '', props.forceUpdate);
            BookmarkTutor(true);
        }
    }

    return (
        <>
            <div className="flex flex-row align-items-center flex-grow-1 justify-content-between p-3 my-3" >
                <div className="flex flex-row flex-grow-1 align-items-center gap-3">
                    <div className="flex">
                        <i className="text-5xl text-orange fa-solid fa-chalkboard-user mx-3"></i>
                    </div>
                    <div className="flex flex-column flex-1">
                        <label className="flex text-xl text-black font-bold m-0">{name ? name : '-'}</label>
                        <label className="flex text-xs font-italic m-0 mt-1">{intro ? intro : '-'}</label>
                        <div className="flex flex-row mt-3">
                            <label className="flex text-xs text-black font-semibold mr-2">Subject:</label>
                            <label className="flex flex-1 text-xs text-black">{subject ? subject.replace(';', ', ') : '-'}</label>
                            <label className="flex text-xs text-black font-semibold mr-2">Certifications:</label>
                            <label className="flex flex-1 text-xs text-black">{certs ? certs.replace(';', ', ') : '-'}</label>
                        </div>
                    </div>
                    <div className="flex align-items-evenly">
                        <Button icon={bookmarked ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'} className="p-button-primary-outlined" aria-label="Bookmark" onClick={() => { handleBookmarkSubmit() }}
                            tooltip={bookmarked ? "Remove Bookmark" : "Bookmark"} tooltipOptions={{ event: 'both', position: 'top' }} />
                        <Button icon="fa-solid fa-calendar-check" className="p-button-secondary" aria-label="Schedule" onClick={() => { scheduleHandler(tutorId ?? '') }}
                            tooltip="Schedule Session" tooltipOptions={{ event: 'both', position: 'top' }} />
                        <Button icon="fa-solid fa-star-half-stroke" className="p-button-primary" aria-label="Review" onClick={() => { reviewHandler(tutorId ?? '', name ?? '') }}
                            tooltip="Review" tooltipOptions={{ event: 'both', position: 'top' }} />
                    </div>
                </div>
            </div>
        </>
    );
};

export { TutorCard };