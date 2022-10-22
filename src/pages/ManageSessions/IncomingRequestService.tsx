import axios from "axios";
import { TUTOR_RESULTS_PAGINATION_PAGE_SIZE } from "../../constants/Constant";
import { Subdomain } from "../../constants/Subdomain";
import { getSessionTokenValues, getUrl } from "../../utils/apiUtils";
import { toast } from "../../utils/toastHooks";
import { GetRequestResponse, RequestResponse } from './IncomingRequestCard';

const getTuitionOrderList = (setTotalRecords: any, setTuitionOrderList: any) => {
    const { name, sessionToken, profileId } = getSessionTokenValues();
    const url = getUrl(Subdomain.TUITION_ORDER_MGR, '/detailedTuitionOrders');
    axios.get<GetRequestResponse[]>(url, {
        params: {
            name: name ?? '',
            sessionToken: sessionToken ?? ''
        }
    }).then(res => {
        const filteredList = res.data?.filter(record => (record.status == '0'  && record.tutorId == profileId));
        setTuitionOrderList(filteredList);
        setTotalRecords(filteredList.length);
    }).catch(err => {
        console.log('error!', err);
    });
};

const updateTuitionOrderList = (id: any, studentId: any, tutorId: any, selectedDates: string[], status: any, onForceUpdate: any) => {
    const { name, sessionToken, profileId } = getSessionTokenValues();
    const url = getUrl(Subdomain.TUITION_ORDER_MGR, '/tuitionOrder');
    axios.post<RequestResponse[]>(url, {
            name: name ?? '',
            sessionToken: sessionToken ?? '',
            studentId: studentId?? '',
            tutorId: tutorId?? '',
            status:status?? '',
            selectedDates: selectedDates,
            id: id?? ''
    }).then(res => {
        onForceUpdate();
    }).catch(err => {
        onForceUpdate();
        console.log('error!', err);
    });
};

const searchStudent = (setTotalRecords: any, studentName: string, setTuitionOrderList: React.Dispatch<React.SetStateAction<GetRequestResponse[]>>) => {
    const url = getUrl(Subdomain.TUITION_ORDER_MGR, '/detailedTuitionOrders');
    const { name, sessionToken, profileId } = getSessionTokenValues();
    axios.get<GetRequestResponse[]>(url, {
        params: {
            name: name ?? '',
            sessionToken: sessionToken ?? '',
            displayName: studentName ?? ''
        }
    }).then(res => {
        var name = studentName.toLowerCase();
        console.log(studentName);
        const filteredList = res.data?.filter(record => ( record.status == '0' && record.studentName?.toLowerCase().includes(name) && record.tutorId == profileId));
        setTuitionOrderList(filteredList);
        setTotalRecords(filteredList.length);
    }).catch(err => {
        //@ts-ignore
        console.log('error!', err);
    });
};



export { getTuitionOrderList, updateTuitionOrderList, searchStudent };