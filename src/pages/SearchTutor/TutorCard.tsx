import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLink } from "../../constants/Constant";


const TutorCard = (props: { tutorId: string, subject: string, name: string }) => {
    const { tutorId, subject, name, } = props
    const navigate = useNavigate();

    const onClickHandler = (id: string) => {
        // navigate(PageLink.DASHBOARD_STUDENT, {tutorId: tutorId});

    }
    return (
        <>
            <div className="flex flex-row align-items-center flex-grow-1 justify-content-between border-solid border-orange-500 border-round px-5 py-3 mb-3" >
                <div className="flex flex-row flex-grow-1 align-items-center"  >
                    <div className="mr-6">
                        <i className="fa-regular fa-user fa-3x"></i>
                    </div>
                    <div className="flex flex-column">
                        <h3 className="m-0">Law Jia Jie</h3>
                        <p className="m-0 mt-3"><span><b>Subject: </b></span>English | Math | Chinese</p>
                        <p className="m-0 mt-2"><span><b>Certifications: </b></span>O-Level | A-Level</p>
                    </div>
                </div>
                <Button icon="pi pi-bookmark" className="p-button-rounded p-button-outlined" aria-label="Bookmark" />
                <Button label="Schedule Tuition" onClick={() => { onClickHandler(tutorId) }} className="p-button-primary" />
            </div>
        </>
    )
}

export { TutorCard }