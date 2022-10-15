import React, { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { useNavigate } from "react-router-dom";
import { PageLink } from "../../constants/Constant";
import { ScrollPanel } from 'primereact/scrollpanel';
import { BookmarkedTutorsCard } from './BookmarkedTutorsCard';

type AccountInfo = { tutorView?: boolean; };

const BookmarkedTutorsList = (props: AccountInfo) => {

    const template = (options:any) => {
        const className = `${options.className} justify-content-start`;
        const titleClassName = `Bookmarked Tutors List`;

        return (
            <div className={className}>
                <label className="text-base font-semibold text-dark-blue mr-1">
                    {titleClassName}
                </label>
            </div>
        );
    };

    if(props.tutorView){
        return(
            <div>
            </div>
        );
    }else{
        return(
            <div className="card">
                <div className="global-card">
                <label className="text-xl">Bookmarked Tutors List</label>
                </div>
                <div className="grid">
                    <div className="col-12 md:col-4">
                        <ScrollPanel style={{ width: '310%', height: '80%' }}>
                             <BookmarkedTutorsCard Name="Tutor1" Subject="Math" DateTime="21 Aug 2022 13:00"/>
                             <BookmarkedTutorsCard Name="Tutor2" Subject="English" DateTime="21 Aug 2022 14:00"/>
                        </ScrollPanel>
                    </div>
                </div>
            </div>
        );
    }
};
export { BookmarkedTutorsList };
