import axios from "axios"
import React, {  useEffect, useState } from "react";
import { Subdomain } from "../../constants/Subdomain";
import { AuthenticationStorage } from "../../constants/Model";
import { PageLink, SessionStorage } from "../../constants/Constant";
import { getSessionTokenValues, getUrl } from "../../utils/apiUtils";
import { Card } from "primereact/card";
import { Paginator } from 'primereact/paginator';
import { TutorCard } from "./TutorCard";
import { SearchBar } from "./SearchBar";

export type TutorOrdersResponse = {
    id: string,
    displayName: string,
    introduction: string,
    subjects: string,
    certificates: string,
}
const SearchTutor = () => {
    const [tutorList, setTutorList] = useState<TutorOrdersResponse[]>([]) // todo type script
    const { name, sessionToken, profileId } = getSessionTokenValues()
    const url = getUrl(Subdomain.TUTOR_MGR, '/tutors');
    useEffect(() => {
        axios.get<TutorOrdersResponse[]>(url, {
            params: {
                name: name ?? '',
                sessionToken: sessionToken ?? '',
            }
        }).then(res => {
            // console.log(res)
            setTutorList(res.data)
        }).catch(err => {
            console.log('error!', err);
        });
    }, [])


    return (
        <div>
            <Card className="flex flex-column px-4 py-4 w-8">
                <SearchBar setTutorList={setTutorList} />
                {tutorList && tutorList?.length > 0 ? tutorList?.map((tutor, idx) => {
                    console.log(tutor.introduction)
                    return <TutorCard key={idx} intro={tutor.introduction} certs={tutor.certificates} tutorId={tutor.id} subject={tutor.subjects} name={tutor.displayName} />
                }) : undefined}
                <Paginator rows={10} totalRecords={120} first={0} onPageChange={(e) => { }}></Paginator>
            </Card>
        </div>
    )
}


export { SearchTutor }