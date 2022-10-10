import React, { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';

type StudentInfo = {
    Name?: string;
    Subject?: string;
    DateTime?: string;
}
const IncomingRequestCard = (props: StudentInfo) => {
    const [studentName, setStudentName] = useState('');
    const [subject, setSubject] = useState('');
    const [time, setDateTime] = useState<any>(null);

   return (
           <Card >
                <div className="flex flex-row align-items-center gap-2">
                    <div className="align-items-center gap-2 mr-6">
                        <i className="fa-regular fa-user fa-3x"></i>
                    </div>
                     <div className="flex">
                        <div className="flex-row">
                            <label id="Name" className="flex my-2 text-base">{props.Name}</label>
                            <label id="Subject" className="flex my-2 text-base">{props.Subject}</label>
                            <label id="DateTime" className="flex my-2 text-base">{props.DateTime}</label>
                        </div>
                     </div>
                        <Button icon="pi pi-check" className="p-button-success" aria-label="Submit" />
                        <Button icon="pi pi-times" className="p-button-danger" aria-label="Cancel" />
                </div>
           </Card>
    )
}
export { IncomingRequestCard }