import React, { useState } from "react";
import { Chip } from "primereact/chip";
import { updateTuitionOrderList } from './IncomingRequestService';

// detailed tuition order
export type GetRequestResponse = {
    id?: string,
    studentName?: string,
    studentId?:any,
    tutorId?:any,
    tutorName?: string,
    displayName?: string,
    introduction?: string,
    subjects?: string,
    certificates?: string,
    selectedDates: string,
    status?: number
}
// tuition order
export type RequestResponse = {
    id?: string,
    studentName?: string,
    studentId?:any,
    tutorId?:any,
    tutorName?: string,
    displayName?: string,
    introduction?: string,
    subjects?: string,
    certificates?: string,
    selectedDates: string[],
    status?: string
}

type TuitionOrderInfo = {
    ID?:string;
    StudentID?:string;
    TutorID?:string;
    StudentName?: string;
    TutorName?: string;
    Subject?: string;
    DateTime: string[];
    Status?:number;
    OnForceUpdate?:any;
}

const IncomingRequestCard = (props: TuitionOrderInfo) => {
   return (
        <div className="flex flex-row align-items-center bg-white border-round my-3 py-2">
            <div className="flex">
                <i className="text-5xl text-orange fa-regular fa-circle-user mx-3"></i>
            </div>
            <div className="flex flex-1">
                <div className="flex-column">
                    <label id="Name" className="flex my-2 text-base text-black font-semibold">{props.StudentName}</label>
                     {props.DateTime.length > 0 ? (props.DateTime.map((elt) => {
                         return (
                             <Chip label={elt} defaultValue={elt} key={elt}  className="bg-dark-blue text-white mr-2"/>
                         )
                     })) : <p className="text-sm text-center text-black font-semibold">No dates selected.</p>}
                </div>
            </div>
            <div className="flex gap-3 mx-2">
                    <i className="text-3xl fa-solid fa-circle-check text-green cursor-pointer" onClick={(e) => updateTuitionOrderList(props.ID, props.StudentID, props.TutorID, props.DateTime, 1, props.OnForceUpdate)} ></i>
                <i className="text-3xl fa-solid fa-circle-xmark text-red cursor-pointer" onClick={(e) => updateTuitionOrderList(props.ID, props.StudentID, props.TutorID, props.DateTime, 2, props.OnForceUpdate)} ></i>
            </div>
        </div>
    );
};
export { IncomingRequestCard };
