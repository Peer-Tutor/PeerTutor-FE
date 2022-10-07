import { SessionStorage } from "../constants/Constant";
import { AuthenticationStorage } from "../constants/Model";
import { Subdomain } from "../constants/Subdomain"

const BASE_URL  = 'http://peer-tutor-alb-85147822.ap-southeast-1.elb.amazonaws.com'//process.env

const getSessionTokenValues = (): AuthenticationStorage=>{
    const sessionToken = sessionStorage.getItem(SessionStorage.ACCOUNT);
    if(sessionToken) 
        return JSON.parse(sessionToken);
    else {
        console.log("sessionToken in sessionStorage is empty")
        return {}
    }
}

const getUrl = (subdomain: Subdomain, endpoint: string) => {
    return BASE_URL + subdomain + endpoint
}

export { getUrl , getSessionTokenValues}