import axios from "axios"
import React, { useEffect, useState, useRef } from "react";
import { Subdomain } from "../../constants/Subdomain";
import { AuthenticationStorage, AccountResponse } from "../../constants/Model";
import { AccountType, PageLink, SessionStorage, AccountTypeList } from "../../constants/Constant";
import { getUrl } from "../../utils/apiUtils"
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from './PrimeReactSample.module.css'; //'./PrimeReactSample.module.css'
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { RequestListCard } from './RequestListCard';
import { Card } from 'primereact/card';
interface CustomizedState {
    tutorId: string
}

const TuitionBooking = () => {
    const [state, setState] = useState() // todo type script
    const [selectedCity1, setSelectedCity1] = useState<any>(null);
    const [valueBookingForm, setValueBookingForm] = useState('');
    const [visibilityBookingForm, setBookingFormVisibility] = useState(false);
    const [date, setDate] = useState(new Date());
    const [selectedTime, setTime] = useState<any>(null);
    const [selectedSubject, setSubject] = useState<any>(null);
    const [isTutorView, setTutorView] = useState('');


    const location = useLocation();
    const data = location.state as CustomizedState; // Type Casting, then you can get the params passed via router
    const { tutorId } = data;

    useEffect(() => {
        // alert('tutorId = ' + tutorId)
        console.log('tutorId',tutorId)
    }, [])
    function closeBookingForm() {
        setBookingFormVisibility(false);
    }

    const showBookingForm = (e: { value: any }) => {
        const newDate = e.value;
        setDate(newDate);
        console.log(newDate);
        setBookingFormVisibility(true);

    }

    const renderBookingFormFooter = () => {
        return (
            <div>
                <Button
                    label="Cancel"
                    icon="pi pi-times"
                    onClick={() => setBookingFormVisibility(false)}
                    className="p-button-text"
                />
                <Button
                    label="Book"
                    icon="pi pi-check"
                    onClick={() => setBookingFormVisibility(false)}
                    autoFocus
                />
            </div>
        );
    };

    useEffect(() => {
        const sessionToken = sessionStorage.getItem(SessionStorage.ACCOUNT);
        // temporary, can remove
        setTutorView("true");

        if (sessionToken != null) {
            const token = JSON.parse(sessionToken);
            let url = '';
            if (token.accountType == AccountType.STUDENT) {
                url = getUrl(Subdomain.STUDENT_MGR, '/student');
                setTutorView("false");
            } else {
                url = getUrl(Subdomain.TUTOR_MGR, '/tutor');
                setTutorView("true");
            }

            axios.get<AccountResponse>(url, {
                params: {
                    name: token.name ?? '',
                    sessionToken: token.sessionToken ?? '',
                    accountName: token.name,
                    id: ''
                }
            }).then(res => {
                setSubject(res.data.subjects ?? '');
            }).catch(err => {
                console.log('error!', err);
            });
        };
    }, []);
    // console.log('page one rendered')

    const onCityChange = (e: { value: any }) => {
        setSelectedCity1(e.value);
    }

    const onTimeChange = (e: { value: any }) => {
        setTime(e.value);
    }

    const onSubjectChange = (e: { value: any }) => {
        setSubject(e.value);
    }

    const time = [
        { name: '1PM', code: '1PM' },
        { name: '2PM', code: '2PM' },
        { name: '3PM', code: '3PM' },
        { name: '4PM', code: '4PM' },
        { name: '5PM', code: '5PM' }
    ];

    const subjects = [
        { name: 'English', code: 'English' },
        { name: 'History', code: 'History' },
        { name: 'Math', code: 'Math' },
        { name: 'Science', code: 'Science' },
        { name: 'Social Studies', code: 'Social Studies' }
    ];
    return (
        <div>
            <div className="global-card">
                <label className="text-3xl text-orange">Tuition Booking</label>
            </div>
            <div>
                <Calendar id="TuitionCalendar" inline value={date} onChange={showBookingForm}></Calendar>
            </div>
            <div>
                <Dialog
                    header='Booking Form'
                    visible={visibilityBookingForm}
                    onHide={closeBookingForm}
                    modal={true}
                    footer={renderBookingFormFooter()}
                    maximizable={true}>
                    <div>
                        <table>
                            <colgroup>
                                <col width="50%" text-align="left" />
                                <col width="50%" />
                            </colgroup>
                            <tr>
                                <td><label className="flex my-2 text-lg">Date</label></td>
                                <td><label id="Date" className="flex my-2 text-lg">{date?.toLocaleDateString()}</label></td>
                            </tr>
                            <tr>
                                <td><label className="flex my-2 text-lg">Time</label></td>
                                <Dropdown optionLabel="name" value={selectedTime} options={time}
                                    onChange={onTimeChange} />
                            </tr>
                            <tr>
                                <td><label className="flex my-2 text-lg">Subject</label></td>
                                <Dropdown optionLabel="name" value={selectedSubject} options={subjects}
                                    onChange={onSubjectChange} />
                            </tr>
                        </table>
                    </div>
                </Dialog>
            </div><br />
            <div>
                <RequestListCard tutorView={isTutorView} />
            </div>
        </div>
    )
}
export { TuitionBooking }