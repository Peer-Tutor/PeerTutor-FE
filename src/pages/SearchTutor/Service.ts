import axios from "axios";
import { TUTOR_RESULTS_PAGINATION_PAGE_SIZE } from "../../constants/Constant";
import { Subdomain } from "../../constants/Subdomain";
import { getUrl, getProfileName, getSessionToken, getProfileId } from "../../utils/apiUtils";
import { toast } from "../../utils/toastHooks";
import { TutorRecommendationResponse, TutorResponse } from "./SearchTutor";

const getRecommendationsForMyself = (setRecommendationList: React.Dispatch<React.SetStateAction<TutorRecommendationResponse>>) => {
    const url = getUrl(Subdomain.TUTOR_MGR, '/tutors');
    axios.get<TutorRecommendationResponse>(url, {
        params: {
            name: getProfileName(),
            sessionToken: getSessionToken(),
            id: getProfileId()
        }
    }).then(res => {
        setRecommendationList(res.data)
    }).catch(err => {
    });
}
const getTutorList = (setTotalRecords: any, setTutorList: any, currentPage: number) => {
    const url = getUrl(Subdomain.TUTOR_MGR, '/tutors');
    axios.get<TutorResponse[]>(url, {
        params: {
            name: getProfileName(),
            sessionToken: getSessionToken(),
            page: currentPage,
            size: TUTOR_RESULTS_PAGINATION_PAGE_SIZE
        }
    }).then(res => {
        const totalRecords = res.headers["x-total-count"]
        setTotalRecords(totalRecords)
        setTutorList(res.data)
    }).catch(err => {
    });
};

const searchTutor = (tutorName: string, setTutorList: React.Dispatch<React.SetStateAction<TutorResponse[]>>) => {
    const url = getUrl(Subdomain.TUTOR_MGR, '/tutors');
    axios.get<TutorResponse[]>(url, {
        params: {
            name: getProfileName(),
            sessionToken: getSessionToken(),
            displayName: tutorName ?? ''
        }
    }).then(res => {
        setTutorList(res.data)
    }).catch(err => {
    });
};

export { searchTutor, getTutorList , getRecommendationsForMyself};