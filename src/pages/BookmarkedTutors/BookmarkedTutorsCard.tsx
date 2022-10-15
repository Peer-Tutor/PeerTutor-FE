import React, { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';
import { TutorCardProps } from "../../constants/Model";

const BookmarkedTutorsCard = (props: TutorCardProps) => {

    const deleteBookmark = ()=> {
        // remove bookmark using tutor id const deleteBookmark = (tutorid: string)=> {
    };

   return (
        <Card className="mx-3 flex border-solid">
            <div className="flex flex-row align-items-center gap-2">
                <div className="flex">
                    <i className="text-6xl text-orange fa-regular fa-circle-user mx-3"></i>
                </div>
                <div className="flex flex-column flex-1">
                    <label className="flex text-xl text-black font-bold m-0">{props.name ? props.name : '-'}</label>
                    <label className="flex text-xs font-italic m-0 mt-1">{props.intro ? props.intro : '-'}</label>
                    <div className="flex flex-row mt-3">
                        <label className="flex text-xs text-black font-semibold mr-2">Subject:</label>
                        <label className="flex flex-1 text-xs text-black">{props.subject ? props.subject.replace(';', ', ') : '-'}</label>
                    </div>
                    <div className="flex flex-row mt-3">
                        <label className="flex text-xs text-black font-semibold mr-2">Certifications:</label>
                        <label className="flex flex-1 text-xs text-black">{props.certs ? props.certs.replace(';', ', ') : '-'}</label>
                   </div>
                </div>
                <div className="flex">
                    <Button icon="fa-solid fa-bookmark" className="p-button-primary-outlined" aria-label="Bookmark"  onClick={() => deleteBookmark()}/>
                </div>
            </div>
        </Card>
    );
};
export { BookmarkedTutorsCard };