import React, { useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { Subdomain } from "../../constants/Subdomain";
import { AccountResponse } from "../../constants/Model";
import { AccountType, PageLink, SessionStorage } from "../../constants/Constant";
import { getUrl, authenticatedSession, getProfileName, getAccountType, getHomeLink, getSessionToken, getDisplayName, setDisplayName, getProfileId, setProfileId  } from "../../utils/apiUtils";
import axios from "axios";

type BaseLayoutProps = {
    authenticated: boolean;
    forceRefresh: any;
};
export default function NavBar(props: BaseLayoutProps) {
    const navigate = useNavigate();

    useEffect(() => {
            if(authenticatedSession()){
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
                        setDisplayName(res.data.displayName??'');
                        setProfileId(res.data.id);
                        props.forceRefresh()
                    }
                }).catch(err => {
                });
            }
    }, [navigate])

    const clearSession = () =>{
        sessionStorage.removeItem(SessionStorage.PROFILE);
        navigate(getHomeLink());
    }

    if(props.authenticated && (getAccountType().toString() === AccountType.TUTOR || getAccountType().toString() === AccountType.STUDENT)){
        if(getAccountType().toString() === AccountType.TUTOR){
            return (
                <div className="nav-bar text-2xl">
                    <div className="flex flex-row flex-wrap align-items-stretch align-items-center my-0">
                        <Link to={getHomeLink()}>
                            <div className="flex mr-5">
                                <img src={require('../../resources/TutorPeer.png')} width={150} height={45} alt=""/>
                            </div>
                        </Link>
                        <div className="flex flex-grow-1  align-items-center mr-5">
                            <Link to={PageLink.TUITION_CALENDAR}>
                                <div className="flex align-items-center">
                                    <i className="text-xl mr-2 fa-solid fa-calendar-days"></i>
                                    <p className="text-xl">Calendar</p>
                                </div>
                            </Link>
                        </div>
                        <Link to={PageLink.MANAGE_ACCOUNT}>
                            <div className=" flex align-items-center cursor-pointer">
                                <i className="text-2xl fa-regular fa-circle-user mx-2"></i>
                                <div className="flex align-self-center mx-3 flex-column">
                                    <p className="text-base font-semibold">{getDisplayName()}</p>
                                    <p className="text-sm font-normal">{getAccountType()}</p>
                                </div>
                            </div>
                        </Link>
                        <div className="flex align-items-center ml-5 mr-2">
                            <i className="fa-solid fa-right-from-bracket" onClick={clearSession}></i>
                        </div>
                    </div>
                </div>
            );
        }else{
            return (
                <div className="nav-bar text-2xl">
                    <div className="flex flex-row flex-wrap align-items-stretch align-item-center my-0">
                        <Link to={getHomeLink()}>
                            <div className="flex mr-5">
                                <img src={require('../../resources/TutorPeer.png')} width={150} height={45} alt=""/>
                            </div>
                        </Link>
                        <div className="flex flex-grow-1 align-items-center mr-5">
                            <Link to={PageLink.SEARCH_TUTOR}>
                                <div className="flex align-items-center">
                                    <i className="text-xl mr-2 fa-solid fa-people-group"></i>
                                    <p className="text-xl">Tutors</p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex flex-grow-1 justify-content-end">
                             <Link to={PageLink.MANAGE_ACCOUNT}>
                                 <div className="flex align-items-center cursor-pointer">
                                    <i className="flex text-2xl fa-regular fa-circle-user mx-2"></i>
                                    <div className="flex align-self-center mx-3 flex-column">
                                        <p className="text-base font-semibold">{getDisplayName()}</p>
                                        <p className="text-sm font-normal">{getAccountType()}</p>
                                    </div>
                                 </div>
                            </Link>
                            <div className="flex ml-5 mr-2">
                                <i className="fa-solid fa-right-from-bracket" onClick={clearSession}></i>
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
                    <Link to={getHomeLink()} >
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