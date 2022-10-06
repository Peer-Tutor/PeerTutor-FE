import axios from "axios"
import React, { useEffect, useState } from "react";
import { Subdomain } from "../../constants/Subdomain";
import { AuthenticationStorage } from "../../constants/Model";
import { PageLink, SessionStorage } from "../../constants/Constant";
import { getUrl } from "../../utils/apiUtils";
import styles from './PrimeReactSample.module.css'; //'./PrimeReactSample.module.css'
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Link } from "react-router-dom";
import { Paginator } from 'primereact/paginator';
import { TutorCard } from "./TutorCard";
type ResponseDataExample = string;

const SearchTutor = () => {
    const [state, setState] = useState<ResponseDataExample>() // todo type script


    useEffect(() => {
        const props = sessionStorage.getItem(SessionStorage.ACCOUNT);
        const url = getUrl(Subdomain.ACCOUNT_MGR, '/health');
        axios.get<ResponseDataExample>(url).then(res => {
            console.log("res.data=", res.data)
            setState(res.data)
        }).catch(err => {
            console.log('error!', err)
        });
    }, [])
    // console.log('page one rendered')


    return (
        <div>
            {/* <div className="global-card">
                <label className="text-3xl  text-orange">Search Tutor</label>
            </div> */}
            <Card className="flex flex-column px-4 py-4 w-8">
                    <CardHeader />
                    <TutorCard tutorId="1" subject={""} name={""} />
                    <TutorCard tutorId="2" subject={""} name={""} />
                    <TutorCard tutorId="3" subject={""} name={""} />
                <Paginator rows={10} totalRecords={120} first={0} onPageChange={(e) => { }}></Paginator>
            </Card>
        </div>
    )
}

const CardHeader = () => {
    return (
        <>
            <div className="flex flex-row align-items-center gap-3 mb-5">
                <div className="flex ">
                    <span className="p-input-icon-left">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <InputText className="w-12" value={"Search Tutor"} onChange={() => { }} placeholder="Session Name" />
                    </span>
                </div>
                <div className="flex flex-column align-items-center gap-3">
                    <Button label="Search Tutor" className="p-button-tertiary" />

                </div>
            </div>
        </>
    )
}
export { SearchTutor }