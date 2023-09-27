import React, { useEffect, useState } from "react";
import { Subdomain } from "../../constants/Subdomain";
import { AccountResponse } from "../../constants/Model";
import { AccountType, PageLink, AccountTypeList } from "../../constants/Constant";
import { LOGIN_NAME_REGEX, LOGIN_NAME_SIZE, PASSWORD_REGEX, PASSWORD_SIZE } from "../../constants/Validation";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Link, useNavigate } from "react-router-dom";
import {
    saveSessionTokenValue, getUrl, getProfileName, getAccountType, getHomeLink, getSessionToken,
    setDisplayName, setProfileId, setIntro, setSubject
} from "../../utils/apiUtils";
import axios from "axios";
import { useToastHook } from "../../utils/toastHooks";
import { Toast } from "primereact/toast";
import { TestLoginPage } from "../../auth/TestLoginPage";
import { useAuthenticator } from '@aws-amplify/ui-react';

const LoginDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [toast] = useToastHook();

    const [registerView, setRegister] = useState(false);
    const [accountType, setAccountType] = useState(AccountType.STUDENT);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const isButtonDisabled = (name === '' || password === '' || !(PASSWORD_REGEX.test(password))); // Disable button when inputValue is empty

    const accountTypeList = AccountTypeList;
    const accountTypeChange = (e: { value: any }) => { setAccountType(e.value); };
    const { user, signOut, route } = useAuthenticator((context) => [context.route]);
    let authenticated = route === 'authenticated'

    useEffect(() => {
        console.log('calling on refresh, route = ', route)

        if (route === 'authenticated') {
            // TODO: shift to navbar or layout to route to unprotected if is not authenticated
            // onRefresh()
            console.log("User signed in")
            // TODO: Call user login flow api
            loginAccount()
        } else if (route === 'confirmSignUp') { // vs confirmSignUp?
            console.log("Clicked on sign up")
            // updateProfile(true); // temp
            registerAccount()
            // todo: call sign up flow api
        }
    }, [route])

    const loginAccount = () => {
        setLoading(true);
        const url = getUrl(Subdomain.ACCOUNT_MGR, '/account')
        console.log("Calling acc mgr")
        axios.get<AccountResponse>(url, { params: { name: name, password: password } }).then(res => {
            return res
        }).then((res) => {
            saveSessionTokenValue(name, res.data.sessionToken ?? '', res.data.usertype ?? '');
        }).then(()=>{
            updateProfile(false);
        }).catch(err => {
            setLoading(false);
        });
    };

    const registerAccount = () => {
        setLoading(true);
        const url = getUrl(Subdomain.ACCOUNT_MGR, '/account')
        console.log("Registering account, accountType = ", accountType)
        axios.post(url, { name: name, password: password, usertype: accountType }).then(res => {
            return res
        }).then(res => {
            saveSessionTokenValue(name, res.data.sessionToken ?? '', res.data.usertype ?? '');
        }).then(()=>{
            updateProfile(true);
        }).catch(err => {
            setLoading(false);
        });
    };

    const updateProfile = (newAccount: boolean) => {
        console.log("Calling updateProfile")
        let profileURL = '';
        let profile = {}
        if (getAccountType().toString() === AccountType.STUDENT) {
            profileURL = getUrl(Subdomain.STUDENT_MGR, '/student');
            profile = {
                name: getProfileName(), sessionToken: getSessionToken(),
                accountName: getProfileName(), displayName: getProfileName(),
                introduction: '', subjects: ''
            };
        } else {
            profileURL = getUrl(Subdomain.TUTOR_MGR, '/tutor');
            profile = {
                name: getProfileName(), sessionToken: getSessionToken(),
                accountName: getProfileName(), displayName: getProfileName(),
                introduction: '', subjects: '', certificates: ''
            };
        }

        if (newAccount) {
            console.log("Is new account, update profile MANAGE_ACCOUNT")
            axios.post(profileURL, profile).then(res => {
                setDisplayName(res.data.displayName);
                setProfileId(res.data.id);
                setTimeout(() => {
                    setLoading(false);
                    navigate(PageLink.MANAGE_ACCOUNT);
                }, 1000);
            }).catch(err => {
                setLoading(false);
            });
        } else {
            console.log("Not new account, calling profileURL")
            axios.get<AccountResponse>(profileURL, { params: profile }).then(res => {
                console.log("HELLO, res = ", res)
                if (res.data) {
                    setDisplayName(res.data.displayName ?? '');
                    setProfileId(res.data.id);
                    setIntro(res.data.introduction ?? '');
                    setSubject(res.data.subjects ? res.data.subjects.split(';') : []);
                }
                setTimeout(() => {
                    setLoading(false);
                    navigate(getHomeLink());
                }, 1000);
            }).catch(err => {
                setLoading(false);
            });
        }
    };

    if (registerView) {
        return (
            <div className="global-component">
                <Toast ref={toast} />
                <div className="p-4 flex flex-column h-screen">
                    <Card className="col-12 my-auto py-8">
                        <div className="grid">
                            <div className="col-12 text-center">
                                <img src={require('../../resources/TutorPeer.png')} width={400} height={120} alt="" onClick={() => navigate(getHomeLink())} />
                            </div>
                            <div className="mx-auto my-5 grid align-items-center gap-4 col-6">
                                <InputText type="text" className="col-12" keyfilter={LOGIN_NAME_REGEX} value={name} onChange={(e) => setName(e.target.value)}
                                    placeholder="Name" maxLength={LOGIN_NAME_SIZE}
                                    tooltip="Name should not contain numeric or special characters" tooltipOptions={{ event: 'both', position: 'right' }} />
                                <Password className="col-12 p-0" inputClassName="col-12" value={password} onChange={(e) => setPassword(e.target.value)}
                                    keyfilter={/^[^\#\$\^\*\(\)\-\=\_\+\{\}\|\[\]\;\'\:\"\<\>\?\,\.\/]+$/}
                                    placeholder="Password" feedback={true} maxLength={PASSWORD_SIZE}
                                    weakLabel="Current password is not advisable to ensure account secured."
                                    mediumLabel="Password entered could be stronger to keep your account secured."
                                    strongLabel="Current password is advisable and sufficient to keep account secured."
                                    tooltip="Contain at least 1 digit, uppercase, lowercase and special characters: @$!%*?&" tooltipOptions={{ event: 'both', position: 'right' }} />
                                {loading ?
                                    <div className="mt-7 flex flex-grow-1 flex-row-reverse align-items-center">
                                        <label className="flex ml-2 font-semibold text-sm text-orange">Registering Profile ...</label>
                                        <ProgressSpinner className="flex justify-content-end" style={{ width: '50px', height: '50px' }} strokeWidth="3" />
                                        <label className="flex flex-grow-1"></label>
                                    </div>
                                    :
                                    <div className="mt-7 flex flex-grow-1">
                                        <Dropdown optionLabel="name" optionValue="code" value={accountType} options={accountTypeList} onChange={accountTypeChange} />
                                        <div className="flex flex-grow-1 flex-row-reverse">
                                            <Button label="Register" className="p-button-primary flex" onClick={registerAccount} disabled={isButtonDisabled} />
                                            <Button label="Login" className="p-button-secondary" onClick={() => setRegister(false)} />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    } else {
        return (
            <div className="global-component">
                <TestLoginPage setAccountType={setAccountType} />
                <Toast ref={toast} />
                <div className="p-4 flex flex-column h-screen">
                    <Card className="col-12 my-auto py-8">
                        <div className="grid">
                            <div className="col-12 text-center">
                                <Link to={PageLink.DEFAULT}>
                                    <img src={require('../../resources/TutorPeer.png')} width={400} height={120} alt="" onClick={() => navigate(getHomeLink())} />
                                </Link>
                            </div>
                            <div className="mx-auto my-5 grid align-items-center gap-4 col-6">
                                <InputText type="text" className="col-12" keyfilter={LOGIN_NAME_REGEX} value={name} onChange={(e) => setName(e.target.value)}
                                    maxLength={LOGIN_NAME_SIZE}
                                    placeholder="Name" />
                                <Password className="col-12 p-0" inputClassName="col-12" value={password} onChange={(e) => setPassword(e.target.value)}
                                    keyfilter={/^[^\#\$\^\*\(\)\-\=\_\+\{\}\|\[\]\;\'\:\"\<\>\?\,\.\/]+$/}
                                    maxLength={PASSWORD_SIZE}
                                    placeholder="Password" feedback={false} />
                                {loading ?
                                    <div className="flex flex-grow-1 flex-row-reverse align-items-center">
                                        <label className="flex ml-2 font-semibold text-sm text-orange">Retrieving Profile ...</label>
                                        <ProgressSpinner className="flex justify-content-end" style={{ width: '50px', height: '50px' }} strokeWidth="3" />
                                        <label className="flex flex-grow-1"></label>
                                    </div>
                                    :
                                    <div className="flex flex-grow-1 flex-row-reverse">
                                        <Button label="Login" className="p-button-primary flex" onClick={loginAccount} disabled={isButtonDisabled} />
                                        <Button label="Register" className="p-button-secondary" onClick={() => setRegister(true)} />
                                    </div>
                                }
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
};
export { LoginDashboard };