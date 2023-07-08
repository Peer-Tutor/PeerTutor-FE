import React, { useEffect, useState } from "react";
import { UpcomingActivities } from '../ManageSessions/UpcomingActivities';
import { IncomingRequest } from '../ManageSessions/IncomingRequest';
import { ProfileCard } from './ProfileCard';
import { DasboardActionCard } from './DasboardActionCard';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const TutorDashboard = ({ refresh }: { refresh: number }) => {
    const viewObject = { tutorView: true };
    return (
        <div className="flex flex-column">
            <div className="flex flex-row flex-wrap gap-3">
                <div className="flex flex-column flex-grow-1">
                    <div className="flex flex-row flex-wrap gap-3">
                        <ProfileCard tutorView={true}
                            introduction={'Hi I\'m a tutor under tutor scheme'}
                            subjects={'Chinese;English'}
                            certificates={'Master;Bachelor'} />
                    </div>
                    <UpcomingActivities refresh={refresh}/>
                </div>
                <div className="flex flex-grow-1 flex-column">
                    <IncomingRequest refresh={refresh}/>
                </div>
            </div>
        </div>
    );
};

export { TutorDashboard };