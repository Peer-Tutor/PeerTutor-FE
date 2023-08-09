import { SessionStorage, AccountType, PageLink } from "../constants/Constant";
import { AuthenticationStorage } from "../constants/Model";
import { Subdomain } from "../constants/Subdomain"
import CryptoJS from 'crypto-js';

// const BASE_URL  = 'http://peer-tutor-alb-85147822.ap-southeast-1.elb.amazonaws.com'//process.env
const BASE_URL  = 'http://localhost:'//process.env

const getUrl = (subdomain: Subdomain, endpoint: string) => { return BASE_URL + subdomain + endpoint; }

const getProfileName = () => {
    var session = sessionStorage.getItem(SessionStorage.PROFILE);
    if(session != null){
        const sessionValue: AuthenticationStorage = JSON.parse(session);
        return sessionValue.name ? decryptedData(sessionValue.name) : '';
    }
    return '';
}

const getAccountType = () => {
    var session = sessionStorage.getItem(SessionStorage.PROFILE);
    if(session != null){
        const sessionValue: AuthenticationStorage = JSON.parse(session);
        return sessionValue.accountType ? decryptedData(sessionValue.accountType) : AccountType.STUDENT;
    }
    return '';
}

const getHomeLink = () => {
    if(getAccountType().toString() === AccountType.STUDENT){
        return PageLink.DASHBOARD_STUDENT;
    }else if(getAccountType().toString() === AccountType.TUTOR){
        return PageLink.DASHBOARD_TUTOR;
    }
    return PageLink.DEFAULT;
}

const getSessionToken = () => {
    var session = sessionStorage.getItem(SessionStorage.PROFILE);
    if(session != null){
        const sessionValue: AuthenticationStorage = JSON.parse(session);
        return sessionValue.sessionToken ? decryptedData(sessionValue.sessionToken) : '';
    }
    return '';
}

const decryptedData = (encryptedValue:string) =>{
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedValue, SessionStorage.AES_KEY);
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
}

const getDisplayName = (): string => {
    var session = sessionStorage.getItem(SessionStorage.PROFILE);
    if(session != null){
        const sessionValue: AuthenticationStorage = JSON.parse(session);
        return sessionValue.displayName ? sessionValue.displayName : getProfileName();
    }
    return 'Session Timeout';
}

const setDisplayName = (displayName: string): void => {
    var session = sessionStorage.getItem(SessionStorage.PROFILE);
    if(session != null){
        const sessionValue: AuthenticationStorage = JSON.parse(session);
        sessionValue.displayName = displayName;
        updateSession(sessionValue);
    }
}

const getIntro = (): string => {
    var session = sessionStorage.getItem(SessionStorage.PROFILE);
    if(session != null){
        const sessionValue: AuthenticationStorage = JSON.parse(session);
        return sessionValue.intro ?? '';
    }
    return '';
}

const setIntro = (intro: string ): void => {
    var session = sessionStorage.getItem(SessionStorage.PROFILE);
    if(session != null){
        const sessionValue: AuthenticationStorage = JSON.parse(session);
        sessionValue.intro = intro;
        updateSession(sessionValue);
    }
}

const getSubject = (): string[] => {
    var session = sessionStorage.getItem(SessionStorage.PROFILE);
    if(session != null){
        const sessionValue: AuthenticationStorage = JSON.parse(session);
        return sessionValue.subject ?  sessionValue.subject.split(';') : [];
    }
    return [];
}

const setSubject = (subjects: string[]): void => {
    var session = sessionStorage.getItem(SessionStorage.PROFILE);
    if(session != null){
        const sessionValue: AuthenticationStorage = JSON.parse(session);
        sessionValue.subject = subjects.join(';')
        updateSession(sessionValue);
    }
}

const getProfileId = () => {
    var session = sessionStorage.getItem(SessionStorage.PROFILE);
    if(session != null){
        const sessionValue: AuthenticationStorage = JSON.parse(session);
        return sessionValue.profileId ?? '';
    }
    return '';
}

const setProfileId = (profileId?: number ): void => {
    var session = sessionStorage.getItem(SessionStorage.PROFILE);
    if(session != null){
        const sessionValue: AuthenticationStorage = JSON.parse(session);
        sessionValue.profileId = profileId;
        updateSession(sessionValue);
    }
}


const updateSession = (sessionValue: AuthenticationStorage) : void => { sessionStorage.setItem(SessionStorage.PROFILE, JSON.stringify(sessionValue)); }

const authenticatedSession = () : boolean => {
    var session = sessionStorage.getItem(SessionStorage.PROFILE);
    if(session != null){ return true; }
    return false;
}

export {
    getUrl,
    getProfileName, getAccountType, getHomeLink, getSessionToken,
    getDisplayName, setDisplayName,
    getIntro, setIntro,
    getSubject, setSubject,
    getProfileId, setProfileId,
    authenticatedSession
}

export function saveSessionTokenValue(name:string, sessionToken:string, accountType:string, displayName?: string, intro?: string, subject?: string, profileId?: number) {

    const encryptedName = CryptoJS.AES.encrypt(name, SessionStorage.AES_KEY).toString();
    const encryptedToken = CryptoJS.AES.encrypt(sessionToken, SessionStorage.AES_KEY).toString();
    const encryptedAccount = CryptoJS.AES.encrypt(accountType, SessionStorage.AES_KEY).toString();

    const session = { name: encryptedName, sessionToken: encryptedToken, accountType: encryptedAccount, displayName : displayName ?? '', intro: intro ?? '', subject: subject ?? '', profileId: profileId };
    updateSession(session);
}

