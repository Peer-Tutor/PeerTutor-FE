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

    if(props.authenticated){
        return (
            <nav className="nav-bar text-2xl">
                <ul className="flex flex-row align-items-center my-0">
                    <Link to={session.homeLink ?? PageLink.DASHBOARD_LOGIN }>
                        <li className="flex mr-5">
                            <img src={require('../../resources/TutorPeer.png')} width={200} height={60} alt=""/>
                        </li>
                    </Link>
                    <li className="flex align-items-center mr-5">
                        <i className="text-xl mr-3 fa-regular fa-calendar-check"></i>
                        <Link to={PageLink.MANAGE_SESSION}>Manage Sessions</Link>
                    </li>
                    <li className="flex align-items-center mr-5">
                        <i className="text-xl mr-3 fa-solid fa-id-card"></i>
                        <Link to={PageLink.MANAGE_ACCOUNT}>Account Management</Link>
                    </li>
                   <li className="flex align-items-center mr-5">
                        <i className="text-xl mr-3 fa-solid fa-id-card"></i>
                        <Link to={PageLink.TUITION_BOOKING}>Tuition Booking</Link>
                    </li>
                    <li className="flex flex-grow-1 text-right mx-3 text-2xl flex-row-reverse" >|</li>
                    <li className="flex mx-2"><i className="text-3xl fa-regular fa-circle-user"></i></li>
                    <li className="flex mx-3 flex-column">
                        <label className="text-base font-semibold">{session.name}</label>
                        <label className="text-sm font-normal">{session.accountType}</label>
                    </li>
                    <li className="flex ml-5 mr-2">
                        <Link to="/account" onClick={clearSession}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }else{
        return (
            <nav className="nav-bar text-2xl">
                <ul className="flex flex-row align-items-center my-0">
                    <Link to={session.homeLink ?? PageLink.DASHBOARD_LOGIN} >
                        <li className="flex mr-5">
                            <img src={require('../../resources/TutorPeer.png')} width={200} height={60} alt=""/>
                        </li>
                    </Link>
                </ul>
            </nav>
        );
    }
}