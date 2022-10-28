import React, { useEffect, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { Subdomain } from "../../constants/Subdomain";
import { AuthenticationStorage, AccountResponse } from "../../constants/Model";
import { AccountType, PageLink, SessionStorage, AccountTypeList, SubjectList } from "../../constants/Constant";
// import styles from "src/style-sheet/global.module.css";
import { getUrl } from "../../utils/apiUtils";
import axios from "axios";

type BaseLayoutProps = {
    authenticated: boolean;
    forceRefresh: any;
};
export default function NavBar(props: BaseLayoutProps) {
    const [session, setSession] = useState<AuthenticationStorage>({});
    const navigate = useNavigate();

    useEffect(() => {
        const sessionToken = sessionStorage.getItem(SessionStorage.ACCOUNT);
        if(sessionToken != null){
            const token = JSON.parse(sessionToken);
            setSession(token);
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
                if(res.data){
                    token.displayName = res.data.displayName;
                    token.profileId = res.data.id;
                    sessionStorage.setItem(SessionStorage.ACCOUNT, JSON.stringify(token));
                    setSession(token);
                    console.log('setting force refresh')
                    props.forceRefresh()
                }
            }).catch(err => {
                console.log('error!', err);
            });
        }
    }, [navigate])

    const clearSession = () =>{ sessionStorage.removeItem(SessionStorage.ACCOUNT); }

    if(props.authenticated && session != null && (session.accountType == AccountType.TUTOR || session.accountType == AccountType.STUDENT)){
        if(session.accountType == AccountType.TUTOR){
            return (
                <nav className="nav-bar text-2xl">
                    <ul className="flex flex-row align-items-stretch my-0">
                        <Link to={session.homeLink ?? PageLink.DEFAULT }>
                            <li className="flex mr-5">
                                <img src={require('../../resources/TutorPeer.png')} width={200} height={60} alt=""/>
                            </li>
                        </Link>
                        <li className="flex align-items-center mr-5">
                            <Link to={PageLink.MANAGE_ACCOUNT}>
                                <i className="text-xl mr-3 fa-solid fa-id-card"></i>Account Managementt
                            </Link>
                        </li>
                        <li className="flex align-items-center mr-5">
                            <Link to={PageLink.TUITION_CALENDAR}>
                                <i className="text-xl mr-3 fa-solid fa-id-card"></i>Tutor Calendar
                            </Link>
                        </li>
                        <li className="flex align-items-center mr-5">
                            <Link to={PageLink.TUTOR_REVIEW}>
                                <i className="text-xl mr-3 fa-solid fa-id-card"></i>Reviews
                            </Link>
                        </li>

                        <li className="flex flex-grow-1 align-items-center text-right mx-3 text-4xl flex-row-reverse" >|</li>
                        <li className="flex align-items-center mx-2"><i className="text-3xl fa-regular fa-circle-user"></i></li>
                        <li className="flex align-self-center mx-3 flex-column">
                            <label className="text-base font-semibold">{session.displayName ?? session.name}</label>
                            <label className="text-sm font-normal">{session.accountType}</label>
                        </li>
                        <li className="flex align-items-center ml-5 mr-2">
                            <Link to="/" onClick={clearSession}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                            </Link>
                        </li>
                    </ul>
                </nav>
            );
        }else{
            return (
                <nav className="nav-bar text-2xl">
                    <ul className="flex flex-row align-items-stretch my-0">
                        <Link to={session.homeLink ?? PageLink.DEFAULT }>
                            <li className="flex mr-5">
                                <img src={require('../../resources/TutorPeer.png')} width={200} height={60} alt=""/>
                            </li>
                        </Link>

                        <li className="flex align-items-center mr-5">
                            <Link to={PageLink.MANAGE_ACCOUNT}>
                                <i className="text-xl mr-3 fa-solid fa-id-card"></i>Account Management
                            </Link>
                        </li>

                        <li className="flex flex-grow-1 align-items-center text-right mx-3 text-4xl flex-row-reverse" >|</li>
                        <li className="flex align-items-center mx-2"><i className="text-3xl fa-regular fa-circle-user"></i></li>
                        <li className="flex align-self-center mx-3 flex-column">
                            <label className="text-base font-semibold">{session.displayName ?? session.name}</label>
                            <label className="text-sm font-normal">{session.accountType}</label>
                        </li>
                        <li className="flex align-items-center ml-5 mr-2">
                            <Link to="/" onClick={clearSession}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                            </Link>
                        </li>
                    </ul>
                </nav>
            );
        }
    }else{
        return (
            <nav className="nav-bar text-2xl">
                <ul className="flex flex-row align-items-stretch my-0">
                    <Link to={session.homeLink ?? PageLink.DEFAULT} >
                        <li className="flex mr-5 align-items-center flex-grow-1">
                            <img src={require('../../resources/TutorPeer.png')} width={200} height={60} alt=""/>
                        </li>
                    </Link>
                    <li className="flex flex-grow-1 align-items-center text-right mx-3 text-2xl flex-row-reverse" >|</li>
                    <li className="flex ml-5 mr-2 align-items-center">
                        <Link to={PageLink.LOGIN}>
                            LOGIN<i className="ml-3 fa-solid fa-right-to-bracket"></i>
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}