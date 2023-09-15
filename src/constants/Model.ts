import {BookmarkedTutorResponse} from "../pages/BookmarkedTutors/BookmarkedServices";

export type AuthenticationStorage = {
    name?: string;
    displayName?: string;
    sessionToken?: string;
    accountType?: string;
    homeLink?: string;
    intro?: string;
    subject?: string;
    profileId?: number;
};

export type AccountResponse = {
    name?: string;
    sessionToken?: string;
    usertype?: string;
    id?: number;
    tutorView?: boolean;
    displayName?: string;
    introduction?: string;
    subjects?: string;
    certificates?: string;
};

export type AccountInfo = {
    id?: number;
    tutorView?: boolean;
    displayName?: string;
    introduction?: string;
    subjects?: string;
    certificates?: string;
};

export type TutorCardProps = {
    tutorId?: string;
    subject?: string;
    name?: string;
    certs?: string;
    intro?: string;
    getTutorList?: any;
    setTotalRecords?: any;
    setTutorList?: any;
    currentPage?: any;
    bookmarkedTutorList?: BookmarkedTutorResponse[];
    forceUpdate?: any;
};

export type UpcomingActivitiesResponse = {
    id?: number;
    studentId?: number;
    tutorId?: number;
    tutorView?: number;
    selectedDates?: string;
    status?: number;
    studentName?: string;
    tutorName?: string;
    subject?:string;
};

export interface CustomizedState { tutorId: string, tutorName: string };