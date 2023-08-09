import axios from 'axios'
import { Subdomain } from '../../constants/Subdomain';
import { UpcomingActivitiesResponse } from '../../constants/Model';
import { getUrl, getProfileName, getSessionToken, getAccountType, getProfileId } from '../../utils/apiUtils';
import { toast } from '../../utils/toastHooks';
import {AccountType} from '../../constants/Constant'

export const getUpcomingActivities = (setActivities: React.Dispatch<React.SetStateAction<UpcomingActivitiesResponse[] | undefined>>,
    setDates: React.Dispatch<React.SetStateAction<string[] | undefined>>,
    setValue: React.Dispatch<React.SetStateAction<number>>
) => {
    const url = getUrl(Subdomain.TUITION_ORDER_MGR, '/detailedTuitionOrders');
    axios.get<UpcomingActivitiesResponse[]>(url, {
        params: {
            name: getProfileName(),
            sessionToken: getSessionToken()
        }
    }).then(res => {
        let response = res.data;
        response = response.filter((element) => {
            if(getAccountType().toString() === AccountType.STUDENT){
                return element.status == 1 && element.studentId === getProfileId()
            } else if (getAccountType().toString() === AccountType.TUTOR){
                return element.status == 1 && element.tutorId === getProfileId()
            }else {
            }
         });
        response.map((element) => {
            if (element.selectedDates) { element.selectedDates = element.selectedDates.replace("[", "").replace("]", ""); }
        });
        let array: UpcomingActivitiesResponse[] = [];
        let datesArr: string[] = [];
        const currentDate = new Date().setHours(0, 0, 0, 0);
        response.forEach((element) => {
            element.selectedDates?.split(',').forEach((date) => {
                const selectDate = new Date(date.trim()).setHours(0, 0, 0, 0);
                if (currentDate <= selectDate) {
                    array.push({
                        studentName: element.studentName,
                        tutorName: element.tutorName,
                        selectedDates: date.trim(),
                        status: element.status
                    });
                    datesArr.push(date.trim());
                }
            });
        });
        array.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            if (b.selectedDates && a.selectedDates) {
                return new Date(a.selectedDates).setHours(0, 0, 0, 0) - new Date(b.selectedDates).setHours(0, 0, 0, 0);
            } else {
                return 0;
            }
        });
        datesArr = datesArr.filter(function (item, pos) { return datesArr.indexOf(item) == pos; })
            .sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                if (b && a) {
                    return new Date(a).setHours(0, 0, 0, 0) - new Date(b).setHours(0, 0, 0, 0);
                } else {
                    return 0;
                }
            });
        setActivities(array);
        setDates(datesArr);
        setValue(array.length);
    }).catch(err => {
    });
};

export const getPendingRequest = (setActivities: React.Dispatch<React.SetStateAction<UpcomingActivitiesResponse[] | undefined>>,
    setDates: React.Dispatch<React.SetStateAction<string[] | undefined>>,
    setValue: React.Dispatch<React.SetStateAction<number>>
) => {
    const url = getUrl(Subdomain.TUITION_ORDER_MGR, '/detailedTuitionOrders');
    axios.get<UpcomingActivitiesResponse[]>(url, {
        params: {
            name: getProfileName(),
            sessionToken: getSessionToken()
        }
    }).then(res => {
        let response = res.data;
        response = response.filter((element) => { return element.status == 0 && element.studentId === getProfileId() });
        response.map((element) => {
            if (element.selectedDates) { element.selectedDates = element.selectedDates.replace("[", "").replace("]", ""); }
        });
        let array: UpcomingActivitiesResponse[] = [];
        let datesArr: string[] = [];
        const currentDate = new Date().setHours(0, 0, 0, 0);
        response.forEach((element) => {
            element.selectedDates?.split(',').forEach((date) => {
                const selectDate = new Date(date.trim()).setHours(0, 0, 0, 0);
                if (currentDate <= selectDate) {
                    array.push({
                        studentName: element.studentName,
                        tutorName: element.tutorName,
                        selectedDates: date.trim(),
                        status: element.status
                    });
                    datesArr.push(date.trim());
                }
            });
        });
        array.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            if (b.selectedDates && a.selectedDates) {
                return new Date(a.selectedDates).setHours(0, 0, 0, 0) - new Date(b.selectedDates).setHours(0, 0, 0, 0);
            } else {
                return 0;
            }
        });
        datesArr = datesArr.filter(function (item, pos) { return datesArr.indexOf(item) == pos; })
            .sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                if (b && a) {
                    return new Date(a).setHours(0, 0, 0, 0) - new Date(b).setHours(0, 0, 0, 0);
                } else {
                    return 0;
                }
            });
        setActivities(array);
        setDates(datesArr);
        setValue(array.length);
    }).catch(err => {
    });
};