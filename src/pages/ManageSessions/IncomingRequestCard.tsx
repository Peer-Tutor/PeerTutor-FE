import axios from "axios"
import React, { useEffect, useState } from "react";
import { Subdomain } from "../../constants/Subdomain";
import { AuthenticationStorage } from "../../constants/Model";
import { getUrl } from "../../utils/apiUtils";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Chip } from "primereact/chip";
import { Panel } from 'primereact/panel';
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
    status?: string
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
    Status?:string;
    OnForceUpdate?:any;
}

const IncomingRequestCard = (props: TuitionOrderInfo) => {
    const [studentName, setStudentName] = useState('');
    const [subject, setSubject] = useState('');
    const [time, setDateTime] = useState<any>(null);
    const [status, setStatus] = useState('');
   return (
        <div className="flex flex-row align-items-center gap-2">
            <div className="flex">
                <i className="text-5xl text-orange fa-regular fa-circle-user mx-3"></i>
            </div>
            <div className="flex flex-1">
                <div className="flex-column">
                    <label id="Name" className="flex my-2 text-base text-black font-semibold">{props.StudentName}</label>
                     {props.DateTime.length > 0 ? (props.DateTime.map((elt) => {
                         return (
                             <Chip label={elt} defaultValue={elt} key={elt}  />
                         )
                     })) : <p className="text-sm text-center text-black font-semibold">No dates selected.</p>}
                </div>
            </div>
            <div className="flex">
                <Button icon="fa-regular fa-circle-check" className="p-button-success" aria-label="Submit" onClick={(e) => updateTuitionOrderList(props.ID, props.StudentID, props.TutorID, props.DateTime, 1, props.OnForceUpdate)} />
                <Button icon="fa-regular fa-circle-xmark" className="p-button-danger" aria-label="Cancel"  onClick={(e) => updateTuitionOrderList(props.ID, props.StudentID, props.TutorID, props.DateTime, 2, props.OnForceUpdate)}/>
            </div>
        </div>
    );
};
export { IncomingRequestCard };
