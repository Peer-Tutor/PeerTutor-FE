import React, { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Panel } from 'primereact/panel';
import { Badge } from 'primereact/badge';
import { AccountType, PageLink, SessionStorage, AccountTypeList, SubjectList, CertificateList } from "../../constants/Constant";
import { getUrl, getSessionTokenValues } from '../../utils/apiUtils';
import { UpcomingActivitiesCard } from './UpcomingActivitiesCard';

type DasboardActionCardInput = { tutorView?: boolean; };
const UpcomingActivities = (props: DasboardActionCardInput) => {
    const [value, setValue] = useState(0);
    const [subject, setSubject] = useState<any>(null);
    const [date, setDate] = useState<any>(null);
    const subjectList = SubjectList;

    const template = (options:any) => {
        const className = `${options.className} justify-content-start`;
        const titleClassName = `Upcoming Activities`;

        return (
            <div className={className}>
                <label className="text-base font-semibold text-dark-blue mr-1">
                    {titleClassName}
                </label>
                <Badge value={value} severity="info"></Badge>
            </div>
        );
    };

    return (
        <Panel headerTemplate={template} className="my-3">
            <UpcomingActivitiesCard tutorView={props.tutorView ?? true} />
        </Panel>
    );
};
export { UpcomingActivities };