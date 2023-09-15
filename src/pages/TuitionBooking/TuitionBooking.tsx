import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getATutorAvailableDates, submitForm } from "./Service";
import { BookingForm } from "./BookingForm";
import { CustomizedState } from "../../constants/Model";
import { useNavigate } from "react-router-dom";
import { authorisedRoute } from '../../utils/apiUtils';
import { PageLink } from '../../constants/Constant';

const TuitionBooking = () => {
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [selectedDateDetails, setSelectedDateDetails] = useState<{ name: string, code: string }[]>([]);
    const location = useLocation();
    const data = location.state as CustomizedState; // Type Casting, then you can get the params passed via router
    const navigate = useNavigate();
    const handleSubmit = () => {
        if (data?.tutorId) { submitForm(data.tutorId, selectedDates) }
        setSelectedDates([]);
    };

    useEffect(() => {
     if(!authorisedRoute(PageLink.TUITION_BOOKING)){ navigate(PageLink.UNAUTHORISED); }
     else{ getATutorAvailableDates(data?.tutorId, setSelectedDateDetails); }
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
        </div>
    );
};

export { TuitionBooking };