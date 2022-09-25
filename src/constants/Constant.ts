export enum AccountType {
    STUDENT = 'STUDENT',
    TUTOR = 'TUTOR'
}

export enum PageLink {
    DEFAULT = "/",
    LOGIN = "/account",
    DASHBOARD_STUDENT = '/dashboard/student',
    DASHBOARD_TUTOR = '/dashboard/tutor',
    DASHBOARD_LOGIN = '/account',
    MANAGE_SESSION = '/dashboard/manage-session',
    MANAGE_ACCOUNT = '/dashboard/manage-account',
    TUITION_BOOKING = '/dashboard/tuition-booking',
}

export enum SessionStorage {
    ACCOUNT = "account"
}

export enum Subject {
    BIOLOGY = "Biology",
    CHEMISTRY = "Chemistry",
    CHINESE = "Chinese",
    ENGLISH = "English",
    GEOGRAPHY = "Geography",
    HISTORY = "History",
    MALAY = "Malay",
    MATH = "Math",
    PHYSICS = "Physics",
    TAMIL = "Tamil"
}

export const AccountTypeList = [ { name: 'Student', code: AccountType.STUDENT }, { name: 'Tutor', code: AccountType.TUTOR } ];
export const SubjectList = [
    { name: Subject.BIOLOGY, code: Subject.BIOLOGY },
    { name: Subject.CHEMISTRY, code: Subject.CHEMISTRY },
    { name: Subject.CHINESE, code: Subject.CHINESE },
    { name: Subject.ENGLISH, code: Subject.ENGLISH },
    { name: Subject.GEOGRAPHY, code: Subject.GEOGRAPHY },
    { name: Subject.HISTORY, code: Subject.HISTORY },
    { name: Subject.MALAY, code: Subject.MALAY },
    { name: Subject.MATH, code: Subject.MATH },
    { name: Subject.PHYSICS, code: Subject.PHYSICS },
    { name: Subject.TAMIL, code: Subject.TAMIL }
];