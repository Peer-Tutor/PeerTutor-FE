import React, { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Panel } from 'primereact/panel';
import { Badge } from 'primereact/badge';
import { ScrollPanel } from 'primereact/scrollpanel';
import { IncomingRequestCard } from './IncomingRequestCard';
import { Divider } from "primereact/divider";
import { Paginator } from 'primereact/paginator';
import { PageLink, TUTOR_RESULTS_PAGINATION_PAGE_SIZE, SessionStorage, SubjectList } from "../../constants/Constant";


export type RequestResponse = {
    id: string,
    displayName: string,
    introduction: string,
    subjects: string,
    certificates: string,
};
const IncomingRequest = () => {
    const [value1, setValue1] = useState('');
    const [selectedCity1, setSelectedCity1] = useState<any>(null);
    const [date, setDate] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [requestList, setRequestList] = useState<RequestResponse[]>([]) // todo type script
    
    const cities = SubjectList;

    const template = (options:any) => {
        const className = `${options.className} justify-content-start`;
        const titleClassName = `Incoming Requests`;

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
                <div className="flex flex-row align-items-center gap-2 mb-3">
                    <div className="flex">
                        <span className="p-input-icon-left">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <InputText value={value1} onChange={(e) => setValue1(e.target.value)} placeholder="Requester Name"/>
                        </span>
                    </div>
                    <div className="flex">
                        <Dropdown optionLabel="name" value={selectedCity1} options={cities}
                                  onChange={(e) => setSelectedCity1(e.target.value)}
                                  placeholder="Subject" showClear
                                  />
                    </div>
                    <div className="flex-1 flex">
                        <Paginator
                            className="flex"
                            rows={TUTOR_RESULTS_PAGINATION_PAGE_SIZE}
                            totalRecords={2}
                            first={currentPage}
                            template="PrevPageLink CurrentPageReport NextPageLink"
                            onPageChange={(e) => {
                                setCurrentPage(e.first)
                                console.log('e.first', e.first, 'e', e)
                                if (totalRecords != 0) {
                                    const nextPageNum = Math.floor(e.first / TUTOR_RESULTS_PAGINATION_PAGE_SIZE);
                                    //setRequestList(setTotalRecords, setRequestList, nextPageNum)
                                } else {
                                    console.error('divide by 0 error!')
                                }
                            }}>
                        </Paginator>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1">
                        <IncomingRequestCard Name="Student1" Subject="Math" DateTime="21 Aug 2022 13:00"/>
                        <Divider key="1"/>
                        <IncomingRequestCard Name="Student2" Subject="English" DateTime="21 Aug 2022 14:00"/>
                    </div>
                </div>
           </Panel>
    )
};
export { IncomingRequest }