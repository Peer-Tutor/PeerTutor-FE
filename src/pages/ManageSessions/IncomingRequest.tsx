import axios from "axios"
import React, { useEffect, useState } from "react";
import { Subdomain } from "../../constants/Subdomain";
import { AuthenticationStorage } from "../../constants/Model";
import { getSessionTokenValues, getUrl } from "../../utils/apiUtils";
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
import { IncomingRequestSearchBar } from './IncomingRequestSearchBar';

export type RequestResponse = {
    id: string,
    studentName: string,
    tutorId:number,
    tutorName: string,
    displayName: string,
    introduction: string,
    subjects: string,
    certificates: string,
    startTime: string,
    status: string
}

const IncomingRequest = () => {
    const [value1, setValue1] = useState('');
    const [subject, setSubject] = useState<any>(null);
    const [date, setDate] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [requestList, setRequestList] = useState<RequestResponse[]>([]); // todo type script
    
    const subjectList = SubjectList;

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
        );
    };

        const [tuitionOrderList, setTuitionOrderList] = useState<RequestResponse[]>([]) // todo type script
        const { name, sessionToken, profileId } = getSessionTokenValues()
        const url = getUrl(Subdomain.TUITION_ORDER_MGR, '/detailedTuitionOrders');
        useEffect(() => {
            axios.get<RequestResponse[]>(url, {
                params: {
                    name: name ?? '',
                    sessionToken: sessionToken ?? '',
                }
            }).then(res => {
                const filteredList = res.data?.filter(record => (record.tutorId == profileId && record.status == '1'));
                setTuitionOrderList(filteredList);
            }).catch(err => {
                console.log('error!', err);
            });
        }, [])
    return (
           <Panel headerTemplate={template} className="singlePanel">
                <div className="flex flex-row align-items-center gap-2 mb-3">
                    <div className="flex">
                        <IncomingRequestSearchBar setTuitionOrderList={setTuitionOrderList} />
                    </div>
                    <div className="flex">
                        <Dropdown optionLabel="name" value={subject} options={subjectList}
                                  onChange={(e) => setSubject(e.target.value)}
                                  placeholder="Subject" showClear/>
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
                                   // setRequestList(setTotalRecords, setRequestList, nextPageNum)
                                } else {
                                    console.error('divide by 0 error!')
                                }
                            }}>
                        </Paginator>
                    </div>
                </div>
                <div className="grid">
                    <div className="col-12 md:col-4">
                        <ScrollPanel style={{ width: '300%', height: '80%' }}>
                            {tuitionOrderList && tuitionOrderList?.length > 0  ? tuitionOrderList?.map((filteredRecord, idx) => {
                                    return <IncomingRequestCard key={idx} StudentName={filteredRecord.studentName} TutorName={filteredRecord.tutorName} DateTime={filteredRecord.startTime} />
                            }) : <p className="text-center">No students found.</p>}
                        </ScrollPanel>
                    </div>
                </div>
           </Panel>
    );
};
export { IncomingRequest };