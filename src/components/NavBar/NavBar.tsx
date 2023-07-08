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
                <div className="nav-bar text-2xl">
                    <div className="flex flex-row flex-wrap align-items-stretch align-items-center my-0">
                        <Link to={session.homeLink ?? PageLink.DEFAULT }>
                            <div className="flex mr-5">
                                <img src={require('../../resources/TutorPeer.png')} width={150} height={45} alt=""/>
                            </div>
                        </Link>
                        <div className="flex align-items-center mr-5">
                            <Link to={PageLink.TUITION_CALENDAR}>
                                <div className="flex align-items-center">
                                    <i className="text-xl mr-2 fa-solid fa-calendar-days"></i>
                                    <p className="text-xl">Calendar</p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex flex-grow-1 align-items-center mr-5">
                            <Link to={PageLink.TUTOR_REVIEW}>
                                <div className="flex align-items-center">
                                    <i className="text-xl mr-2 fa-solid fa-id-card"></i>
                                    <p className="text-xl">Reviews</p>
                                </div>
                            </Link>
                        </div>

                        <Link to={PageLink.MANAGE_ACCOUNT}>
                            <div className=" flex align-items-center cursor-pointer">
                                <i className="text-2xl fa-regular fa-circle-user mx-2"></i>
                                <div className="flex align-self-center mx-3 flex-column">
                                    <p className="text-base font-semibold">{session.displayName ?? session.name}</p>
                                    <p className="text-sm font-normal">{session.accountType}</p>
                                </div>
                            </div>
                        </Link>
                        <div className="flex align-items-center ml-5 mr-2">
                            <Link to="/" onClick={clearSession}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }else{
            return (
                <div className="nav-bar text-2xl">
                    <div className="flex flex-row flex-wrap align-items-stretch align-item-center my-0">
                        <Link to={session.homeLink ?? PageLink.DEFAULT }>
                            <div className="flex mr-5">
                                <img src={require('../../resources/TutorPeer.png')} width={150} height={45} alt=""/>
                            </div>
                        </Link>
                        <div className="flex flex-grow-1 justify-content-end">
                             <Link to={PageLink.MANAGE_ACCOUNT}>
                                 <div className="flex align-items-center cursor-pointer">
                                    <i className="flex text-2xl fa-regular fa-circle-user mx-2"></i>
                                    <div className="flex align-self-center mx-3 flex-column">
                                        <p className="text-base font-semibold">{session.displayName ?? session.name}</p>
                                        <p className="text-sm font-normal">{session.accountType}</p>
                                    </div>
                                 </div>
                            </Link>
                            <div className="flex ml-5 mr-2">
                                <Link to="/" onClick={clearSession}>
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }else{
        return (
            <div className="nav-bar text-xl">
                <div className="flex flex-row align-items-stretch my-0">
                    <Link to={session.homeLink ?? PageLink.DEFAULT} >
                        <div className="flex mr-5 align-items-center flex-grow-1">
                            <img src={require('../../resources/TutorPeer.png')} width={150} height={45} alt=""/>
                        </div>
                    </Link>

                    <div className="flex flex-grow-1 ml-5 mr-2 align-items-center justify-content-end">
                        <Link to={PageLink.LOGIN}>
                            LOGIN<i className="ml-3 fa-solid fa-right-to-bracket"></i>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}