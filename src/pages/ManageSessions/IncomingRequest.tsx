import React, { useEffect, useState } from "react";
import { Subdomain } from "../../constants/Subdomain";
import { getUrl, getProfileId } from "../../utils/apiUtils";
import { Panel } from 'primereact/panel';
import { Badge } from 'primereact/badge';
import { ScrollPanel } from 'primereact/scrollpanel';
import { IncomingRequestCard } from './IncomingRequestCard';
import { SubjectList } from "../../constants/Constant";
import { IncomingRequestSearchBar } from './IncomingRequestSearchBar';
import { GetRequestResponse } from './IncomingRequestCard';
import { getTuitionOrderList } from './IncomingRequestService';
import { useForceUpdate } from '../../utils/HookUtils';

const IncomingRequest = ({ refresh }: { refresh: number }) => {
    const [totalRecords, setTotalRecords] = useState(0);

    const template = (options: any) => {
        const className = `${options.className} justify-content-start`;
        const titleClassName = `Incoming Requests`;

        return (
            <div className={className}>
                <label className="text-base font-semibold text-dark-blue mr-1">
                    {titleClassName}
                </label>
                <Badge value={totalRecords} severity="info"></Badge>
            </div>
        );
    };

    const [tuitionOrderList, setTuitionOrderList] = useState<GetRequestResponse[]>([]) // todo type script
    const [onForceUpdate, forceUpdate] = useForceUpdate();
    useEffect(() => {
        getTuitionOrderList(setTotalRecords, setTuitionOrderList)
    }, [refresh])

    useEffect(() => {
        if (onForceUpdate > 0) {
            getTuitionOrderList(setTotalRecords, setTuitionOrderList)
        }
    }, [onForceUpdate])


    const splitString = (dates: string) => {
        dates = dates.replace('[', '');
        dates = dates.replace(']', '');
        var datesSplit = dates.split(', ');
        return datesSplit;
    }

    return (
        <Panel headerTemplate={template} className="singlePanel" >
            <div className="flex flex-column align-items-start gap-2 mb-3">
                <div className="flex flex-1 w-full">
                    <IncomingRequestSearchBar setTotalRecords={setTotalRecords} setTuitionOrderList={setTuitionOrderList} />
                </div>
                <div className="flex flex-1 w-full">
                    <ScrollPanel className="flex flex-grow-1">
                        {tuitionOrderList && tuitionOrderList?.length > 0 ? tuitionOrderList?.map((filteredRecord, idx) => {
                            return (
                                <IncomingRequestCard key={idx} ID={filteredRecord.id} StudentID={filteredRecord.studentId} TutorID={String(getProfileId())} StudentName={filteredRecord.studentName} TutorName={filteredRecord.tutorName} DateTime={splitString(filteredRecord.selectedDates)} Status={filteredRecord.status} OnForceUpdate={forceUpdate} />
                            )
                        }) : <p className="text-sm text-center text-black font-semibold">No student request found.</p>}
                    </ScrollPanel>
                </div>
            </div>
        </Panel>
    );
};
export { IncomingRequest };