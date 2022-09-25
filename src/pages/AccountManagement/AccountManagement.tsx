import React, { useEffect, useState } from "react";
import { AuthenticationStorage } from "../../constants/Model";
import { AccountType, PageLink, SessionStorage, AccountTypeList, SubjectList } from "../../constants/Constant";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { MultiSelect } from 'primereact/multiselect';

const AccountManagement = () => {

    const [session, setSession] = useState<AuthenticationStorage>({});
    const [accountType, setAccountType] = useState(AccountType.STUDENT.toString());
    const [name, setName] = useState('');
    const [intro, setIntro] = useState('');
    const [password, setPassword] = useState('');
    const [subject, setSubject] = useState('');

    const [route, setRoute] = useState(PageLink.DASHBOARD_LOGIN);
    const subjectList = SubjectList;
    const accountTypeChange = (e: { value: any }) => { setAccountType(e.value); };

    useEffect(() => {
        const sessionToken = sessionStorage.getItem(SessionStorage.ACCOUNT);
        if(sessionToken != null){
            setSession(JSON.parse(sessionToken));
            setAccountType(session.accountType ?? AccountType.STUDENT);
            setName(session.name ?? '');
            setIntro(session.intro ?? '');
            setPassword(session.subject ?? '');
        }
    }, [])
    if(session.accountType == AccountType.STUDENT){
        return (
            <Card className="col-12 my-auto py-8">
                <div className="grid">
                    <div className="mx-auto my-5 grid align-items-center gap-4 col-6">
                        <InputText type="text" className="col-12"  value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                        <Password  className="col-12 p-0" inputClassName="col-12"  value={password} onChange={(e) => setPassword(e.target.value)}
                                   placeholder="Password" feedback={false}/>
                        <InputText type="text" className="col-12"  value={intro} onChange={(e) => setIntro(e.target.value)} placeholder="Introduction" />
                        <MultiSelect display="chip" className="col-12"  optionLabel="name" optionValue="code" placeholder="Subject"
                                     value={subject} options={subjectList} onChange={(e) => setSubject(e.value)} />
                        <div className="flex flex-grow-1 flex-row-reverse">
                            <Button label="Update" className="p-button-primary"/>
                        </div>
                    </div>
                </div>
           </Card>
        );
    }else if(session.accountType == AccountType.TUTOR){
        return (
            <Card className="col-12 my-auto py-8">
                <div className="grid">
                    <div className="mx-auto my-5 grid align-items-center gap-4 col-6">
                        <InputText type="text" className="col-12"  value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                        <Password  className="col-12 p-0" inputClassName="col-12"  value={password} onChange={(e) => setPassword(e.target.value)}
                                   placeholder="Password" feedback={false}/>
                        <InputText type="text" className="col-12"  value={intro} onChange={(e) => setIntro(e.target.value)} placeholder="Introduction" />
                        <div className="flex flex-grow-1 flex-row-reverse">
                            <Button label="Update" className="p-button-primary"/>
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