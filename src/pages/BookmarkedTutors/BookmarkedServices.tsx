import axios from "axios";
import { Subdomain } from "../../constants/Subdomain";
import { getUrl, getProfileName, getSessionToken, getProfileId } from "../../utils/apiUtils";
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
    const url = getUrl(Subdomain.BOOKMARK_MGR, '/bookmark');
    axios.get<BookmarkedTutorResponse[]>(url, {
        params: {
            name: getProfileName(),
            studentId: getProfileId(),
        }
    }).then(res => {
        setBookmarkedTutorList(res.data)
    }).catch(err => {
    });
};

// for tutor card to add bookmark
const addBookmarkTutorCard = (tutorID: string, onForceUpdate: any) =>{
    const url = getUrl(Subdomain.BOOKMARK_MGR, '/bookmark');
    axios.post<BookmarkResponse>(url, {
            name: getProfileName(),
            id: getProfileId(),
            studentID: getProfileId()?.toString(),
            tutorID: tutorID?.toString()
    }).then(res => {
        onForceUpdate();
    }).catch(err => {
    });
}

const deleteBookmarkTutorCard = (tutorId: any, onForceUpdate: any)=> {
    const url = getUrl(Subdomain.BOOKMARK_MGR, '/bookmark');
    axios.delete<BookmarkResponse>(url, {
        params:{
            name: getProfileName(),
            studentId: getProfileId(),
            tutorId: tutorId?? ''
        }
    }).then(res => {
        onForceUpdate();
    }).catch(err => {
    });
}

const getBookmarkedTutorOfStudent = (setBookmarkedTutorList: React.Dispatch<React.SetStateAction<BookmarkedTutorResponse[]>>) => {
    const url = getUrl(Subdomain.BOOKMARK_MGR, '/bookmark');
    axios.get<BookmarkedTutorResponse[]>(url, {
        params: {
            name: getProfileName(),
            studentId: getProfileId()?.toString()
        }
    }).then(res => {
        setBookmarkedTutorList(res.data)
    }).catch(err => {
    });
};

const addBookmark = (id: string, tutorId: string, tutorName: string, setBookmarkTutor: React.Dispatch<React.SetStateAction<BookmarkResponse[]>>) => {
    const url = getUrl(Subdomain.BOOKMARK_MGR, '/bookmark');
    axios.post<BookmarkResponse[]>(url, {
            name: getProfileName(),
            studentID: getProfileId(),
            tutorID: tutorId?? '',
            id: id?? ''
    }).then(res => {
    }).catch(err => {
    });
}

const deleteBookmark = (tutorId: any, onForceUpdate: any)=> {
    const url = getUrl(Subdomain.BOOKMARK_MGR, '/bookmark');
    axios.delete<BookmarkResponse>(url, {
        params:{
            name: getProfileName(),
            studentId: getProfileId(),
            tutorId: tutorId?? ''
        }
    }).then(res => {
        onForceUpdate();
    }).catch(err => {
    });
}

export { addBookmarkTutorCard, getBookmarkedTutorOfStudent, getBookmarkedTutorOfStudentTutorCard, addBookmark, deleteBookmark, deleteBookmarkTutorCard }