import React, { useEffect, useState } from "react";
import { AuthenticationStorage } from "../../constants/Model";
import { AccountType, PageLink, SessionStorage, AccountTypeList } from "../../constants/Constant";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Link } from "react-router-dom";

const LoginDashboard = () => {
    const [registerView, setRegister] = useState(false);
    const [accountType, setAccountType] = useState(AccountType.STUDENT);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [route, setRoute] = useState(PageLink.DASHBOARD_LOGIN);

    const accountTypeList = AccountTypeList;

    const accountTypeChange = (e: { value: any }) => { setAccountType(e.value); };

    const redirectScreen = () =>{
        if(accountType == AccountType.STUDENT){
            setRoute(PageLink.DASHBOARD_STUDENT);
            var sessionToken = { name: 'Test', sessionToken: 'ABCDS', accountType: AccountType.STUDENT, homeLink: PageLink.DASHBOARD_STUDENT };
            sessionStorage.setItem(SessionStorage.ACCOUNT, JSON.stringify(sessionToken));
        }else{
            setRoute(PageLink.DASHBOARD_TUTOR);
            var sessionToken = { name: 'Test', sessionToken: 'ABCDS', accountType: AccountType.TUTOR, homeLink: PageLink.DASHBOARD_TUTOR };
            sessionStorage.setItem(SessionStorage.ACCOUNT, JSON.stringify(sessionToken));
        }
    };

    if(registerView){
        return (
            <div className="global-component">
                <div className="p-4 flex flex-column h-screen">
                    <Card className="col-12 my-auto py-8">
                        <div className="grid">
                            <div className="col-12 text-center">
                                <img src={require('../../resources/TutorPeer.png')} width={400} height={120} alt=""/>
                            </div>
                            <div className="mx-auto my-5 grid align-items-center gap-4 col-6">
                                <InputText type="text" className="col-12"  value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                                <Password  className="col-12 p-0" inputClassName="col-12"  value={password} onChange={(e) => setPassword(e.target.value)}
                                           placeholder="Password" feedback={false}/>
                                <Dropdown optionLabel="name" optionValue="code" value={accountType} options={accountTypeList} onChange={accountTypeChange}/>
                                <div className="flex flex-grow-1 flex-row-reverse">
                                   <Link to={route} onClick={redirectScreen}>
                                        <Button label="Register" className="p-button-primary flex" />
                                   </Link>
                                        <Button label="Login" className="p-button-secondary" onClick={()=>setRegister(false)}/>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }else{
        return (
            <div className="global-component">
                <div className="p-4 flex flex-column h-screen">
                    <Card className="col-12 my-auto py-8">
                        <div className="grid">
                            <div className="col-12 text-center">
                                <Link to={PageLink.DEFAULT}>
                                    <img src={require('../../resources/TutorPeer.png')} width={400} height={120} alt=""/>
                                </Link>
                            </div>
                            <div className="mx-auto my-5 grid align-items-center gap-4 col-6">
                                <InputText type="text" className="col-12"  value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                                <Password  className="col-12 p-0" inputClassName="col-12"  value={password} onChange={(e) => setPassword(e.target.value)}
                                           placeholder="Password" feedback={false}/>
                                <Dropdown optionLabel="name" optionValue="code" value={accountType} options={accountTypeList} onChange={accountTypeChange}/>
                                <div className="flex flex-grow-1 flex-row-reverse">
                                   <Link to={route} onClick={redirectScreen}>
                                        <Button label="Login" className="p-button-primary flex" />
                                    </Link>
                                        <Button label="Register" className="p-button-secondary" onClick={()=>setRegister(true)}/>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}
export { LoginDashboard }