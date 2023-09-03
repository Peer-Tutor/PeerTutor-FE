export const TUTOR_RESULTS_PAGINATION_PAGE_SIZE = 3;

export enum AccountType {
    STUDENT = 'STUDENT',
    TUTOR = 'TUTOR'
};

export enum PageLink {
    DEFAULT = "/",
    LOGIN = "/account",
    DASHBOARD_STUDENT = '/dashboard/student',
    DASHBOARD_TUTOR = '/dashboard/tutor',
    DASHBOARD_LOGIN = '/account',
    MANAGE_SESSION = '/dashboard/manage-session',
    MANAGE_ACCOUNT = '/dashboard/manage-account',
    TUITION_BOOKING = '/dashboard/tuition-booking',
    TUITION_CALENDAR = '/dashboard/tuition-calendar',
    SEARCH_TUTOR = '/dashboard/search-tutor',
    BOOK_TUITION= '/dashboard/tuition-booking',
    TUTOR_REVIEW= '/dashboard/tutor-review',
    ADD_TUTOR_REVIEW= '/dashboard/add-tutor-review',
    UNAUTHORISED = '/unauthorised'
};


export enum SessionStorage {
    AES_KEY = "NDRQO6Vv1D",
    PROFILE = "profile",
    ACCOUNT = "account",
    ACCOUNT_TYPE = "accountType",
    SESSION_TOKEN = "sessionToken",
    NAME = "name"
};

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
};

export enum Certificate {
    OLEVEL = "O-Level",
    ALEVEL = "A-Level",
    DIPLOMA = "Diploma",
    BACHELOR = "Bachelor",
    MASTER = "Master",
    DOCTORATE = "Doctorate"
};

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

export const CertificateList = [
    { name: Certificate.OLEVEL, code: Certificate.OLEVEL },
    { name: Certificate.ALEVEL, code: Certificate.ALEVEL },
    { name: Certificate.DIPLOMA, code: Certificate.DIPLOMA },
    { name: Certificate.BACHELOR, code: Certificate.BACHELOR },
    { name: Certificate.MASTER, code: Certificate.MASTER },
    { name: Certificate.DOCTORATE, code: Certificate.DOCTORATE }
];

export const RequestStatus = {
    PENDING: 0,
    ACCEPTED: 1,
    REJECTED: 2
}