import React, { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';

type ActivitiesInfo = {
    studentName?: string;
    tutorName?: string;
    date?: string;
    rejected?: boolean;
};
const UpcomingActivitiesCard = (props: ActivitiesInfo) => {
       return (
            <Card className={props.rejected ? "flex border-solid border-red-600" : "flex border-solid" }>
                <div className="flex flex-row align-items-center gap-2">
                    <div className="flex flex-column align-items-center">
                        <i className="text-5xl text-orange fa-regular fa-circle-user mx-3 mb-2"></i>
                        <label className="flex text-sm text-black font-semibold">{props.studentName}</label>
                    </div>
                    <div className="flex flex-column align-items-center">
                        <i className="text-5xl text-orange fa-solid fa-chalkboard-user mx-3 mb-2"></i>
                        <label className="flex text-sm text-black font-semibold">{props.tutorName}</label>
                    </div>
                </div>
            </Card>
        );
};
export { UpcomingActivitiesCard };