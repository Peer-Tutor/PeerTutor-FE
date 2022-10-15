import React, { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';

type StudentInfo = {
    Name?: string;
    Subject?: string;
    DateTime?: string;
};
const IncomingRequestCard = (props: StudentInfo) => {
    const [studentName, setStudentName] = useState('');
    const [subject, setSubject] = useState('');
    const [time, setDateTime] = useState<any>(null);

   return (
                <div className="flex flex-row align-items-center gap-2">
                    <div className="flex">
                        <i className="text-6xl text-orange fa-regular fa-circle-user mx-3"></i>
                    </div>
                     <div className="flex flex-1">
                        <div className="flex-column">
                            <label id="Name" className="flex my-2 text-base text-black font-semibold">{props.Name}</label>
                            <label id="DateTime" className="flex my-2 text-sm text-black font-bold">{props.DateTime}</label>
                            <label id="Subject" className="flex my-2 text-xs font-italic">{props.Subject}</label>
                        </div>
                     </div>
                     <div className="flex">
                        <Button icon="fa-regular fa-circle-check" className="p-button-success" aria-label="Submit" />
                        <Button icon="fa-regular fa-circle-xmark" className="p-button-danger" aria-label="Cancel" />
                     </div>
                </div>
    )
}
export { IncomingRequestCard }