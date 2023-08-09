import axios from "axios";
import { Subdomain } from "../../constants/Subdomain";
import { getUrl, getProfileName, getSessionToken, getProfileId } from "../../utils/apiUtils";
import { toast } from "../../utils/toastHooks";
import { CalendarDetail } from "./Model";

const getListOfAvailableDatesForCurrentTutor = (setAvailableDates: any) => {
    const url = getUrl(Subdomain.TUTOR_CALENDAR_MGR, '/calendar');

    axios.get<CalendarDetail>(url, {
        params: {
            name: getProfileName(),
            sessionToken: getSessionToken(),
            tutorId: getProfileId(),
        }
    }).then(res => {
        setAvailableDates(res.data.availableDate)
    }).catch(err => {
    });
}

const saveAvailableDates =  (availableDates: string[]) => {
    const url = getUrl(Subdomain.TUTOR_CALENDAR_MGR, '/calendar');
    axios.post(url, {
        name: getProfileName(),
        sessionToken: getSessionToken(),
        availableDates: availableDates,
        tutorId: getProfileId(),
    }).then(res => {
        toast?.current?.show({ severity: 'success',content: 'Success', closable: false, life: 5000 });
    }).catch(err => {
    })
}

export { getListOfAvailableDatesForCurrentTutor ,saveAvailableDates}