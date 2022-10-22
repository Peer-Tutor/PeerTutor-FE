import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLink } from "../../constants/Constant";
import { getSessionTokenValues, getUrl } from "../../utils/apiUtils";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';
import { TutorCardProps } from "../../constants/Model";
import { BookmarkResponse, deleteBookmark } from './BookmarkedServices';
import { Subdomain } from "../../constants/Subdomain";
import { TutorResponse } from "../../pages/SearchTutor/SearchTutor";
import { useForceUpdate } from '../../utils/HookUtils';


type BookmarkInfo = {
    TutorId?: string;
    StudentId?: string;
    Id?: number;
    Tutor?: TutorResponse;
}

const BookmarkedTutorsCard = (props: BookmarkInfo) => {
    const [studentName, setStudentName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [tutorId, setTutorId] = useState<any>(null);
    const [bookmarked, BookmarkTutor] = useState(false);
    const bookmarkUrl = getUrl(Subdomain.BOOKMARK_MGR, '/bookmark');
    const { sessionToken, profileId } = getSessionTokenValues();
    const [onForceUpdate, forceUpdate] = useForceUpdate();

    const navigate = useNavigate();
    const onClickHandler = (id: string) => {
        navigate(PageLink.BOOK_TUITION, { state: { tutorId: tutorId } });
    }
    const TutorDisplayName = ( props.Tutor != undefined ) ? props.Tutor.displayName : '';

    // set bookmark flag to true
    useEffect(() => {
        BookmarkTutor(true);
    }, []);

    const handleBookmarkSubmit = (id: string)=> {
        // delete bookmark
        console.log(id);
        deleteBookmark(id);
        BookmarkTutor(false);
    }

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
                <label className="flex text-xl text-black font-bold m-0">{TutorDisplayName ? TutorDisplayName : '-'}</label>
            </div>
                <Button icon="fa-solid fa-bookmark" style={{backgroundColor: "pink"}} className="p-button-primary-outlined" aria-label="Bookmark" onClick={() => handleBookmarkSubmit(props.TutorId ?? '')}
                    tooltip={bookmarked ? "Remove Bookmark" : "Bookmark"} tooltipOptions={{position: 'top'}}/>
                <Button icon="fa-solid fa-calendar-check" className="p-button-secondary" aria-label="Schedule" onClick={() => { onClickHandler(tutorId ?? '') }}
                    tooltip="Schedule Session" tooltipOptions={{position: 'top'}}/>
        </div>

              // <Card className="mx-3 flex border-solid">
              //     <div className="flex flex-row align-items-center gap-2">
              //         <div className="flex">
              //             <i className="text-5xl text-orange fa-regular fa-circle-user mx-3"></i>
              //         </div>
              //         <div className="flex flex-column flex-1">
              //             <label className="flex text-xl text-black font-bold m-0">{TutorDisplayName ? TutorDisplayName : '-'}</label>
              //         </div>
              //         <div className="align-items-evenly">
              //             <Button icon={bookmarked ? 'fa-solid fa-bookmark': 'fa-regular fa-bookmark'} className="p-button-primary-outlined" aria-label="Bookmark" onClick={()=>{handleBookmarkSubmit(props.TutorId ?? '')} }
              //                 tooltip={bookmarked ? "Remove Bookmark" : "Bookmark"} tooltipOptions={{position: 'top'}}/>
              //             <Button icon="fa-solid fa-calendar-check" className="p-button-secondary" aria-label="Schedule" onClick={() => { onClickHandler(tutorId ?? '') }}
              //                 tooltip="Schedule Session" tooltipOptions={{position: 'top'}}/>
              //         </div>
              //     </div>
              // </Card>
    );
};
export { BookmarkedTutorsCard };