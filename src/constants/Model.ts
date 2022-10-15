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