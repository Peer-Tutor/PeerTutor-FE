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
    saveSessionTokenValue, getUrl, getProfileName, getAccountType, getHomeLink,
    setDisplayName, setProfileId, setIntro, setSubject
} from "../../utils/apiUtils";
import axios from "axios";
import { useToastHook } from "../../utils/toastHooks";
import { Toast } from "primereact/toast";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { confirmSignUp, signUp } from "../../auth/utils";
import { Auth, Hub } from "aws-amplify";
import { BadRequest, EmailVerificationFail, EmailVerificationSuccess, GenericError } from "../../components/Shared/ToastMsg";
import { CountDowntimer } from "../../components/LoginDashboard/CountdownTimer";

enum AUTH_PAGE_TYPE {
    SIGN_UP = "SIGN_UP",
    SIGN_IN = "SIGN_IN",
    CONFIRM_EMAIL = "CONFIRM_EMAIL"
}

const LoginDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [toast] = useToastHook();

    const [pageType, setPageType] = useState<AUTH_PAGE_TYPE>(AUTH_PAGE_TYPE.SIGN_IN)

    const [disableResendVerifyCode, setDisableResendVerifyCode] = useState(false)
    const [email, setEmail] = useState('')
    const [accountType, setAccountType] = useState(AccountType.STUDENT);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('')
    const [loading, setLoading] = useState(false);

    const isButtonDisabled = (name === '' || password === '' || !(PASSWORD_REGEX.test(password))); // Disable button when inputValue is empty

    const accountTypeList = AccountTypeList;
    const accountTypeChange = (e: { value: any }) => {
        setAccountType(e.value);
    };

    useEffect(() => {
        const hubListenerCancelToken = Hub.listen('auth', ({ payload }) => {
            const { event } = payload;
            if ((event === 'autoSignIn') && payload?.data !== undefined) {
                const user = payload.data;
                const username = user.username
                const userType = user.attributes["custom:role"]
                saveSessionTokenValue(username, userType ?? '');
                updateProfile(true)
                setLoading(false);
            }
        });

        return () => hubListenerCancelToken();

    }, [])

    const loginAccount = async () => {
        setLoading(true);
        await Auth.signIn(name, password)
            .then((data) => {
                const userType = data.signInUserSession.idToken.payload["custom:role"];
                const userName = data.signInUserSession.idToken.payload["cognito:username"];
                saveSessionTokenValue(userName, userType ?? '');
                updateProfile(false)
            }).catch((err) => {
                setLoading(false)
                toast?.current?.show({
                    severity: 'error',
                    content: <BadRequest msg={err.message} />, closable: true, life: 5000
                });
            });
    };

    const registerAccount = async () => {
        setLoading(true);

        const requestParam = {
            username: name,
            password: password,
            attributes: {
                email: email,
                'custom:role': accountType
            },
            autoSignIn: {
                enabled: true,
            }
        }
        Auth.signUp(requestParam).then((data) => {
            setPageType(AUTH_PAGE_TYPE.CONFIRM_EMAIL);
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            toast?.current?.show({
                severity: 'error',
                content: <BadRequest msg={err.message} />, closable: true, life: 5000
            });
        });
    };


    const resendCode = async () => {
        try {
            setDisableResendVerifyCode(true)
            Auth.resendSignUp(name)
            // 
        }
        catch (err) {
            setDisableResendVerifyCode(false)
            setLoading(false)
            toast?.current?.show({
                severity: 'error',
                // @ts-ignore
                content: <BadRequest msg={err?.message} />, closable: true, life: 5000
            });
        }
    }
    const verifyEmail = async () => {
        try {
            setLoading(true);
            const res = await confirmSignUp({ username: name, code: verificationCode })
            if (res) {
                setLoading(res);
                toast?.current?.show({ severity: 'success', content: <EmailVerificationSuccess />, closable: true, life: 5000 });
            } else {
                setLoading(false);
                toast?.current?.show({ severity: 'error', content: <EmailVerificationFail />, closable: true, life: 5000 });
            }
        } catch (err) {
            setLoading(false)

            toast?.current?.show({
                severity: 'error',
                // @ts-ignore
                content: <BadRequest msg={err?.message} />, closable: true, life: 5000
            });
        }
    }

    const updateProfile = (newAccount: boolean) => {
        let profileURL = '';
        let profile = {}
        if (getAccountType().toString() === AccountType.STUDENT) {
            profileURL = getUrl(Subdomain.STUDENT_MGR, '/student');
            profile = {
                displayName: getProfileName(),
                introduction: '', subjects: ''
            };
        } else {
            profileURL = getUrl(Subdomain.TUTOR_MGR, '/tutor');
            profile = {
                displayName: getProfileName(),
                introduction: '', subjects: '', certificates: ''
            };
        }

        if (newAccount) {
            axios.post(profileURL, profile).then(res => {
                setDisplayName(res.data.displayName);
                setProfileId(res.data.id);
                setLoading(false);

                navigate(PageLink.MANAGE_ACCOUNT);
            }).catch(err => {
                setLoading(false)
                toast?.current?.show({
                    severity: 'error',
                    content: <GenericError />, closable: true, life: 5000
                });
            }
            );
        } else {
            axios.get<AccountResponse>(profileURL, { params: profile }).then(res => {
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
                setLoading(false)
                toast?.current?.show({
                    severity: 'error',
                    content: <GenericError />, closable: true, life: 5000
                });
            });
        }
    };

    if (pageType === AUTH_PAGE_TYPE.SIGN_UP) {
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
                                <InputText type="text" className="col-12" keyfilter="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    tooltip="Please provide a valid email to receive OTP" tooltipOptions={{ event: 'both', position: 'right' }} />
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
                                            <Button label="Login" className="p-button-secondary" onClick={() => setPageType(AUTH_PAGE_TYPE.SIGN_IN)} />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    } else if (pageType === AUTH_PAGE_TYPE.SIGN_IN) {
        return (
            <div className="global-component">
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
                                        <Button label="Register" className="p-button-secondary" onClick={() => {
                                            setPageType(AUTH_PAGE_TYPE.SIGN_UP)
                                        }}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    } else if (pageType === AUTH_PAGE_TYPE.CONFIRM_EMAIL) {
        return (
            <div className="global-component">
                <Toast ref={toast} />
                <div className="p-4 flex flex-column h-screen">
                    <Card className="col-12 my-auto py-8">
                        <div className="col-12 text-center">
                            <Link to={PageLink.DEFAULT}>
                                <img src={require('../../resources/TutorPeer.png')} width={400} height={120} alt="" onClick={() => navigate(getHomeLink())} />
                            </Link>
                        </div>
                        <div className="flex flex-column col-12">
                            <label className="flex flex-row font-bold text-base text-orange">Verify email</label>
                            <div className="flex flex-row col-12 p-0 align-items-center">
                                <InputText type="text" className="col-10 flex" value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)} placeholder="Verification Code" />
                                <Button label="Verify" className="p-button-primary" onClick={verifyEmail} disabled={loading} />
                            </div>
                            <div className="flex flex-row col-12 p-0 align-items-center">
                            </div>
                            <CountDowntimer showDisableButton={{
                                onReset: resendCode
                            }} countDownFromInSeconds={30} />
                        </div>
                    </Card>
                </div>
            </div>
        )
    } else {
        return (

            <>
                <p> Oops something went wrong </p>
            </>
        )
    }
};
export { LoginDashboard };