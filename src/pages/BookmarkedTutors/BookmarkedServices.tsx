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

const getBookmarkedTutorOfStudentTutorCard = (setBookmarkedTutorList: React.Dispatch<React.SetStateAction<BookmarkedTutorResponse[]>>) => {
    const { name, sessionToken, profileId } = getSessionTokenValues();
    const url = getUrl(Subdomain.BOOKMARK_MGR, '/bookmark');
    axios.get<BookmarkedTutorResponse[]>(url, {
        params: {
            name: name ?? '',
            sessionToken: sessionToken ?? '',
            studentId: profileId?.toString(),
        }
    }).then(res => {
        setBookmarkedTutorList(res.data)
    }).catch(err => {
        console.log('error!', err);
    });
};

// for tutor card to add bookmark
const addBookmarkTutorCard = (tutorID: string, onForceUpdate: any) =>{
    const url = getUrl(Subdomain.BOOKMARK_MGR, '/bookmark');
    const { name, sessionToken, profileId } = getSessionTokenValues();

    axios.post<BookmarkResponse>(url, {
            name: name ?? '',
            sessionToken: sessionToken ?? '',
            studentID: profileId?.toString(),
            tutorID: tutorID?.toString()
    }).then(res => {
        onForceUpdate();
    }).catch(err => {
        console.log('error!', err);
    });
}

const deleteBookmarkTutorCard = (tutorId: any, onForceUpdate: any)=> {
    const url = getUrl(Subdomain.BOOKMARK_MGR, '/bookmark');
    const { name, sessionToken, profileId } = getSessionTokenValues();
    axios.delete<BookmarkResponse>(url, {
        params:{
            name: name ?? '',
            sessionToken: sessionToken ?? '',
            studentId: profileId?? '',
            tutorId: tutorId?? ''
        }
    }).then(res => {
        onForceUpdate();
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
        setBookmarkedTutorList(res.data)
    }).catch(err => {
        console.log('error!', err);
    });
};

const addBookmark = (id: string, tutorId: string, tutorName: string, setBookmarkTutor: React.Dispatch<React.SetStateAction<BookmarkResponse[]>>) => {
    const url = getUrl(Subdomain.BOOKMARK_MGR, '/bookmark');
    const { name, sessionToken, profileId } = getSessionTokenValues();
    axios.post<BookmarkResponse[]>(url, {
            name: name ?? '',
            sessionToken: sessionToken ?? '',
            studentID: profileId?? '',
            tutorID: tutorId?? '',
            id: id?? ''
    }).then(res => {
    }).catch(err => {
        console.log('error!', err);
    });
}

const deleteBookmark = (tutorId: any, onForceUpdate: any)=> {
    const url = getUrl(Subdomain.BOOKMARK_MGR, '/bookmark');
    const { name, sessionToken, profileId } = getSessionTokenValues();
    axios.delete<BookmarkResponse>(url, {
        params:{
            name: name ?? '',
            sessionToken: sessionToken ?? '',
            studentId: profileId?? '',
            tutorId: tutorId?? ''
        }
    }).then(res => {
        console.log('delete successful');
        onForceUpdate();
    }).catch(err => {
        console.log('error!', err);
    });
}

export { addBookmarkTutorCard, getBookmarkedTutorOfStudent, getBookmarkedTutorOfStudentTutorCard, addBookmark, deleteBookmark, deleteBookmarkTutorCard }