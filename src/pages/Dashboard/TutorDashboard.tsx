import React from "react";
import { UpcomingActivities } from '../ManageSessions/UpcomingActivities';
import { IncomingRequest } from '../ManageSessions/IncomingRequest';
import { ProfileCard } from './ProfileCard';
import { authorisedRoute } from '../../utils/apiUtils';
import { PageLink } from '../../constants/Constant';
import { useNavigate } from "react-router-dom";

const TutorDashboard = ({ refresh }: { refresh: number }) => {
    const navigate = useNavigate();

    if(!authorisedRoute(PageLink.DASHBOARD_TUTOR)){ navigate(PageLink.UNAUTHORISED); }
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