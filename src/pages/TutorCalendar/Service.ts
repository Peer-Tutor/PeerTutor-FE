import axios from "axios";
import { Subdomain } from "../../constants/Subdomain";
import { getUrl, getProfileName, getSessionToken, getProfileId } from "../../utils/apiUtils";
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

export { getListOfAvailableDatesForCurrentTutor }