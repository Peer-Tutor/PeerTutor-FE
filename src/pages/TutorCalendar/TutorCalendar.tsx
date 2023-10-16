import React, { useEffect, useState } from "react";
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Panel } from "primereact/panel";
import { HeaderTemplate } from "../../components/Shared/HeaderTemplate";
import { Chip } from "primereact/chip";
import { convertDateToYYYYMMDD } from "../../utils/DateUtils";
import { Dialog } from "primereact/dialog";
import { Divider } from 'primereact/divider';
import { getListOfAvailableDatesForCurrentTutor } from "./Service";
import { getUrl, getProfileName, getSessionToken, getProfileId, authorisedRoute } from "../../utils/apiUtils";
import { Subdomain } from "../../constants/Subdomain";
import axios from "axios";
import { useToastHook } from "../../utils/toastHooks";
import { Toast } from "primereact/toast";
import { PageLink } from '../../constants/Constant';
import { useNavigate } from "react-router-dom";

const TutorCalendar = () => {
    const [date, setDate] = useState<any>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [originalDates, setOriginalDates] = useState<string[]>([]);
    const [toast] = useToastHook();
    const navigate = useNavigate();
    const isButtonDisabled = ((availableDates.length === originalDates.length) && availableDates.every(element=> originalDates.includes(element)) );

    const handleSelectDate = () => {
        const newDate = convertDateToYYYYMMDD(date)
        const newSelectedDates = []
        if (!availableDates?.includes(newDate)) {
            newSelectedDates.push(...availableDates);
            newSelectedDates.push(newDate);
            setAvailableDates(newSelectedDates);
        }
        setShowDatePicker(false);
    }
    const removeSelectedDate = (date: string) => {
        const newSelectedDates = availableDates.filter((elt) => elt !== date);
        setAvailableDates(newSelectedDates);
    }

    const successUpdate = () => {
        return (
            <div className="flex flex-row align-items-center" style={{flex: '1'}}>
                <div className="flex mx-3">
                    <i className="text-xl text-green fa-solid fa-circle-check"></i>
                </div>
                <div className="flex flex-1 flex-column">
                    <label className="flex text-lg text-green font-bold">Successfully updated</label>
                    <label className="text-xs text-white font-normal">Calendar dates updated successfully.</label>
                </div>
            </div>
        );
    };

    const saveAvailableDates =  (availableDates: string[]) => {
        const url = getUrl(Subdomain.TUTOR_CALENDAR_MGR, '/calendar');
        axios.post(url, {
//             name: getProfileName(),
            availableDates: availableDates,
            tutorId: getProfileId(),
        }).then(res => {
            toast?.current?.show({ severity: 'success', content: successUpdate(), closable: false, life: 5000 });
            setOriginalDates(availableDates);
        }).catch(err => {
        })
    }
    const handleSubmit = () => {
        saveAvailableDates(availableDates)
    }
    
    const handleDateChange = (e: { value: any }) => {
        const newDate = e.value;
        setDate(newDate);
        setShowDatePicker(true);
    }

    const renderBookingFormFooter = () => {
        return (
            <div className="justify-content-end flex flex-1 flex-row align-items-center">
                <Button
                    className="p-button-tertiary"
                    label="Cancel"
                    icon="pi pi-times"
                    onClick={() => setShowDatePicker(false)}
                />
                <Button
                    className="p-button-primary"
                    label="Add Date"
                    icon="pi pi-check"
                    onClick={handleSelectDate}
                    autoFocus
                />
            </div>
        );
    };

    useEffect(()=>{
        if(!authorisedRoute(PageLink.TUITION_CALENDAR)){ navigate(PageLink.UNAUTHORISED); }
        else{ getListOfAvailableDatesForCurrentTutor(setAvailableDates);
        setOriginalDates(availableDates);
        }
    }, [])

    return (
        <>
            <Toast ref={toast} />
            <Panel header={HeaderTemplate({ title: 'Tutor Calendar' , hideBadge :true})} className="flex flex-column">
                < div className="flex flex-column mx-auto pb-4">
                    <div className="flex flex-row flex-1 gap-2">
                        <div className="flex flex-column flex-1 gap-2">
                            <label className="text-orange text-lg font-semibold">Available Dates</label>
                            <label className="text-black text-sm font-normal">Below shows a list of available dates you have indicated for students to book tutor session with you.</label>
                        </div>
                        <div className="flex flex-row gap-2">
                            <Button icon='fa-regular fa-calendar'
                                tooltip="Add New Available Date" tooltipOptions={{position: 'top'}}
                                onClick={() => { setShowDatePicker(true) }}></Button>
                            <Button label="Update" className="p-button-primary" onClick={handleSubmit} disabled={isButtonDisabled} />
                        </div>
                    </div>
                    <Divider />
                    <div className="flex gap-1 justify-content-center flex-wrap">
                        {availableDates?.length > 0 ? (availableDates.map((elt) => {
                            return (
                                <Chip removable={true} label={elt} defaultValue={elt} key={elt} onRemove={() => { removeSelectedDate(elt) }} />
                            )
                        })) : <p className="text-sm text-center text-black font-semibold">No dates selected.</p>}
                    </div>
                </div>

                <Dialog
                    header='New Available Date'
                    style={{ width: '40rem' }}
                    visible={showDatePicker}
                    onHide={() => { setShowDatePicker(false) }}
                    modal={true}
                    resizable={false}
                    draggable={false}
                    closable={false}
                    footer={renderBookingFormFooter()}
                    maximizable={false}>
                    <Calendar className="w-full" minDate={new Date()} inline value={date} onChange={handleDateChange}></Calendar>
                </Dialog>
            </Panel>
        </>
    )
};
export { TutorCalendar };