import React, { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Panel } from 'primereact/panel';
import { Badge } from 'primereact/badge';

const PendingRequest = () => {
    const [value1, setValue1] = useState('');
    const [selectedCity1, setSelectedCity1] = useState<any>(null);
    const [date, setDate] = useState<any>(null);
    const cities = [
            { name: 'English', code: 'English' },
            { name: 'History', code: 'History' },
            { name: 'Math', code: 'Math' },
            { name: 'Science', code: 'Science' },
            { name: 'Social Studies', code: 'Social Studies' }
        ];
    const template = (options:any) => {
        const className = `${options.className} justify-content-start`;
        const titleClassName = `Pending Requests`;

        return (
            <div className={className}>
                <label className="text-base font-semibold text-dark-blue mr-1">
                    {titleClassName}
                </label>
                <Badge value="4" severity="info"></Badge>
            </div>
        )
    };


    return (
           <Panel headerTemplate={template} className="singlePanel">
                <div className="flex flex-row align-items-center gap-2">
                    <div className="flex">
                        <span className="p-input-icon-left">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <InputText value={value1} onChange={(e) => setValue1(e.target.value)} placeholder="Requester Name"/>
                        </span>
                    </div>
                    <div className="flex">
                        <Dropdown optionLabel="name" value={selectedCity1} options={cities}
                                  onChange={(e) => setSelectedCity1(e.target.value)}
                                  placeholder="Requested Subject" showClear
                                  />
                    </div>
                </div>
            </Panel>
    )
}
export { PendingRequest }