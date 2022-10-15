import axios from 'axios'
import { Subdomain } from '../../constants/Subdomain';
import { getSessionTokenValues, getUrl } from '../../utils/apiUtils';
import { toast } from '../../utils/toastHooks';
import { TutorDetail } from './BookingForm';

const submitForm = (tutorId: string, selectedDates: string[]) => {
    const url = getUrl(Subdomain.TUITION_ORDER_MGR, '/tuitionOrders');

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
            // toast?.current?.show({ severity: 'success',content: 'Success', closable: false, life: 5000 });
        }).catch(err => {
            console.log(err)
            // toast?.current?.show({ severity: 'error',content: 'failure', closable: false, life: 5000 });
        })
    }
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


export { submitForm, getSelectedTutorDetails };