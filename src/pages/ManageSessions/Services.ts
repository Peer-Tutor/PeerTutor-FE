import axios from 'axios'
import { Subdomain } from '../../constants/Subdomain';
import { UpcomingActivitiesResponse } from '../../constants/Model';
import { getSessionTokenValues, getUrl } from '../../utils/apiUtils';
import { toast } from '../../utils/toastHooks';


export const getUpcomingActivities = (  setActivities: React.Dispatch<React.SetStateAction<UpcomingActivitiesResponse[] | undefined>>,
                                        setDates: React.Dispatch<React.SetStateAction<string[] | undefined>>,
                                        setValue: React.Dispatch<React.SetStateAction<number>>
                                        ) =>{
    const url = getUrl(Subdomain.TUITION_ORDER_MGR, '/detailedTuitionOrders');
    const { name, sessionToken, profileId } = getSessionTokenValues()
    axios.get<UpcomingActivitiesResponse[]>(url, {
        params: {
            name: name,
            sessionToken: sessionToken
        }
    }).then(res => {
        let response = res.data;
        response = response.filter((element)=>{ return element.status == 1 });
        response.map((element)=>{
            if(element.selectedDates) { element.selectedDates = element.selectedDates.replace("[","").replace("]",""); }
        });
        let array: UpcomingActivitiesResponse[] = [];
        let datesArr: string[] = [];
        const currentDate = new Date().setHours(0,0,0,0);
        response.forEach((element)=>{
            element.selectedDates?.split(',').forEach((date)=>{
                const selectDate = new Date(date).setHours(0,0,0,0);
                if(currentDate <= selectDate){
                    array.push({ studentName: element.studentName,
                                 tutorName: element.tutorName,
                                 subject: element.subject,
                                 selectedDates: date
                               });
                datesArr.push(date);
                }
            });
        });
        array.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            if(b.selectedDates && a.selectedDates){
                return new Date(a.selectedDates).setHours(0,0,0,0) - new Date(b.selectedDates).setHours(0,0,0,0);
            }else{
                return 0;
            }
        });
        datesArr = datesArr.filter(function(item, pos) { return datesArr.indexOf(item) == pos; })
                           .sort(function(a,b){
                                // Turn your strings into dates, and then subtract them
                                // to get a value that is either negative, positive, or zero.
                                if(b && a){
                                    return new Date(a).setHours(0,0,0,0) - new Date(b).setHours(0,0,0,0);
                                }else{
                                    return 0;
                                }
                           });
        setActivities(array);
        setDates(datesArr);
        setValue(array.length);
    }).catch(err => {
        console.log(err)
    });
};