import axios from "axios";
import { Subdomain } from "../../constants/Subdomain";
import { getSessionTokenValues, getUrl } from "../../utils/apiUtils";
import { toast } from "../../utils/toastHooks";

export type BookmarkResponse = {
    tutorId: string,
    studentId: string,
    name: string,
}

const addBookmark = (tutorName: string, setBookmarkTutor: React.Dispatch<React.SetStateAction<BookmarkResponse[]>>) => {
    const url = getUrl(Subdomain.BOOKMARK_MGR, '/bookmark');
    const { name, sessionToken, profileId } = getSessionTokenValues()
    axios.get<BookmarkResponse[]>(url, {
        params: {
            name: name ?? '',
            sessionToken: sessionToken ?? '',
            displayName: tutorName ?? ''
        }
    }).then(res => {
    console.log('here!');
        setBookmarkTutor(res.data)
    })
    .catch(err => {
        //@ts-ignore
        console.log('error!', err);
    });
}

export { addBookmark }