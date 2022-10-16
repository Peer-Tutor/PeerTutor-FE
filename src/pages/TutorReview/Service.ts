import axios from "axios";
import { TUTOR_RESULTS_PAGINATION_PAGE_SIZE } from "../../constants/Constant";
import { Subdomain } from "../../constants/Subdomain";
import { getSessionTokenValues, getUrl } from "../../utils/apiUtils";
import { toast } from "../../utils/toastHooks";
import { TutorResponse } from "./TutorReview";


const getListOfReviewByTutor = (setTutorList: any) => {
    const url = getUrl(Subdomain.REVIEW_MGR, '/reviews');
    const { name, sessionToken, profileId } = getSessionTokenValues()
    axios.get<TutorResponse>(url, {
        params: {
            name: name,
            sessionToken: sessionToken,
            tutorId: profileId,
        }
    }).then(res => {
        // res.data
        console.log(res.data)
        setTutorList(res.data)
    }).catch(err => {
        console.log(err)
    });
}

export { getListOfReviewByTutor };