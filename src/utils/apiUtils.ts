import { Subdomain } from "../constants/Subdomain"

const BASE_URL  = 'http://peer-tutor-alb-85147822.ap-southeast-1.elb.amazonaws.com'//process.env


const getUrl = (subdomain: Subdomain, endpoint: string) => {
    return BASE_URL + subdomain + endpoint
}

export { getUrl }