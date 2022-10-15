import React, { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Panel } from "primereact/panel";
import { HeaderTemplate } from "../../components/Shared/HeaderTemplate";
import { Chip } from "primereact/chip";
import { convertDateToYYYYMMDD } from "../../utils/DateUtils";
import { Dialog } from "primereact/dialog";
import { getListOfAvailableDatesForCurrentTutor, saveAvailableDates } from "./Service";

const TutorCalendar = () => {
    const [date, setDate] = useState<any>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [availableDates, setAvailableDates] = useState<string[]>([]);

    const handleSelectDate = () => {
        const newDate = convertDateToYYYYMMDD(date)
        const newSelectedDates = []
        if (!availableDates.includes(newDate)) {
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

    const handleSubmit = () => {
        saveAvailableDates(availableDates)
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

    useEffect(()=>{ 
        getListOfAvailableDatesForCurrentTutor(setAvailableDates)
    }, [])

    // console.log('page two rendered')
    return (
        <>
            <Panel header={HeaderTemplate({ title: 'Tutor Calendar' , hideBadge :true})} className="flex flex-column">
                < div className="flex flex-column mx-auto gap-2 col-6">
                    <p>Enter Available Dates</p>

                    <div className="flex flex-column gap-2">
                        <div className="flex flex-row align-items-center justify-content-between">
                            <label className="text-orange text-sm font-semibold">Available Dates</label>
                            <Button icon='fa-regular fa-calendar' onClick={() => { setShowDatePicker(true) }}></Button>
                        </div>

                    </div>
                    <div className="flex gap-1 flex-wrap">
                        {availableDates.length > 0 ? (availableDates.map((elt) => {
                            return (
                                <Chip removable={true} label={elt} defaultValue={elt} key={elt} onRemove={() => { removeSelectedDate(elt) }} />
                            )
                        })) : <p>No dates selected.</p>}
                    </div>
                    <div className="flex flex-grow-1 flex-row-reverse">
                        <Button label="Save" className="p-button-primary" onClick={handleSubmit} />
                    </div>
                </div>

                <Dialog
                    header='Booking Form'
                    visible={showDatePicker}
                    onHide={() => { setShowDatePicker(false) }}
                    modal={true}
                    footer={renderBookingFormFooter()}
                    maximizable={true}>
                    <Calendar minDate={new Date()} id="TuitionCalendar" inline value={date} onChange={handleDateChange}></Calendar>
                </Dialog>
            </Panel>
        </>
    )
    // return (
    //     <div >
    //         <h1>Tutor Calendar</h1>
    //         <tr>
    //             <div className="flex flex-row align-items-center gap-2">
    //                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<th>Start Time</th>
    //                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<th>End Time</th>
    //                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<th>Session Date</th>
    //             </div>
    //         </tr>
    //         <div className="flex flex-row align-items-center gap-2">
    //             <div className="flex">
    //                 <Dropdown optionLabel="name" value={starttime} options={startiming}
    //                     onChange={(e) => setStarttime(e.target.value)}
    //                     placeholder="Start Time" showClear
    //                 />
    //                 <Dropdown optionLabel="name" value={endtime} options={endtiming}
    //                     onChange={(e) => setEndtime(e.target.value)}
    //                     placeholder="End Time" showClear
    //                 />
    //             </div>
    //             <div className="flex">
    //                 <Calendar className="align-items-center m-0" value={date} onChange={(e) => setDate(e.value)} dateFormat="dd-M-yy" showIcon showTime={false} showSeconds={false} placeholder="Session Date" />
    //             </div>
    //             <div className="flex flex-column align-items-center gap-2">
    //                 <Button label="Save" className="p-button" />
    //             </div>
    //         </div>
    //         <table>
    //             <tr>
    //                 <th>Start Time</th>
    //                 <th>End Time</th>
    //                 <th>Date</th>
    //             </tr>

    //         </table>
    //     </div>
    // );
};
export { TutorCalendar };