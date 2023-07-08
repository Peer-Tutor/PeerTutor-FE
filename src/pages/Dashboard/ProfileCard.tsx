import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Subdomain } from "../../constants/Subdomain";
import { AccountInfo, AccountResponse } from "../../constants/Model";
import { AccountType, PageLink, SessionStorage } from "../../constants/Constant";
import { getUrl } from "../../utils/apiUtils";
import axios from "axios";

const ProfileCard = (props: AccountInfo) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [introduction, setIntro] = useState('');
    const [subjects, setSubject] = useState('');
    const [certificates, setCertificates] = useState('');

    useEffect(() => {
        const sessionToken = sessionStorage.getItem(SessionStorage.ACCOUNT);
        if(sessionToken != null){
            const token = JSON.parse(sessionToken);
            let url = '';
            if(token.accountType == AccountType.STUDENT){
                url = getUrl(Subdomain.STUDENT_MGR, '/student');
            }else{
                url = getUrl(Subdomain.TUTOR_MGR, '/tutor');
            }
            axios.get<AccountResponse>(url, { params: {
                name: token.name ?? '',
                sessionToken: token.sessionToken ?? '',
                accountName: token.name,
                id: ''
            } }).then(res => {
                setName(res.data.displayName ?? token.name ?? '');
                setIntro(res.data.introduction ?? '');
                setSubject(res.data.subjects ?? '');
                setCertificates(res.data.certificates ?? '');
            }).catch(err => {
                console.log('error!', err);
            });
        };
    }, []);

    if(props.tutorView){
        return (
            <Card className="flex flex-grow-1 px-2 py-0 align-items-center">
                <div className="flex flex-row flex-wrap align-items-center gap-2">
                    <Link to={ PageLink.MANAGE_ACCOUNT }>
                        <div className="flex flex-column align-items-center gap-3">
                            <i className="text-5xl text-orange fa-regular fa-circle-user"></i>
                            <label className="text-base font-bold text-dark-blue">Profile Overview</label>
                        </div>
                    </Link>
                    <div className="flex flex-column align-items-start gap-3">
                        <label className="text-sm text-black font-semibold">Introduction : </label>
                        <label className="text-xs text-black">{ introduction } </label>
                        <label className="text-sm text-black font-semibold">Subject Area : </label>
                        <label className="text-xs text-black">{ subjects.replaceAll(';', ', ') }</label>
                        <label className="text-sm text-black font-semibold">Certificates : </label>
                        <label className="text-xs text-black">{ certificates.replaceAll(';', ', ') }</label>
                    </div>
                </div>
            </Card>
        );
    }else{
        return (
            <Card className="flex flex-1">
                <div className="flex flex-row flex-wrap align-items-center gap-2">
                    <Link to={ PageLink.MANAGE_ACCOUNT }>
                        <div className="flex flex-column align-items-center gap-3">
                            <i className="text-5xl text-orange fa-regular fa-circle-user"></i>
                            <label className="text-base font-bold text-dark-blue">Profile Overview</label>
                        </div>
                    </Link>
                    <div className="flex flex-column align-items-start gap-3 ml-3">
                        <label className="text-sm text-black font-semibold">Introduction : </label>
                        <label className="text-xs text-black">{ introduction } </label>
                        <label className="text-sm text-black font-semibold">Subject Area : </label>
                        <label className="text-xs text-black">{ subjects.replaceAll(';', ', ') }</label>
                        <label className="text-sm text-black font-semibold">Certificates : </label>
                        <label className="text-xs text-black">{ certificates.replaceAll(';', ', ') }</label>
                    </div>
                </div>
            </Card>
        );
    }
};
export { ProfileCard };