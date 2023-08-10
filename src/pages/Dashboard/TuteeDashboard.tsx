import React from "react";
import { UpcomingActivities } from '../ManageSessions/UpcomingActivities';
import { PendingRequest } from '../ManageSessions/PendingRequest';
import { ProfileCard } from './ProfileCard';
import { DasboardActionCard } from './DasboardActionCard';
import { BookmarkedTutorsList } from '../BookmarkedTutors/BookmarkedTutorsList';

const TuteeDashboard = ({refresh}: {refresh:number}) => {
    return (
        <div className="flex flex-column gap-3">
            <div className="flex flex-row flex-wrap gap-3">
                <div className="flex flex-grow-1 flex-column">
                    <div className="flex flex-row flex-wrap gap-3">
                        <ProfileCard />
                        <DasboardActionCard tutorView={false}/>
                    </div>
                    <UpcomingActivities refresh={refresh} />
                </div>
                <div className="flex flex-1 flex-column">
                    <PendingRequest refresh={refresh} />
                </div>
            </div>
            <div className="flex flex-1 flex-row">
                <BookmarkedTutorsList refresh={refresh}  tutorView={false} />
            </div>
        </div>
    );
};
export { TuteeDashboard };