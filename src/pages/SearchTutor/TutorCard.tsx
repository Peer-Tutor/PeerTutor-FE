import axios from "axios";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { Subdomain } from "../../constants/Subdomain";
import { useNavigate } from "react-router-dom";
import { PageLink } from "../../constants/Constant";
<<<<<<< HEAD

type TutorCardProps =  { tutorId: string, subject: string, name: string, certs: string, intro: string };
=======
import { TutorCardProps } from "../../constants/Model";
import { getSessionTokenValues, getUrl } from "../../utils/apiUtils";
import { BookmarkResponse } from "../../pages/BookmarkedTutors/BookmarkedServices";

>>>>>>> 359e2a4f2edf80732d9c95ef832eb2ff4ee414f9
const TutorCard = (props: TutorCardProps) => {
    const { tutorId, subject, name, certs, intro } = props
    const navigate = useNavigate();

    const onClickHandler = (id: string) => {
        navigate(PageLink.BOOK_TUITION, { state: { tutorId: tutorId } });
<<<<<<< HEAD

    }
    const onClickHandler1 = (id: string) => {
        navigate(PageLink.TUTOR_REVIEW, { state: { tutorId: tutorId } });

    }

    
    return (
        <>
            <div className="flex flex-row align-items-center flex-grow-1 justify-content-between border-solid border-orange-500 border-round p-3 my-3" >
=======
    }

    const { sessionToken, profileId } = getSessionTokenValues();
    const [bookmarked, BookmarkTutor] = useState(false);
    const bookmarkUrl = getUrl(Subdomain.BOOKMARK_MGR, '/bookmark');
    const handleBookmarkSubmit = (id: string)=> {
        if(bookmarked == true)
        {
            BookmarkTutor(false);
        }
        else
        {
            // add bookmark
            const BookmarkData = {
              tutorId: id,
              studentId: profileId
            };
            // add bookmark
            axios.post<BookmarkResponse>(bookmarkUrl, BookmarkData)
            .then(res =>{
                console.log(res);
            })
            .catch(err => {
                console.log('error!', err);
            });
            BookmarkTutor(true);
        }
    }

    return (
        <>
            <div className="flex flex-row align-items-center flex-grow-1 justify-content-between p-3 my-3" >
>>>>>>> 359e2a4f2edf80732d9c95ef832eb2ff4ee414f9
                <div className="flex flex-row flex-grow-1 align-items-center gap-3">
                    <div className="flex">
                        <i className="text-6xl text-orange fa-regular fa-circle-user mx-3"></i>
                    </div>
                    <div className="flex flex-column flex-1">
<<<<<<< HEAD
                        <label className="flex text-xl text-black font-bold m-0">{name ? name : 'undefined'}</label>
                        <label className="flex text-xs font-italic m-0 mt-1">{intro ? intro : 'undefined'}</label>
                        <div className="flex flex-row mt-3">
                            <label className="flex text-xs text-black font-semibold mr-2">Subject:</label>
                            <label className="flex flex-1 text-xs text-black">{subject ? subject.replace(';', ', ') : 'undefined'}</label>
                            <label className="flex text-sm text-black font-semibold mr-2">Certifications:</label>
                            <label className="flex flex-1 text-xs text-black">{certs.replace(';', ', ')}</label>
                        </div>
                    </div>
                    <div className="flex">
                        <Button icon="fa-regular fa-bookmark" className="p-button-rounded p-button-tertiary" aria-label="Bookmark" />
                        <Button icon="fa-solid fa-calendar-check" className="p-button-rounded p-button-primary" aria-label="Schedule Tuition" onClick={() => { onClickHandler(tutorId) }}  />
                        <Button icon="fa-solid fa-calendar-check" className="p-button-rounded p-button-primary" aria-label="Schedule Tuition" onClick={() => { onClickHandler1(tutorId) }}  />
=======
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
                        <Button icon={bookmarked ? 'fa-solid fa-bookmark': 'fa-regular fa-bookmark'} className="p-button-primary-outlined" aria-label="Bookmark" onClick={()=>{handleBookmarkSubmit(tutorId ?? '')} }/>
                        <Button icon="fa-solid fa-calendar-check" className="p-button-rounded p-button-secondary" aria-label="Schedule Tuition" onClick={() => { onClickHandler(tutorId ?? '') }}  />
>>>>>>> 359e2a4f2edf80732d9c95ef832eb2ff4ee414f9
                    </div>
                </div>
            </div>
        </>
    );
};

export { TutorCard };