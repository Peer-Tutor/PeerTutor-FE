import React, { useEffect, useState } from "react";
import { AuthenticationStorage } from "../../constants/Model";
import { PageLink } from "../../constants/Constant";
import { Card } from 'primereact/card';
import { Link } from "react-router-dom";

const WelcomeDashboard = () => {
    return (
        <Card className="col-12 my-auto py-8">
            <div className="grid">
                <div className="col-12 text-center">
                    <Link to={PageLink.LOGIN}>
                        <img src={require('../../resources/TutorPeer.png')} width={400} height={120} alt=""/>
                    </Link>
                </div>
                <div className="col-offset-3 my-5 grid align-items-center gap-2 col-6">
                    <label className="col-12 text-center font-bold text-3xl text-orange">Tutor Space</label>
                    <label className="col-12 text-center font-base text-base text-black">A space for students to look for tutor</label>
                </div>
                <div className="col-4 my-5 grid align-items-center gap-2">
                    <label className="col-12 text-center font-bold text-3xl text-orange">
                        <i className="text-4xl mr-3 fa-regular fa-calendar-check text-black"></i>Manage Session
                     </label>
                    <label className="col-12 text-center font-base text-xs text-black">Tutor can create / manage their tutor session according to their schedule.</label>
                </div>
                <div className="col-4 my-5 grid align-items-center gap-2">
                    <label className="col-12 text-center font-bold text-3xl text-orange">
                         <i className="text-4xl mr-3 fa-solid fa-id-card text-black"></i>Tuition Booking
                     </label>
                    <label className="col-12 text-center font-base text-xs text-black">Book a session with a Tutor based on your preference.</label>
                </div>
                <div className="col-4 my-5 grid align-items-center gap-2">
                    <label className="col-12 text-center font-bold text-3xl text-orange">
                        <i className="text-4xl mr-3 fa-solid fa-calendar-week text-dark-blue"></i>Schedule View
                     </label>
                    <label className="col-12 text-center font-base text-xs text-black">View upcoming tuition session</label>
                </div>
             </div>
        </Card>
    );
};
export { WelcomeDashboard };