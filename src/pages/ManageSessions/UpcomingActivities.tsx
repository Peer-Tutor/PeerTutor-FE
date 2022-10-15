import React, { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Panel } from 'primereact/panel';
import { Badge } from 'primereact/badge';
import { AccountType, PageLink, SessionStorage, AccountTypeList, SubjectList, CertificateList } from "../../constants/Constant";

const UpcomingActivities = () => {
    const [value1, setValue1] = useState('');
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
                <Badge value="4" severity="info"></Badge>
            </div>
        );
    };

    return (
        <Panel headerTemplate={template} className="my-3">
            <div className="flex flex-row align-items-center gap-2">
                <div className="flex">
                    <span className="p-input-icon-left">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <InputText value={value1} onChange={(e) => setValue1(e.target.value)} placeholder="Session Name"/>
                    </span>
                </div>
                <div className="flex">
                    <Dropdown optionLabel="name" value={subject} options={subjectList}
                              onChange={(e) => setSubject(e.target.value)}
                              placeholder="Subject" showClear />
                </div>
                <div className="flex">
                    <Calendar className="align-items-center m-0" value={date} onChange={(e) => setDate(e.value)} dateFormat="dd-M-yy" showIcon showTime={false} showSeconds={false} placeholder="Session Date"/>
                </div>
                <div className="flex"><Button label="Clear All"  className="p-button-tertiary"/></div>
            </div>
        </Panel>
    );
};
export { UpcomingActivities };