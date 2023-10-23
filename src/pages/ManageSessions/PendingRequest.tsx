import React, { useEffect, useState } from "react";
import { Panel } from 'primereact/panel';
import { Badge } from 'primereact/badge';
import { RequestStatus } from "../../constants/Constant";
import { UpcomingActivitiesCard } from './UpcomingActivitiesCard';
import { getPendingRequest } from './Services';
import { ScrollPanel } from 'primereact/scrollpanel';
import { UpcomingActivitiesResponse } from "../../constants/Model";
import { authenticatedSession } from '../../utils/apiUtils';
import { PageLink } from '../../constants/Constant';
import { useNavigate } from "react-router-dom";

const PendingRequest = ({refresh}: {refresh: number}) => {
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const [activityList, setActivities] = useState<UpcomingActivitiesResponse[]>();
    const [dateList, setDates] = useState<string[]>();
    
    const template = (options:any) => {
        const className = `${options.className} justify-content-start`;
        const titleClassName = `Pending Requests`;

        return (
            <div className={className}>
                <label className="text-base font-semibold text-dark-blue mr-1">
                    {titleClassName}
                </label>
                <Badge value={value} severity="info"></Badge>
            </div>
        );
    };

    useEffect(() => {
        if(authenticatedSession()){
            getPendingRequest(setActivities, setDates, setValue);
        }else{
            navigate(PageLink.UNAUTHORISED);
        }
    } , [refresh]);

    return (
        <Panel headerTemplate={template} className="singlePanel">
             <ScrollPanel style={{ height: '68vh' }}>
                { dateList && activityList && dateList.length > 0 && activityList.length > 0 ? dateList?.map((date)=>{
                    return(
                        <div className="flex flex-column mb-4">
                            <label className="flex flex-row text-xl text-black font-semibold my-2">{date}</label>
                            <div className="flex flex-row flex-wrap gap-3">
                                {activityList?.map((activity, idx)=>{
                                    if(activity.selectedDates === date){
                                        return(
                                            <UpcomingActivitiesCard
                                                key={activity.studentName}
                                                studentName={activity.studentName}
                                                tutorName={activity.tutorName}
                                                tutorId={activity.tutorId}
                                                date={activity.selectedDates}
                                                rejected={activity.status === RequestStatus.REJECTED ? true : false }/>
                                        )
                                    }
                                })
                                }
                            </div>
                        </div>
                    );
                  }) : <p className="text-sm text-center text-black font-semibold">No outstanding request.</p>
                }
             </ScrollPanel>
        </Panel>
    );
};
export { PendingRequest };