import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from 'primereact/card';
import { Subdomain } from "../../constants/Subdomain";
import { AccountInfo, AccountResponse } from "../../constants/Model";
import { AccountType, PageLink } from "../../constants/Constant";
import { getUrl,
         getProfileName, getAccountType, getSessionToken,
         getIntro, setIntro, getProfileId, authenticatedSession
} from "../../utils/apiUtils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileCard = (props: AccountInfo) => {
    const navigate = useNavigate();
    const [introduction, setIntroduction] = useState('');
    const [subjects, setProfileSubject] = useState('');
    const [certificates, setCertificates] = useState('');

    useEffect(() => {
        if(authenticatedSession()){
            let url = '';
            if(getAccountType().toString() === AccountType.STUDENT){
                url = getUrl(Subdomain.STUDENT_MGR, '/student');
            }else{
                url = getUrl(Subdomain.TUTOR_MGR, '/tutor');
            }
            axios.get<AccountResponse>(url, { params: {
                id: getProfileId()
            } }).then(res => {
                setIntroduction(res.data.introduction ?? getIntro());
                setIntro(res.data.introduction ?? getIntro());
                setProfileSubject(res.data.subjects ?? '');
                setCertificates(res.data.certificates ?? '');
            }).catch(err => {
            });
        }else{
            navigate(PageLink.UNAUTHORISED);
        }
    }, []);

    if(props.tutorView){
        return (
            <Card className="flex flex-1">
                <div className="flex flex-row flex-wrap align-items-center gap-2">
                    <Link to={ PageLink.MANAGE_ACCOUNT }>
                        <div className="flex flex-column align-items-center gap-3">
                            <i className="text-5xl text-orange fa-regular fa-circle-user"></i>
                            <label className="text-base font-bold text-dark-blue">Profile Overview</label>
                        </div>
                    </Link>
                    <div className="flex flex-column align-items-start gap-2 ml-3">
                        <div className="flex flex-column align-items-start gap-2 ml-3">
                            <label className="text-sm text-black font-semibold">Introduction : </label>
                            <label className="text-xs text-black">{ introduction } </label>
                        </div>
                        <div className="flex flex-column align-items-start gap-2 ml-3">
                            <label className="text-sm text-black font-semibold">Subject Area : </label>
                            <label className="text-xs text-black">{ subjects.replaceAll(';', ', ') }</label>
                        </div>
                        <div className="flex flex-column align-items-start gap-2 ml-3">
                            <label className="text-sm text-black font-semibold">Certificates : </label>
                            <label className="text-xs text-black">{ certificates.replaceAll(';', ', ') }</label>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }else{
        return (
            <Card className="flex flex-1">
                <div className="flex flex-row flex-wrap align-items-center gap-2">
                    <Link to={ PageLink.MANAGE_ACCOUNT }>
                        <div className="flex flex-column align-items-center gap-3 py-4">
                            <i className="text-5xl text-orange fa-regular fa-circle-user"></i>
                            <label className="text-base font-bold text-dark-blue">Profile Overview</label>
                        </div>
                    </Link>
                    <div className="flex flex-column align-items-start gap-3 ml-3">
                        <div className="flex flex-column align-items-start gap-3 ml-3">
                            <label className="text-sm text-black font-semibold">Introduction : </label>
                            <label className="text-xs text-black">{ introduction } </label>
                        </div>
                        <div className="flex flex-column align-items-start gap-3 ml-3">
                            <label className="text-sm text-black font-semibold">Subject Area : </label>
                            <label className="text-xs text-black">{ subjects.replaceAll(';', ', ') }</label>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
};
export { ProfileCard };