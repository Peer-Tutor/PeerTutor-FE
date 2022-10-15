import axios from "axios";
import { Subdomain } from "../../constants/Subdomain";
import { getSessionTokenValues, getUrl } from "../../utils/apiUtils";
import { toast } from "../../utils/toastHooks";
import { CalendarDetail } from "./Model";

const getListOfAvailableDatesForCurrentTutor = (setAvailableDates: any) => {
    const url = getUrl(Subdomain.TUTOR_CALENDAR_MGR, '/calendar');
    const { name, sessionToken, profileId } = getSessionTokenValues()
    console.log("called")

    axios.get<CalendarDetail>(url, {
        params: {
            name: name,
            sessionToken: sessionToken,
            tutorId: profileId,
        }
    }).then(res => {
        // res.data
        console.log(res.data)
        setAvailableDates(res.data.availableDate)
    }).catch(err => {
        console.log(err)
    });
}

const saveAvailableDates =  (availableDates: string[]) => {
    const url = getUrl(Subdomain.TUTOR_CALENDAR_MGR, '/calendar');
    const { name, sessionToken, profileId } = getSessionTokenValues()
    console.log('profileId'+profileId)
    axios.post(url, {
        name: name,
        sessionToken: sessionToken,
        availableDates: availableDates,
        tutorId: profileId,
    }).then(res => {
        // console.log('success')
        toast?.current?.show({ severity: 'success',content: 'Success', closable: true, life: 5000 });
    }).catch(err => {
        console.log(err)
        // toast?.current?.show({ severity: 'error',content: 'failure', closable: false, life: 5000 });
    })
}

export { getListOfAvailableDatesForCurrentTutor ,saveAvailableDates}