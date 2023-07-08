import React, { useEffect, useState } from "react";
import { AuthenticationStorage } from "../../constants/Model";
import { PageLink } from "../../constants/Constant";
import { Card } from 'primereact/card';
import { Link } from "react-router-dom";

const WelcomeDashboard = () => {
    return (
        <Card className="flex flex-column my-auto py-8">
            <div className="flex flex-column gap-6">
                <div className="flex flex-column align-items-center gap-3">
                    <Link to={PageLink.LOGIN}>
                        <img src={require('../../resources/TutorPeer.png')} width={300} height={90} alt=""/>
                    </Link>
                    <label className="flex text-center font-bold text-3xl text-black">Tutor Space</label>
                    <label className="flex text-center font-base text-base text-orange">A space for students to look for tutor</label>
                </div>
                <div className="flex flex-1 flex-row flex-wrap align-items-center gap-3">
                    <div className="flex flex-1 flex-column my-5 align-items-center gap-2">
                        <i className="flex text-3xl mr-3 fa-regular fa-calendar-check text-black"></i>
                        <label className="flex text-center font-bold text-xl text-orange">Manage Session</label>
                        <label className="flex text-center font-base text-xs text-black">Tutor can create / manage their tutor session according to their schedule.</label>
                    </div>
                    <div className="flex flex-1 flex-column align-items-center gap-2">
                        <i className="text-3xl mr-3 fa-solid fa-id-card text-black"></i>
                        <label className="flex text-center font-bold text-xl text-orange">Tuition Booking</label>
                        <label className="flex text-center font-base text-xs text-black">Book a session with a Tutor based on your preference.</label>
                    </div>
                    <div className="flex flex-1 flex-column align-items-center gap-2">
                            <i className="text-3xl mr-3 fa-solid fa-calendar-week text-black"></i>
                        <label className="flex text-center font-bold text-xl text-orange">Schedule View</label>
                        <label className="flex text-center font-base text-xs text-black">View upcoming tuition session</label>
                    </div>
                </div>    
             </div>
        </Card>
    );
};
export { WelcomeDashboard };