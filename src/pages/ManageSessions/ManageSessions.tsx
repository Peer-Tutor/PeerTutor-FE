import React, { useEffect, useState } from "react";
import { UpcomingActivities } from './UpcomingActivities';
import { IncomingRequest } from './IncomingRequest';
import { SessionStats } from './SessionStats';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const ManageSessions = () => {
    return (
    <div className="grid col-12">
        <div className="field col-6">
           <SessionStats />
           <UpcomingActivities />
        </div>
        <div className="field col-6">
            <IncomingRequest />
        </div>
    </div>
    )
}
export { ManageSessions }