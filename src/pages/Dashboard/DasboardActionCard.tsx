import React, { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';

type DasboardActionCardInput = { tutorView?: boolean; };

const DasboardActionCard = (props: DasboardActionCardInput) => {
    const introduction = "Teaching In Primary School";
    const subjects = "English;Math;PE";
    const certificates = "O-level;A-level";

    if(props.tutorView){
        return (
            <Card className="flex align-items-center">
                <div className="flex">
                    <div className="flex flex-column align-items-center gap-2 p-4">
                        <i className="text-6xl text-orange fa-regular fa-calendar-plus"></i>
                        <label className="text-base font-bold text-dark-blue">Create Session</label>
                    </div>
                </div>
            </Card>
        );
    }else{
        return (
            <Card className="flex align-items-center">
                <div className="flex">
                    <div className="flex flex-column align-items-center gap-2 p-4">
                        <i className="text-6xl text-orange fa-solid fa-people-group"></i>
                        <label className="text-base font-bold text-dark-blue">Search Tutor</label>
                    </div>
                </div>
            </Card>
        );
    }
}
export { DasboardActionCard }
