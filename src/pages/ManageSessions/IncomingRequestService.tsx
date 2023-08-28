import axios from "axios";
import { Subdomain } from "../../constants/Subdomain";
import { getUrl, getProfileName, getSessionToken, getProfileId } from "../../utils/apiUtils";
import { GetRequestResponse, RequestResponse } from './IncomingRequestCard';

const getTuitionOrderList = (setTotalRecords: any, setTuitionOrderList: any) => {
    const url = getUrl(Subdomain.TUITION_ORDER_MGR, '/detailedTuitionOrders');
    axios.get<GetRequestResponse[]>(url, {
        params: {
            name: getProfileName(),
            sessionToken: getSessionToken()
        }
    }).then(res => {
        const filteredList = res.data?.filter(record => (record.status === 0 && record.tutorId === getProfileId()));
        setTuitionOrderList(filteredList);
        setTotalRecords(filteredList.length);
    }).catch(err => {
    });
};

const updateTuitionOrderList = (id: any, studentId: any, tutorId: any, selectedDates: string[], status: any, onForceUpdate: any) => {
    const url = getUrl(Subdomain.TUITION_ORDER_MGR, '/tuitionOrder');
    axios.post<RequestResponse[]>(url, {
            name: getProfileName() ?? '',
            sessionToken: getSessionToken() ?? '',
            studentId: studentId?? '',
            tutorId: tutorId?? '',
            status:status?? '',
            selectedDates: selectedDates,
            id: id?? ''
    }).then(res => {
        onForceUpdate();
    }).catch(err => {
        onForceUpdate();
    });
};

const searchStudent = (setTotalRecords: any, studentName: string, setTuitionOrderList: React.Dispatch<React.SetStateAction<GetRequestResponse[]>>) => {
    const url = getUrl(Subdomain.TUITION_ORDER_MGR, '/tuitionOrder');
    axios.get<GetRequestResponse[]>(url, {
        params: {
            name: getProfileName() ?? '',
            sessionToken: getSessionToken() ?? '',
            displayName: studentName ?? ''
        }
    }).then(res => {
        var name = studentName.toLowerCase();
        const filteredList = res.data?.filter(record => ( record.status === 0 && record.studentName?.toLowerCase().includes(name) && record.tutorId === getProfileId()));
        setTuitionOrderList(filteredList);
        setTotalRecords(filteredList.length);
    }).catch(err => {
    });
};

export { getTuitionOrderList, updateTuitionOrderList, searchStudent };