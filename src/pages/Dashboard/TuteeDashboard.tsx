import React, { useEffect, useState } from "react";
import { UpcomingActivities } from '../ManageSessions/UpcomingActivities';
import { PendingRequest } from '../ManageSessions/PendingRequest';
import { ProfileCard } from './ProfileCard';
import { DasboardActionCard } from './DasboardActionCard';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { BookmarkedTutorsList } from '../BookmarkedTutors/BookmarkedTutorsList';

const TuteeDashboard = () => {
    return (
    <div className="grid col-12">
        <div className="field col-7">
            <div className="flex gap-4">
                <ProfileCard />
                <DasboardActionCard tutorView={false}/>
            </div>
            <UpcomingActivities />
            <BookmarkedTutorsList tutorView={false} />
        </div>
        <div className="field col-5">
            <PendingRequest />
        </div>
    </div>
    )
}
export { TuteeDashboard }