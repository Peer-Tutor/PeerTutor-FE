import axios from 'axios'
import { Subdomain } from '../../constants/Subdomain';
import { getUrl, getProfileName, getSessionToken, getProfileId } from '../../utils/apiUtils';
import { toast } from '../../utils/toastHooks';
import { CalendarDetail } from '../TutorCalendar/Model';
import { TutorDetail } from './BookingForm';

const successUpdate = (valid: boolean) => {
    if(valid){
        return (
            <div className="flex flex-row align-items-center" style={{flex: '1'}}>
                <div className="flex mx-3">
                    <i className="text-xl text-green fa-solid fa-circle-check"></i>
                </div>
                <div className="flex flex-1 flex-column">
                    <label className="flex text-lg text-green font-bold">Successfully applied</label>
                    <label className="text-xs text-white font-normal">Session booking request has been successfully submitted.</label>
                </div>
            </div>
        );
    }else{
        return (
            <div className="flex flex-row align-items-center" style={{flex: '1'}}>
                <div className="flex mx-3">
                    <i className="text-xl text-orange fa-solid fa-circle-xmark"></i>
                </div>
                <div className="flex flex-1 flex-column">
                    <label className="flex text-lg text-orange font-bold">Unsuccessful Application</label>
                    <label className="text-xs text-white font-normal">Please select at least 1 date for the request.</label>
                </div>
            </div>
        );
    }
};

const submitForm = (tutorId: string, selectedDates: string[]) => {
    const url = getUrl(Subdomain.TUITION_ORDER_MGR, '/tuitionOrder');
    if (selectedDates.length < 1) {
        toast?.current?.show({ severity: 'error', content: successUpdate(false), closable: false, life: 5000 });
    } else {
        axios.post(url, {
            name: getProfileName(),
            selectedDates: selectedDates,
            studentId: getProfileId(),
            tutorId: tutorId,
            status: 0
        }).then(res => {
            toast?.current?.show({
                severity: 'success',
                content: successUpdate(true), closable: false, life: 5000 });
        }).catch(err => {
        })
    }
}

const getATutorAvailableDates = (tutorId: string ,setAvailableDates: React.Dispatch<React.SetStateAction<{
    name: string;
    code: string;
}[]>>) => {
    const url = getUrl(Subdomain.TUTOR_CALENDAR_MGR, '/calendar');
    axios.get<CalendarDetail>(url, {
        params: {
            name: getProfileName(),
            tutorId: tutorId,
        }
    }).then(res => {
        const availableDatesList = res.data.availableDate
        const parsedDates = availableDatesList.map((elt)=> {
            return {
                name: elt,
                code: elt
            }
        })
        setAvailableDates(parsedDates)
    }).catch(err => {
    });
}

const getSelectedTutorDetails = (tutorId: string, setTutorDetails: React.Dispatch<React.SetStateAction<TutorDetail | undefined>>) => {
    const url = getUrl(Subdomain.TUTOR_MGR, '/tutor');

    axios.get<TutorDetail>(url, {
        params: {
            name: getProfileName(),
            id: tutorId,
        }
    }).then(res => {
        // res.data
        setTutorDetails(res.data)
    }).catch(err => {
    });
};


export { submitForm, getSelectedTutorDetails , getATutorAvailableDates};