import React, { useEffect, useState, useRef } from "react";
import { Subdomain } from "../../constants/Subdomain";
import { AuthenticationStorage, AccountResponse } from "../../constants/Model";
import { AccountType, PageLink, SessionStorage, AccountTypeList, SubjectList, CertificateList } from "../../constants/Constant";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { MultiSelect } from 'primereact/multiselect';
import { getUrl } from "../../utils/apiUtils";
import axios from "axios";
import { Link, useNavigate  } from "react-router-dom";

const AccountManagement = () => {
    const navigate = useNavigate();

    const [session, setSession] = useState<AuthenticationStorage>({});
    const [name, setName] = useState('');
    const [intro, setIntro] = useState('');
    const [subject, setSubject] = useState<string[]>([]);
    const [certificate, setCertificate] = useState<string[]>([]);
    const [route, setRoute] = useState(PageLink.DASHBOARD_LOGIN);
    const subjectList = SubjectList;
    const certificateList = CertificateList;

    useEffect(() => {
        const sessionToken = sessionStorage.getItem(SessionStorage.ACCOUNT);
        if(sessionToken != null){
            const token = JSON.parse(sessionToken);
            setSession(token);
            setName(token.displayName ?? token.name ?? '');
            setIntro(token.intro ?? '');
            setSubject(token.subject ? token.subject.split(';') : []);
            let url = '';
            if(token.accountType == AccountType.STUDENT){
                url = getUrl(Subdomain.STUDENT_MGR, '/student');
            }else{
                url = getUrl(Subdomain.TUTOR_MGR, '/tutor');
            }
            axios.get<AccountResponse>(url, { params: {
                name: token.name ?? '',
                sessionToken: token.sessionToken ?? '',
                accountName: token.name,
                id: token.profileId ?? ''
            } }).then(res => {
                token.displayName = res.data.displayName;
                token.profileId = Number(res.data.displayName);
                setName(res.data.displayName ?? token.name ?? '');
                setIntro(res.data.introduction ?? '');
                setSubject(res.data.subjects ? res.data.subjects.split(';') : []);
                setCertificate(res.data.certificates ? res.data.certificates.split(';') : []);
            }).catch(err => {
                console.log('error!', err);
            });
        };
    }, []);

    const updateStudentProfile = () =>{
       const url = getUrl(Subdomain.STUDENT_MGR, '/student');
       axios.post(url, {
            name: session.name,
            sessionToken: session.sessionToken,
            accountName: session.name,
            displayName: name,
            introduction: intro,
            subjects: subject.join(';')
       }).then(res => {
            session.displayName = res.data.displayName;
            session.profileId = res.data.id;
            sessionStorage.setItem(SessionStorage.ACCOUNT, JSON.stringify(session));
            navigate(0);
       }).catch(err => {
            console.log('error!', err);
       });
    };

    const updateTutorProfile = () =>{
       const url = getUrl(Subdomain.TUTOR_MGR, '/tutor');
       axios.post(url, {
            name: session.name,
            sessionToken: session.sessionToken,
            accountName: session.name,
            displayName: name,
            introduction: intro,
            subjects: subject.join(';'),
            certificates: certificate.join(';')
       }).then(res => {
            session.displayName = res.data.displayName;
            session.profileId = res.data.id;
            sessionStorage.setItem(SessionStorage.ACCOUNT, JSON.stringify(session));
            navigate(0);
       }).catch(err => {
            console.log('error!', err);
       });
    };


    if(session.accountType == AccountType.STUDENT){
        return (
            <Card className="col-12 my-auto py-8">
                <div className="flex flex-1">
                    <div className="flex flex-column mx-auto gap-5 col-6">
                        <div className="flex flex-column gap-2">
                            <label className="text-orange text-sm font-semibold">Display Name</label>
                            <InputText type="text" className="col-12"  value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="flex flex-column gap-2">
                            <label className="text-orange text-sm font-semibold">Introduction</label>
                            <InputText type="text" className="col-12"  value={intro} onChange={(e) => setIntro(e.target.value)}/>
                        </div>
                        <div className="flex flex-column gap-2">
                            <label className="text-orange text-sm font-semibold">Subjects</label>
                            <MultiSelect display="chip" className="col-12"  optionLabel="name" optionValue="code"
                                     value={subject} options={subjectList} onChange={(e) => setSubject(e.value)} />
                        </div>
                        <div className="flex flex-grow-1 flex-row-reverse">
                            <Button label="Update" className="p-button-primary" onClick={updateStudentProfile}/>
                        </div>
                    </div>
                </div>
           </Card>
        );
    }else if(session.accountType == AccountType.TUTOR){
        return (
            <Card className="col-12 my-auto py-8">
                <div className="flex flex-1">
                    <div className="flex flex-column mx-auto gap-5 col-6">
                        <div className="flex flex-column gap-2">
                            <label className="text-orange text-sm font-semibold">Display Name</label>
                            <InputText type="text" className="col-12"  value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="flex flex-column gap-2">
                            <label className="text-orange text-sm font-semibold">Introduction</label>
                            <InputText type="text" className="col-12"  value={intro} onChange={(e) => setIntro(e.target.value)}/>
                        </div>
                        <div className="flex flex-column gap-2">
                            <label className="text-orange text-sm font-semibold">Subjects</label>
                            <MultiSelect display="chip" className="col-12"  optionLabel="name" optionValue="code"
                                     value={subject} options={subjectList} onChange={(e) => setSubject(e.value)} />
                        </div>
                        <div className="flex flex-column gap-2">
                            <label className="text-orange text-sm font-semibold">Subjects</label>
                            <MultiSelect display="chip" className="col-12"  optionLabel="name" optionValue="code"
                                     value={certificate} options={certificateList} onChange={(e) => setCertificate(e.value)} />
                        </div>
                        <div className="flex flex-grow-1 flex-row-reverse">
                            <Button label="Update" className="p-button-primary" onClick={updateTutorProfile}/>
                        </div>
                    </div>
                </div>
           </Card>
        );
    }else{
        return (
            <Card className="col-12 my-auto py-8">
                <div className="grid">
                    <div className="mx-auto my-5 grid align-items-center gap-4 col-6">
                        <label className="text-orange text-xl">Error encounter please contact administrator</label>
                    </div>
                </div>
           </Card>
        );
    }
}
export { AccountManagement }