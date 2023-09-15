import axios from "axios";
import { TUTOR_RESULTS_PAGINATION_PAGE_SIZE } from "../../constants/Constant";
import { Subdomain } from "../../constants/Subdomain";
import { getUrl, getProfileName, getSessionToken, getProfileId } from "../../utils/apiUtils";
import { toast } from "../../utils/toastHooks";
import { TutorResponse } from "./TutorReview";


const getListOfReviewByTutor = (setTutorList: any) => {
    const url = getUrl(Subdomain.REVIEW_MGR, '/reviews');
    axios.get<TutorResponse>(url, {
        params: {
            name: getProfileName(),
            sessionToken: getSessionToken(),
            tutorId: getProfileId(),
        }
    }).then(res => {
        setTutorList(res.data)
    }).catch(err => {
    });
}

export { getListOfReviewByTutor };