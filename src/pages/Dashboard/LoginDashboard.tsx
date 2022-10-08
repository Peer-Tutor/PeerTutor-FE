import React, { useEffect, useState, useRef } from "react";
import { Subdomain } from "../../constants/Subdomain";
import { AuthenticationStorage, AccountResponse } from "../../constants/Model";
import { AccountType, PageLink, SessionStorage, AccountTypeList } from "../../constants/Constant";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Link, useNavigate } from "react-router-dom";
import { getUrl } from "../../utils/apiUtils";
import axios from "axios";
import { useToastHook } from "../../utils/toastHooks";
import { Toast } from "primereact/toast";

const LoginDashboard = () => {
    const navigate = useNavigate();
    const [toast] = useToastHook()

    const [registerView, setRegister] = useState(false);
    const [accountType, setAccountType] = useState(AccountType.STUDENT);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [route, setRoute] = useState(PageLink.DASHBOARD_LOGIN);

    const accountTypeList = AccountTypeList;
    const accountTypeChange = (e: { value: any }) => { setAccountType(e.value); };

    const loginAccount = () => {
        const url = getUrl(Subdomain.ACCOUNT_MGR, '/account')
        axios.get<AccountResponse>(url, { params: { name: name, password: password } }).then(res => {
            if (accountType == AccountType.STUDENT) {
                var sessionToken = { name: name, sessionToken: res.data.sessionToken, accountType: AccountType.STUDENT, homeLink: PageLink.DASHBOARD_STUDENT };
                sessionStorage.setItem(SessionStorage.ACCOUNT, JSON.stringify(sessionToken));
                navigate(PageLink.DASHBOARD_STUDENT);
            } else {
                var sessionToken = { name: name, sessionToken: res.data.sessionToken, accountType: AccountType.TUTOR, homeLink: PageLink.DASHBOARD_TUTOR };
                sessionStorage.setItem(SessionStorage.ACCOUNT, JSON.stringify(sessionToken));
                navigate(PageLink.DASHBOARD_TUTOR);
            }
        }).catch(err => {
            console.log('error!', err);
        });
    };

    const registerAccount = () => {
        const url = getUrl(Subdomain.ACCOUNT_MGR, '/account')
        axios.post(url, { name: name, password: password, usertype: accountType }).then(res => {
            if (accountType == AccountType.STUDENT) {
                var sessionToken = { name: res.data.name, sessionToken: res.data.sessionToken, accountType: AccountType.STUDENT, homeLink: PageLink.DASHBOARD_STUDENT };
                sessionStorage.setItem(SessionStorage.ACCOUNT, JSON.stringify(sessionToken));
            } else {
                var sessionToken = { name: res.data.name, sessionToken: res.data.sessionToken, accountType: AccountType.TUTOR, homeLink: PageLink.DASHBOARD_TUTOR };
                sessionStorage.setItem(SessionStorage.ACCOUNT, JSON.stringify(sessionToken));
            }
            navigate(PageLink.MANAGE_ACCOUNT);
        }).catch(err => {
            console.log('error!', err);
        });
    };

    if (registerView) {
        return (
            <div className="global-component">
                <Toast ref={toast} />
                <div className="p-4 flex flex-column h-screen">
                    <Card className="col-12 my-auto py-8">
                        <div className="grid">
                            <div className="col-12 text-center">
                                <img src={require('../../resources/TutorPeer.png')} width={400} height={120} alt="" />
                            </div>
                            <div className="mx-auto my-5 grid align-items-center gap-4 col-6">
                                <InputText type="text" className="col-12" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                                <Password className="col-12 p-0" inputClassName="col-12" value={password} onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password" feedback={false} />
                                <Dropdown optionLabel="name" optionValue="code" value={accountType} options={accountTypeList} onChange={accountTypeChange} />
                                <div className="flex flex-grow-1 flex-row-reverse">
                                    <Link to={route} onClick={registerAccount}>
                                        <Button label="Register" className="p-button-primary flex" />
                                    </Link>
                                    <Button label="Login" className="p-button-secondary" onClick={() => setRegister(false)} />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    } else {
        return (
            <div className="global-component">
                <Toast ref={toast} />

                <div className="p-4 flex flex-column h-screen">
                    <Card className="col-12 my-auto py-8">
                        <div className="grid">
                            <div className="col-12 text-center">
                                <Link to={PageLink.DEFAULT}>
                                    <img src={require('../../resources/TutorPeer.png')} width={400} height={120} alt="" />
                                </Link>
                            </div>
                            <div className="mx-auto my-5 grid align-items-center gap-4 col-6">
                                <InputText type="text" className="col-12" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                                <Password className="col-12 p-0" inputClassName="col-12" value={password} onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password" feedback={false} />
                                <div className="flex flex-grow-1 flex-row-reverse">
                                    <Link to={route} onClick={loginAccount}>
                                        <Button label="Login" className="p-button-primary flex" />
                                    </Link>
                                    <Button label="Register" className="p-button-secondary" onClick={() => setRegister(true)} />
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