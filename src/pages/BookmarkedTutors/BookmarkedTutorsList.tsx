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

    if(props.tutorView){
        return(
            <div>
            </div>
        );
    }else{
        return(
            <Card>
                <label className="flex text-xl font-semibold text-black ml-2 mb-3">Bookmarked Tutors List</label>
                <div className="flex">
                    <div className="flex flex-row">
                        <BookmarkedTutorsCard name="Tutor1" intro="" subject="Math" certs="O-Level;Chemistry"/>
                        <BookmarkedTutorsCard name="Tutor2" intro="" subject="English" certs="O-Level;Chemistry"/>
                    </div>
                </div>
            </Card>
        );
    }
};
export { BookmarkedTutorsList };
