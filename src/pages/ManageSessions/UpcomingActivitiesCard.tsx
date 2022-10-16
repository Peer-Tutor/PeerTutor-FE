import React, { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';

type ActivitiesInfo = {
    studentName?: string;
    tutorName?: string;
    date?: string;
    subject?: string;
    tutorView: boolean;
}

const UpcomingActivitiesCard = (props: ActivitiesInfo) => {
    if(props.tutorView){
   return (
        <div className="flex flex-row align-items-center gap-2">
            <div className="flex">
                <i className="text-6xl text-orange fa-regular fa-circle-user mx-3"></i>
            </div>
            <div className="flex flex-1">
                <div className="flex-column">
                    <label className="flex my-2 text-base text-black font-semibold">{props.studentName}</label>
                    <label className="flex my-2 text-sm text-black font-bold">{props.tutorName}</label>
                    <label className="flex my-2 text-xs font-italic">{props.date}</label>
                    <label className="flex my-2 text-xs font-italic">{props.subject}</label>
                </div>
            </div>
            <div className="flex">
                <Button icon="fa-regular fa-circle-check" className="p-button-success" aria-label="Submit" />
                <Button icon="fa-regular fa-circle-xmark" className="p-button-danger" aria-label="Cancel" />
            </div>
        </div>
    );
    }else{
        return (<></>);
    }
};
export { UpcomingActivitiesCard };