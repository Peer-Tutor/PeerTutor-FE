import axios from "axios";
import { TUTOR_RESULTS_PAGINATION_PAGE_SIZE } from "../../constants/Constant";
import { Subdomain } from "../../constants/Subdomain";
import { getSessionTokenValues, getUrl } from "../../utils/apiUtils";
import { toast } from "../../utils/toastHooks";
import { TutorResponse } from "./SearchTutor";

const getTutorList = (setTotalRecords: any, setTutorList: any, currentPage: number) => {
    const { name, sessionToken, profileId } = getSessionTokenValues()
    const url = getUrl(Subdomain.TUTOR_MGR, '/tutors');
    axios.get<TutorResponse[]>(url, {
        params: {
            name: name ?? '',
            sessionToken: sessionToken ?? '',
            page: currentPage,
            size: TUTOR_RESULTS_PAGINATION_PAGE_SIZE
        }
    }).then(res => {
        // console.log(res.headers['x-total-count'])
        const totalRecords = res.headers["x-total-count"]
        setTotalRecords(totalRecords)
        setTutorList(res.data)
    }).catch(err => {
        console.log('error!', err);
    });
};

const searchTutor = (tutorName: string, setTutorList: React.Dispatch<React.SetStateAction<TutorResponse[]>>) => {
    const url = getUrl(Subdomain.TUTOR_MGR, '/tutors');
    const { name, sessionToken, profileId } = getSessionTokenValues()
    // console.log('tutorName = ', tutorName)
    axios.get<TutorResponse[]>(url, {
        params: {
            name: name ?? '',
            sessionToken: sessionToken ?? '',
            displayName: tutorName ?? ''
        }
    }).then(res => {
        // console.log(res)
        setTutorList(res.data)

        // toast?.current?.show({
        //     severity: 'success',
        //     content: 'Successfully made order', closable: false, life: 5000
        // });
    }).catch(err => {
        //@ts-ignore
        console.log('error!', err);
    });
};

export { searchTutor, getTutorList };