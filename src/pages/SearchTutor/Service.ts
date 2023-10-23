import axios from "axios";
import { TUTOR_RESULTS_PAGINATION_PAGE_SIZE } from "../../constants/Constant";
import { Subdomain } from "../../constants/Subdomain";
import { getUrl, getProfileName, getSessionToken, getProfileId } from "../../utils/apiUtils";
import { toast } from "../../utils/toastHooks";
import { TutorRecommendationResponse, TutorResponse } from "./SearchTutor";

const getRecommendationsForMyself = (setRecommendationList: React.Dispatch<React.SetStateAction<TutorRecommendationResponse>>, setTotalRecords: any) => {
    const url = getUrl(Subdomain.TUTOR_MGR, '/tutors');
    axios.get<TutorRecommendationResponse>(url, {
        params: {
            id: getProfileId()
        }
    }).then(res => {
        const shuffled = res.data.slice().sort(()=> 0.5 - Math.random());
        setRecommendationList(shuffled.slice(0,3));
        setTotalRecords(res.data.length);
    }).catch(err => {
    });
}
const getTutorList = (setTutorList: any, currentPage: number) => {
    const url = getUrl(Subdomain.TUTOR_MGR, '/tutors');
    axios.get<TutorResponse[]>(url, {
        params: {
            page: currentPage,
            size: TUTOR_RESULTS_PAGINATION_PAGE_SIZE
        }
    }).then(res => {
        setTutorList(res.data)
    }).catch(err => {
    });
};

const searchTutor = (tutorName: string, setTutorList: React.Dispatch<React.SetStateAction<TutorResponse[]>>) => {
    const url = getUrl(Subdomain.TUTOR_MGR, '/tutors');
    axios.get<TutorResponse[]>(url, {
        params: {
            displayName: tutorName ?? '',
            studentId: getProfileId()
        }
    }).then(res => {
        setTutorList(res.data)
    }).catch(err => {
    });
};

export { searchTutor, getTutorList , getRecommendationsForMyself};