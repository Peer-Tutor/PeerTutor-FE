import React, { useEffect, useState } from "react";
import { Subdomain } from "../../constants/Subdomain";
import { AccountResponse } from "../../constants/Model";
import { AccountType, SubjectList, CertificateList } from "../../constants/Constant";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { getUrl,
        getProfileName, getAccountType, getSessionToken,
        getDisplayName, setDisplayName,
        getIntro, setIntro,
        getSubject, setSubject,
        getProfileId, setProfileId
} from "../../utils/apiUtils";
import axios from "axios";
import { useToastHook } from "../../utils/toastHooks";
import { Toast } from "primereact/toast";

const AccountManagement = () => {
    const [toast] = useToastHook();

    const [name, setName] = useState('');
    const [intro, setIntroduction] = useState('');
    const [subject, setProfileSubject] = useState<string[]>([]);
    const [certificate, setCertificate] = useState<string[]>([]);
    const subjectList = SubjectList;
    const certificateList = CertificateList;

    useEffect(() => {
        setName(getDisplayName());
        setIntroduction(getIntro());
        setProfileSubject(getSubject());

        let url = '';
        if(getAccountType().toString() === AccountType.STUDENT){
            url = getUrl(Subdomain.STUDENT_MGR, '/student');
        }else{
            url = getUrl(Subdomain.TUTOR_MGR, '/tutor');
        }

        axios.get<AccountResponse>(url, { params: {
            name: getProfileName() ?? '',
            sessionToken: getSessionToken() ?? '',
            accountName: getProfileName(),
            id: getProfileId() ?? ''
        } }).then(res => {
            if(res.data){
                setDisplayName(res.data.displayName ?? '');
                setProfileId(res.data.id);
                setName(res.data.displayName ?? '');
                setIntro(res.data.introduction ?? '');
                setSubject(res.data.subjects ? res.data.subjects.split(';') : []);
                setCertificate(res.data.certificates ? res.data.certificates.split(';') : []);
            }
        }).catch(err => {
        });
    }, []);

    const successUpdate = () => {
        return (
            <div className="flex flex-row align-items-center" style={{flex: '1'}}>
                <div className="flex mx-3">
                    <i className="text-xl text-green fa-solid fa-circle-check"></i>
                </div>
                <div className="flex flex-1 flex-column">
                    <label className="flex text-lg text-green font-bold">Successfully updated</label>
                    <label className="text-xs text-white font-normal">Account profile updated successfully.</label>
                </div>
            </div>
        );
    };

    const updateStudentProfile = () =>{
       const url = getUrl(Subdomain.STUDENT_MGR, '/student');
       axios.post(url, {
            name: getProfileName(),
            sessionToken: getSessionToken(),
            accountName: getProfileName(),
            displayName: name,
            introduction: intro,
            subjects: subject.join(';')
       }).then(res => {
            toast?.current?.show({ severity: 'success', content: successUpdate(), closable : false, life: 5000 });
            setDisplayName(res.data.displayName);
            setProfileId(res.data.id);
            setSubject(res.data.subjects);
            setIntro(res.data.introduction);
       }).catch(err => { });
    };

    const updateTutorProfile = () =>{
       const url = getUrl(Subdomain.TUTOR_MGR, '/tutor');
       axios.post(url, {
            name: getProfileName(),
            sessionToken: getSessionToken(),
            accountName: getProfileName(),
            displayName: name,
            introduction: intro,
            subjects: subject.join(';'),
            certificates: certificate.join(';')
       }).then(res => {
            toast?.current?.show({ severity: 'success', content: successUpdate(), closable : false, life: 5000 });
            setDisplayName(res.data.displayName);
            setProfileId(res.data.id);
            setSubject(res.data.subjects);
            setIntro(res.data.introduction);
       }).catch(err => { });
    };

    if(getAccountType().toString() === AccountType.STUDENT){
        return (
            <Card className="col-12 my-auto py-8">
                <Toast ref={toast} />
                <div className="flex flex-1">
                    <div className="flex flex-column mx-auto gap-5 col-6">
                        <div className="flex flex-column gap-2">
                            <label className="text-orange text-sm font-semibold">Display Name</label>
                            <InputText  type="text" className="col-12"  value={name} onChange={(e) => setName(e.target.value)}
                                        keyfilter={/^[a-zA-Z_\s]/}
                                        tooltip="Name displayed when others view your profile" tooltipOptions={{ position: 'right' }}/>
                        </div>
                        <div className="flex flex-column gap-2">
                            <label className="text-orange text-sm font-semibold">Introduction</label>
                            <InputText  type="text" className="col-12"  value={intro} onChange={(e) => setIntroduction(e.target.value)}
                                        tooltip="Short introduction about yourself, when others view your profile" tooltipOptions={{ position: 'right' }}/>
                        </div>
                        <div className="flex flex-column gap-2">
                            <label className="text-orange text-sm font-semibold">Subjects</label>
                            <MultiSelect display="chip" className="col-12"  optionLabel="name" optionValue="code"
                                     value={subject} options={subjectList} onChange={(e) => setProfileSubject(e.value)}
                                     tooltip="Subjects that require tutoring service on" tooltipOptions={{ position: 'right' }}/>
                        </div>
                        <div className="flex flex-grow-1 flex-row-reverse">
                            <Button label="Update" className="p-button-primary" onClick={updateStudentProfile} />
                        </div>
                    </div>
                </div>
           </Card>
        );
    }else if(getAccountType().toString() === AccountType.TUTOR){
        return (
            <Card className="col-12 my-auto py-8">
                <div className="flex flex-1">
                    <div className="flex flex-column mx-auto gap-5 col-6">
                        <div className="flex flex-column gap-2">
                            <label className="text-orange text-sm font-semibold">Display Name</label>
                            <InputText  type="text" className="col-12"  value={name} onChange={(e) => setName(e.target.value)}
                                        keyfilter={/^[a-zA-Z_\s]/}
                                        tooltip="Name displayed when others view your profile" tooltipOptions={{ position: 'right' }}/>
                        </div>
                        <div className="flex flex-column gap-2">
                            <label className="text-orange text-sm font-semibold">Introduction</label>
                            <InputText type="text" className="col-12"  value={intro} onChange={(e) => setIntroduction(e.target.value)}
                                       tooltip="Short introduction about yourself, when others view your profile" tooltipOptions={{ position: 'right' }}/>
                        </div>
                        <div className="flex flex-column gap-2">
                            <label className="text-orange text-sm font-semibold">Subjects</label>
                            <MultiSelect    display="chip" className="col-12"  optionLabel="name" optionValue="code"
                                            value={subject} options={subjectList} onChange={(e) => setProfileSubject(e.value)}
                                            tooltip="Subjects that your are able to provide tutoring service on" tooltipOptions={{ position: 'right' }}/>
                        </div>
                        <div className="flex flex-column gap-2">
                            <label className="text-orange text-sm font-semibold">Certificates</label>
                            <MultiSelect    display="chip" className="col-12"  optionLabel="name" optionValue="code"
                                            value={certificate} options={certificateList} onChange={(e) => setCertificate(e.value)}
                                            tooltip="List of education certifications you have achieved" tooltipOptions={{ position: 'right' }}/>
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
};
export { AccountManagement };