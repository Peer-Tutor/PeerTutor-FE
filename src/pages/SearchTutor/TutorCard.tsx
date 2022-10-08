import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLink } from "../../constants/Constant";

type TutorCardProps =  { tutorId: string, subject: string, name: string, certs: string, intro: string };
const TutorCard = (props: TutorCardProps) => {
    const { tutorId, subject, name, certs, intro } = props
    const navigate = useNavigate();

    const onClickHandler = (id: string) => {
        navigate(PageLink.BOOK_TUITION, { state: { tutorId: tutorId } });

    }
    return (
        <>
            <div className="flex flex-row align-items-center flex-grow-1 justify-content-between border-solid border-orange-500 border-round p-3 my-3" >
                <div className="flex flex-row flex-grow-1 align-items-center gap-3">
                    <div className="flex">
                        <i className="text-6xl text-orange fa-regular fa-circle-user mx-3"></i>
                    </div>
                    <div className="flex flex-column flex-1">
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
                    </div>
                </div>
            </div>
        </>
    )
}

export { TutorCard }