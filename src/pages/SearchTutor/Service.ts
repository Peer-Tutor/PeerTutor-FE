import axios from "axios";
import { Subdomain } from "../../constants/Subdomain";
import { getSessionTokenValues, getUrl } from "../../utils/apiUtils";
import { toast } from "../../utils/toastHooks";
import { TutorOrdersResponse } from "./SearchTutor";


const searchTutor = (tutorName: string, setTutorList: React.Dispatch<React.SetStateAction<TutorOrdersResponse[]>>) => {
    const url = getUrl(Subdomain.TUTOR_MGR, '/tutors');
    const { name, sessionToken, profileId } = getSessionTokenValues()
    // console.log('tutorName = ', tutorName)
    axios.get<TutorOrdersResponse[]>(url, {
        params: {
            name: name ?? '',
            sessionToken: sessionToken ?? '',
            displayName: tutorName ?? ''
        }
    }).then(res => {
        // console.log(res)
        setTutorList(res.data)
    })
        .catch(err => {
            //@ts-ignore
            console.log('error!', err);
        });
}

export { searchTutor }