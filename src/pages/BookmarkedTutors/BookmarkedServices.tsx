import axios from "axios";
import { Subdomain } from "../../constants/Subdomain";
import { getSessionTokenValues, getUrl } from "../../utils/apiUtils";
import { toast } from "../../utils/toastHooks";
import { TutorResponse } from "../../pages/SearchTutor/SearchTutor";

export type BookmarkResponse = {
    id?: any,
    tutorID?: string,
    studentID?: string,
    name?: string
}

export type BookmarkedTutorResponse = {
    id?: any,
    tutorID?: string,
    studentID?: string,
    tutor?: TutorResponse,
}

// for tutor card to add bookmark
const addBookmarkTutorCard = (tutorID: string) =>{
    const url = getUrl(Subdomain.BOOKMARK_MGR, '/bookmark');
    const { name, sessionToken, profileId } = getSessionTokenValues();

    axios.post<BookmarkResponse>(url, {
            name: name ?? '',
            sessionToken: sessionToken ?? '',
            studentID: profileId?.toString(),
            tutorID: tutorID?.toString()
    }).then(res => {
    }).catch(err => {
        console.log('error!', err);
    });
}

const getBookmarkedTutorOfStudent = (setBookmarkedTutorList: React.Dispatch<React.SetStateAction<BookmarkedTutorResponse[]>>) => {
    const { name, sessionToken, profileId } = getSessionTokenValues();
    const url = getUrl(Subdomain.BOOKMARK_MGR, '/bookmark');
    axios.get<BookmarkedTutorResponse[]>(url, {
        params: {
            name: name ?? '',
            sessionToken: sessionToken ?? '',
            studentId: profileId?.toString(),
        }
    }).then(res => {
        console.log(name, sessionToken, profileId);
        setBookmarkedTutorList(res.data)
    }).catch(err => {
        console.log('error!', err);
    });
};

const addBookmark = (id: string, tutorId: string, tutorName: string, setBookmarkTutor: React.Dispatch<React.SetStateAction<BookmarkResponse[]>>, onForceUpdate: any) => {
    const url = getUrl(Subdomain.BOOKMARK_MGR, '/bookmark');
    const { name, sessionToken, profileId } = getSessionTokenValues();
    axios.post<BookmarkResponse[]>(url, {
            name: name ?? '',
            sessionToken: sessionToken ?? '',
            studentID: profileId?? '',
            tutorID: tutorId?? '',
            id: id?? ''
    }).then(res => {
        onForceUpdate();
    }).catch(err => {
        onForceUpdate();
        console.log('error!', err);
    });
}

const deleteBookmark = (tutorId: any)=> {
    const url = getUrl(Subdomain.BOOKMARK_MGR, '/bookmark');
    const { name, sessionToken, profileId } = getSessionTokenValues();
    axios.delete<BookmarkResponse>(url, {
        data:{
            name: name ?? '',
            sessionToken: sessionToken ?? '',
            studentID: profileId?? '',
            tutorID: tutorId?? ''
        }
    }).then(res => {
        console.log('delete successful');
    }).catch(err => {
        console.log('error!', err);
    });
}



export { addBookmarkTutorCard, getBookmarkedTutorOfStudent, addBookmark, deleteBookmark }