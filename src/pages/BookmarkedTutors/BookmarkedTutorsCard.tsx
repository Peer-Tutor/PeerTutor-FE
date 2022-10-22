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

    const deleteBookmark = () => {
        // remove bookmark using tutor id const deleteBookmark = (tutorid: string)=> {
    };

    return (

        //     <div className="surface-ground p-4 border-round w-5">
        //     <div className="flex flex-column justify-content-center align-items-center gap-3">
        //         <i className="text-5xl text-orange fa-solid fa-chalkboard-user"></i>
        //         <label className="flex text-xl text-black font-bold">{tutorName}</label>
        //         <label className="flex flex-1 text-xs text-black">{subjectList.replaceAll(';', ', ')}</label>
        //         <Rating className="text-xs" value={5} stars={5} cancel={false} readOnly />
        //     </div>
        // </div>
        <div className="flex surface-ground p-4 border-round w-3 justify-content-between align-items-center">
            <div className="flex">
                {/* <i className="text-5xl text-orange fa-regular fa-circle-user mx-3"></i> */}
                 <i className="text-5xl text-orange fa-solid fa-chalkboard-user mx-3"></i>

            </div>
            <div className="flex flex-column flex-1">
                <label className="flex text-xl text-black font-bold m-0">{props.Name ? props.Name : '-'}</label>
            </div>
                <Button icon="fa-solid fa-bookmark" style={{backgroundColor: "pink"}} className="p-button-primary-outlined" aria-label="Bookmark" onClick={() => deleteBookmark()} />
        </div>
    );
};
export { BookmarkedTutorsCard };