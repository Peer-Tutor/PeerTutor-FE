import React, { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';

type AccountInfo = {
    tutorView?: boolean;
    displayName?: string;
    introduction?: string;
    subjects?: string;
    certificates?: string;
}

const ProfileCard = (props: AccountInfo) => {
    const introduction = props.introduction ?? "Teaching In Primary School";
    const subjects = props.subjects ?? "English;Math;PE";
    const certificates = props.certificates ?? "O-level;A-level";
    if(props.tutorView){
        return (
            <Card className="flex flex-grow-1 px-4 py-0 align-items-center">
                <div className="flex align-items-center">
                    <div className="flex flex-column align-items-center gap-3">
                        <i className="text-6xl text-orange fa-regular fa-circle-user"></i>
                        <label className="text-base font-bold text-dark-blue">Profile Overview</label>
                    </div>
                    <Divider layout="vertical" className="align-self-stretch"/>
                    <div className="flex flex-column align-items-start gap-3">
                        <label className="text-sm text-black">
                            <span className="font-semibold">Introduction : </span>
                            { introduction }
                        </label>
                        <label className="text-sm text-black">
                            <span className="font-semibold">Subject Area : </span>
                            { subjects.replaceAll(';', ', ') }
                        </label>
                        <label className="text-sm text-black">
                            <span className="font-semibold">Certificates : </span>
                            { certificates.replaceAll(';', ', ') }
                        </label>
                    </div>
                </div>
            </Card>
        );
    }else{
        return (
            <Card className="flex flex-grow-1 px-4 py-0 align-items-center">
                <div className="flex align-items-center">
                    <div className="flex flex-column align-items-center gap-3">
                        <i className="text-6xl text-orange fa-regular fa-circle-user"></i>
                        <label className="text-base font-bold text-dark-blue">Profile Overview</label>
                    </div>
                    <Divider layout="vertical" className="align-self-stretch"/>
                    <div className="flex flex-column align-items-start gap-3">
                        <label className="text-sm text-black">
                            <span className="font-semibold">Introduction : </span>
                            { introduction }
                        </label>
                        <label className="text-sm text-black">
                            <span className="font-semibold">Subject Area : </span>
                            { subjects.replaceAll(';', ', ') }
                        </label>
                        <label className="text-sm text-black">
                            <span className="font-semibold">Certificates : </span>
                            { certificates.replaceAll(';', ', ') }
                        </label>
                    </div>
                </div>
            </Card>
        );
    }
}
export { ProfileCard }