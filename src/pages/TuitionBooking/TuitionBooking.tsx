import axios from "axios"
import React, { useEffect, useState } from "react";
import { Subdomain } from "../../constants/Subdomain";
import {  AccountResponse } from "../../constants/Model";
import { AccountType,  SessionStorage } from "../../constants/Constant";
import { getUrl } from "../../utils/apiUtils"
import { useLocation,} from "react-router-dom";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { RequestListCard } from './RequestListCard';
import {  submitForm } from "./Service";
import { convertDateToYYYYMMDD } from "../../utils/DateUtils";
import { BookingForm } from "./BookingForm";

interface CustomizedState {
    tutorId: string
};

const TuitionBooking = () => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [isTutorView, setTutorView] = useState('');
    const [selectedDates, setSelectedDates] = useState<string[]>([]);

    const location = useLocation();
    const data = location.state as CustomizedState; // Type Casting, then you can get the params passed via router

    const handleSubmit = () => {
        if (data?.tutorId) {
            submitForm(data.tutorId, selectedDates)
        } else {
            console.log('tutorId is undefined!')
        }
    };

    const handleSelectDate = () => {

        const newDate = convertDateToYYYYMMDD(date)
        const newSelectedDates = []
        if (!selectedDates.includes(newDate)) {
            newSelectedDates.push(...selectedDates);
            newSelectedDates.push(newDate);
            setSelectedDates(newSelectedDates);
        }
        setShowDatePicker(false);
    }
    const removeSelectedDate = (date: string) => {
        const newSelectedDates = selectedDates.filter((elt) => elt !== date);
        setSelectedDates(newSelectedDates);
    }

    const handleDateChange = (e: { value: any }) => {
        const newDate = e.value;
        console.log(newDate);
        setDate(newDate);
        setShowDatePicker(true);
    }

    const renderBookingFormFooter = () => {
        return (
            <div>
                <Button
                    label="Cancel"
                    icon="pi pi-times"
                    onClick={() => setShowDatePicker(false)}
                    className="p-button-text"
                />
                <Button
                    label="Select Date"
                    icon="pi pi-check"
                    onClick={handleSelectDate}
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
                // setSubject(res.data.subjects ?? '');
            }).catch(err => {
                console.log('error!', err);
            });
        };
    }, []);


    return (
        <div>
            <div className="global-card">
                <label className="text-3xl text-orange">Booking Details</label>
            </div>
            <div>
                <BookingForm
                    handleSubmit={handleSubmit}
                    removeSelectedDate={removeSelectedDate}
                    setBookingFormVisibility={setShowDatePicker}
                    selectedDates={selectedDates}
                    tutorId={data?.tutorId} />
                <Dialog
                    header='Booking Form'
                    visible={showDatePicker}
                    onHide={() => { setShowDatePicker(false) }}
                    modal={true}
                    footer={renderBookingFormFooter()}
                    maximizable={true}>
                    <Calendar minDate={new Date()} id="TuitionCalendar" inline value={date} onChange={handleDateChange}></Calendar>
                </Dialog>
            </div>
            <div>
                <RequestListCard tutorView={isTutorView} />
            </div>
        </div>
    );
};


export { TuitionBooking };