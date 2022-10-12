import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLink } from "../../constants/Constant";
import { getSessionTokenValues, getUrl } from "../../utils/apiUtils";

type TutorCardProps = { tutorId: string, subject: string, name: string, certs: string, intro: string }
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
        }
        else {
            BookmarkTutor(true);
        }
    }
    return (
        <>
            <div className="flex flex-row align-items-center flex-grow-1 justify-content-between border-solid border-orange-500 border-round px-5 py-3 mb-3" >
                <div className="flex flex-row flex-grow-1 align-items-center"  >
                    <div className="mr-6">
                        <i className="fa-regular fa-user fa-3x"></i>
                    </div>
                    <div className="flex flex-column">
                        <h3 className="m-0">{name ? name : 'undefined'}</h3>
                        <i><p className="m-0 mt-1">{intro ? intro : 'undefined'}</p></i>
                        <p className="m-0 mt-3"><span><b>Subject: </b></span>{subject ? subject.replaceAll(';', ' | ') : 'undefined'}</p>
                        <p className="m-0 mt-2"><span><b>Certifications: </b></span>{certs.replaceAll(';', ' | ')}</p>
                    </div>
                </div>
                <Button id="BookmarkIcon" icon="pi pi-bookmark" className={bookmarked ? 'p-button-info' : 'p-button-info p-button-outlined'} aria-label="Bookmark"
                    onClick={() => changeBookmarkIcon(tutorId)} />
                <Button label="Schedule Tuition" onClick={() => { onClickHandler(tutorId) }} className="p-button-primary" />
            </div>
        </>
    )
}

export { TutorCard }