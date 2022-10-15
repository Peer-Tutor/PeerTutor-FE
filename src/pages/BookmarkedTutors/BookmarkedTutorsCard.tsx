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
const BookmarkedTutorsCard = (props: StudentInfo) => {
    const [studentName, setStudentName] = useState('');
    const [subject, setSubject] = useState('');
    const [time, setDateTime] = useState<any>(null);

    const deleteBookmark = ()=> {
        // remove bookmark using tutor id const deleteBookmark = (tutorid: string)=> {
    };

   return (
        <Card className="my-3">
            <div className="flex flex-row align-items-center gap-2">
                <div className="mr-6">
                    <i className="fa-regular fa-user fa-3x"></i>
                </div>
                <div className="flex">
                    <div className="flex-row">
                        <label id="Name" className="flex my-2 text-base">{props.Name}</label>
                        <label id="Subject" className="flex my-2 text-base">{props.Subject}</label>
                        <label id="DateTime" className="flex my-2 text-base">{props.DateTime}</label>
                    </div>
                </div>
                <div className="flex">
                    <Button icon="pi pi-bookmark" className="p-button-info"  onClick={() => deleteBookmark()}/>
                </div>
            </div>
        </Card>
    );
};
export { BookmarkedTutorsCard };