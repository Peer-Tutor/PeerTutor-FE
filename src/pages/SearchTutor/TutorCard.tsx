import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLink } from "../../constants/Constant";
import { TutorCardProps } from "../../constants/Model";
import { getSessionTokenValues, getUrl } from "../../utils/apiUtils";

const TutorCard = (props: TutorCardProps) => {
    const { tutorId, subject, name, certs, intro } = props
    const navigate = useNavigate();

    const [bookmarked, BookmarkTutor] = useState(false);
    const onClickHandler = (id: string) => {
        navigate(PageLink.BOOK_TUITION, { state: { tutorId: tutorId } });
    }

    const changeBookmarkIcon = (id: string) => {
        if (bookmarked == true) {
            BookmarkTutor(false);
        }else {
            BookmarkTutor(true);
        }
    }

    return (
        <>
            <div className="flex flex-row align-items-center flex-grow-1 justify-content-between p-3 my-3" >
                <div className="flex flex-row flex-grow-1 align-items-center gap-3">
                    <div className="flex">
                        <i className="text-6xl text-orange fa-regular fa-circle-user mx-3"></i>
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
                    <div className="flex">
                        <Button icon={bookmarked ? 'fa-solid fa-bookmark': 'fa-regular fa-bookmark'} className="p-button-primary-outlined" aria-label="Bookmark" onClick={()=>{changeBookmarkIcon(tutorId ?? '')} }/>
                        <Button icon="fa-solid fa-calendar-check" className="p-button-rounded p-button-secondary" aria-label="Schedule Tuition" onClick={() => { onClickHandler(tutorId ?? '') }}  />
                    </div>
                </div>
            </div>
        </>
    );
};

export { TutorCard };