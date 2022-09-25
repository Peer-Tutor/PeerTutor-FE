import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthenticationStorage } from "../../constants/Model";
import { AccountType, PageLink, SessionStorage } from "../../constants/Constant";
import styles from "src/style-sheet/global.module.css";

type BaseLayoutProps = {
    authenticated: boolean;
};
export default function NavBar(props: BaseLayoutProps) {
    const [session, setSession] = useState<AuthenticationStorage>({});

    useEffect(() => {
        const sessionToken = sessionStorage.getItem(SessionStorage.ACCOUNT);
        if(sessionToken != null){ setSession(JSON.parse(sessionToken)); }
    }, [])

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
                            <Link to={PageLink.MANAGE_SESSION}>
                                <i className="text-xl mr-3 fa-regular fa-calendar-check"></i>Manage Sessions
                            </Link>
                        </li>
                        <li className="flex align-items-center mr-5">
                            <Link to={PageLink.MANAGE_ACCOUNT}>
                                <i className="text-xl mr-3 fa-solid fa-id-card"></i>Account Management
                            </Link>
                        </li>
                        <li className="flex flex-grow-1 align-items-center text-right mx-3 text-4xl flex-row-reverse" >|</li>
                        <li className="flex align-items-center mx-2"><i className="text-3xl fa-regular fa-circle-user"></i></li>
                        <li className="flex align-self-center mx-3 flex-column">
                            <label className="text-base font-semibold">{session.name}</label>
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
                            <Link to={PageLink.TUITION_BOOKING}>
                                <i className="text-xl mr-3 fa-solid fa-id-card"></i>Tuition Booking
                            </Link>
                        </li>
                        <li className="flex align-items-center mr-5">
                            <Link to={PageLink.MANAGE_ACCOUNT}>
                                <i className="text-xl mr-3 fa-solid fa-id-card"></i>Account Management
                            </Link>
                        </li>
                        <li className="flex flex-grow-1 align-items-center text-right mx-3 text-4xl flex-row-reverse" >|</li>
                        <li className="flex align-items-center mx-2"><i className="text-3xl fa-regular fa-circle-user"></i></li>
                        <li className="flex align-self-center mx-3 flex-column">
                            <label className="text-base font-semibold">{session.name}</label>
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