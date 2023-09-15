import React from "react";
import { Card } from 'primereact/card';
import { useNavigate } from "react-router-dom";
import { PageLink, AccountType } from "../../constants/Constant";
import { getAccountType } from '../../utils/apiUtils';

type ActivitiesInfo = {
    studentName?: string;
    tutorName?: string;
    tutorId?: number;
    date?: string;
    rejected?: boolean;
};
const UpcomingActivitiesCard = (props: ActivitiesInfo) => {
    const navigate = useNavigate();
    if(getAccountType().toString() === AccountType.STUDENT){
       return (
            <Card className="flex border-solid cursor-pointer"  onClick={() => { navigate(PageLink.TUITION_BOOKING, { state: { tutorId: props.tutorId } } ) } }>
                <div className="flex flex-row align-items-center gap-2">
                    <div className="flex flex-column align-items-center">
                        <i className="text-5xl text-orange fa-solid fa-chalkboard-user mx-3 mb-2"></i>
                        <label className="flex text-sm text-black font-semibold">{props.tutorName}</label>
                    </div>
                </div>
            </Card>
        );
    }else{
       return (
            <Card className="flex border-solid">
                <div className="flex flex-row align-items-center gap-2">
                    <div className="flex flex-column align-items-center">
                        <i className="text-5xl text-orange fa-solid fa-chalkboard-user mx-3 mb-2"></i>
                        <label className="flex text-sm text-black font-semibold">{props.studentName}</label>
                    </div>
                </div>
            </Card>
        );
    }
};
export { UpcomingActivitiesCard };