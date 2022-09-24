import React, { useEffect, useState } from "react";
import { UpcomingActivities } from '../ManageSessions/UpcomingActivities';
import { IncomingRequest } from '../ManageSessions/IncomingRequest';
import { ProfileCard } from './ProfileCard';
import { DasboardActionCard } from './DasboardActionCard';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const TutorDashboard = () => {
    const viewObject = { tutorView: true };
    return (
    <div className="grid col-12">
        <div className="field col-7">
            <div className="flex gap-4">
                <ProfileCard    tutorView={true}
                                introduction={'Hi I\'m a tutor under tutor scheme'}
                                subjects={'Chinese;English'}
                                certificates={'Master;Bachelor'}
                />
                <DasboardActionCard tutorView={true}/>
            </div>
            <UpcomingActivities />
        </div>
        <div className="field col-5">
            <IncomingRequest />
        </div>
    </div>
    )
}
export { TutorDashboard }