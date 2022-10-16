import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLink } from "../../constants/Constant";
import { getSessionTokenValues, getUrl } from "../../utils/apiUtils";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';
import { TutorCardProps } from "../../constants/Model";

type BookmarkInfo = {
    TutorId?: string;
    StudentId?: string;
    Name?: string;
}

const BookmarkedTutorsCard = (props: BookmarkInfo) => {
    const [studentName, setStudentName] = useState('');
    const [studentId, setTutorId] = useState('');
    const [tutorId, setStudentId] = useState<any>(null);

    const deleteBookmark = ()=> {
        // remove bookmark using tutor id const deleteBookmark = (tutorid: string)=> {
    };

   return (
        <Card className="mx-3 flex border-solid">
            <div className="flex flex-row align-items-center gap-2">
                <div className="flex">
                    <i className="text-5xl text-orange fa-regular fa-circle-user mx-3"></i>
                </div>
                <div className="flex flex-column flex-1">
                    <label className="flex text-xl text-black font-bold m-0">{props.Name ? props.Name : '-'}</label>
                </div>
                <div className="flex">
                    <Button icon="fa-solid fa-bookmark" className="p-button-primary-outlined" aria-label="Bookmark"  onClick={() => deleteBookmark()}/>
                </div>
            </div>
        </Card>
    );
};
export { BookmarkedTutorsCard };