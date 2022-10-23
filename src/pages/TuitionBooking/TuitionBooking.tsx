import axios from "axios"
import React, { useEffect, useState } from "react";
import { Subdomain } from "../../constants/Subdomain";
import { AccountResponse } from "../../constants/Model";
import { AccountType, SessionStorage } from "../../constants/Constant";
import { getUrl } from "../../utils/apiUtils"
import { useLocation, } from "react-router-dom";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { RequestListCard } from './RequestListCard';
import { getATutorAvailableDates, submitForm } from "./Service";
import { convertDateToYYYYMMDD } from "../../utils/DateUtils";
import { BookingForm } from "./BookingForm";
import { getListOfAvailableDatesForCurrentTutor } from "../TutorCalendar/Service";

interface CustomizedState {
    tutorId: string
};

const TuitionBooking = () => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [isTutorView, setTutorView] = useState('');
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [selectedDateDetails, setSelectedDateDetails] = useState<{ name: string, code: string }[]>([]);
    const location = useLocation();
    const data = location.state as CustomizedState; // Type Casting, then you can get the params passed via router

    const handleSubmit = () => {
        if (data?.tutorId) {
            // const parsedSelectedDates: string[] = selectedDates.map(e=> e.name)
            // console.log('selectedDates', selectedDates )
            submitForm(data.tutorId, selectedDates)
        } else {
            console.log('tutorId is undefined!')
        }
    };


    useEffect(() => {
        getATutorAvailableDates(data?.tutorId, setSelectedDateDetails)
        
        
    }, []);


    return (
        <div>

            <div>
                <BookingForm
                    handleSubmit={handleSubmit}
                    selectedDates={selectedDates}
                    selectedDateDetails={selectedDateDetails}
                    tutorId={data?.tutorId}
                    setSelectedDates={setSelectedDates} />

            </div>
            {/* <div>
                <RequestListCard tutorView={"true"} />
            </div> */}
        </div>
    );
};


export { TuitionBooking };