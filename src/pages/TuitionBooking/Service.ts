import axios from 'axios'
import { Subdomain } from '../../constants/Subdomain';
import { getSessionTokenValues, getUrl } from '../../utils/apiUtils';
import { toast } from '../../utils/toastHooks';
import { CalendarDetail } from '../TutorCalendar/Model';
import { TutorDetail } from './BookingForm';

const submitForm = (tutorId: string, selectedDates: string[]) => {
    const url = getUrl(Subdomain.TUITION_ORDER_MGR, '/tuitionOrder');
    console.log('heeeell', selectedDates)
    const { name, sessionToken, profileId } = getSessionTokenValues()
    if (selectedDates.length < 1) {
        toast?.current?.show({ severity: 'error', content: 'You have not selected any dates!', closable: true, life: 5000 });
    } else {
        axios.post(url, {
            name: name,
            sessionToken: sessionToken,
            selectedDates: selectedDates,
            // startTime: startDateTime,
            // endTime: endDateTime,
            studentId: profileId,
            tutorId: tutorId,
            status: 0
        }).then(res => {
            console.log('success')
            toast?.current?.show({ severity: 'success',content: 'Success', closable: true, life: 5000 });
        }).catch(err => {
            console.log(err)
            // toast?.current?.show({ severity: 'error',content: 'failure', closable: false, life: 5000 });
        })
    }
}

const getATutorAvailableDates = (tutorId: string ,setAvailableDates: React.Dispatch<React.SetStateAction<{
    name: string;
    code: string;
}[]>>) => {
    const url = getUrl(Subdomain.TUTOR_CALENDAR_MGR, '/calendar');
    const { name, sessionToken, profileId } = getSessionTokenValues()
    console.log("called")

    axios.get<CalendarDetail>(url, {
        params: {
            name: name,
            sessionToken: sessionToken,
            tutorId: tutorId,
        }
    }).then(res => {
        // res.data
        console.log(res.data)
        const availableDatesList = res.data.availableDate
        const parsedDates = availableDatesList.map((elt)=> {
            return {
                name: elt,
                code: elt
            }
        })
        console.log('llolol' , parsedDates)
        setAvailableDates(parsedDates)
    }).catch(err => {
        console.log(err)
    });
}

const getSelectedTutorDetails = (tutorId: string, setTutorDetails: React.Dispatch<React.SetStateAction<TutorDetail | undefined>>) => {
    const url = getUrl(Subdomain.TUTOR_MGR, '/tutor');

    const { name, sessionToken, profileId } = getSessionTokenValues()
    axios.get<TutorDetail>(url, {
        params: {
            name: name,
            sessionToken: sessionToken,
            id: tutorId,
        }
    }).then(res => {
        // res.data
        setTutorDetails(res.data)
    }).catch(err => {
        console.log(err)
    });
};


export { submitForm, getSelectedTutorDetails , getATutorAvailableDates};