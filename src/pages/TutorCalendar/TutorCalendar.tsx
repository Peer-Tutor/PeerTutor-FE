import React, { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';

const TutorCalendar = () => {
    const startiming = [
        { name: '09:00', code: '9AM' },
        { name: '10:00', code: '10AM' },
        { name: '13:00', code: '1PM' },
        { name: '14:00', code: '2PM' },
        { name: '15:00', code: '3PM' },
        { name: '19:00', code: '7PM' },
        { name: '20:00', code: '8PM' },
    ];
    const endtiming = [
        { name: '11:00', code: '9AM' },
        { name: '12:00', code: '10AM' },
        { name: '15:00', code: '1PM' },
        { name: '16:00', code: '2PM' },
        { name: '17:00', code: '3PM' },
        { name: '21:00', code: '7PM' },
        { name: '22:00', code: '8PM' },
    ];

    const [starttime, setStarttime] = useState<any>(null);
    const [endtime, setEndtime] = useState<any>(null);
    const [date, setDate] = useState<any>(null);
    // console.log('page two rendered')
    
    return (
        <div >
            <h1>Tutor Calendar</h1>
            <tr>
            <div className="flex flex-row align-items-center gap-2">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<th>Start Time</th>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<th>End Time</th>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<th>Session Date</th>
            </div>
            </tr>
            <div className="flex flex-row align-items-center gap-2">
            <div className="flex">
                        <Dropdown optionLabel="name" value={starttime} options={startiming}
                                  onChange={(e) => setStarttime(e.target.value)}
                                  placeholder="Start Time" showClear
                                  />
                         <Dropdown optionLabel="name" value={endtime} options={endtiming}
                                  onChange={(e) => setEndtime(e.target.value)}
                                  placeholder="End Time" showClear
                                  />
                    </div>
                    <div className="flex">
                        <Calendar className="align-items-center m-0" value={date} onChange={(e) => setDate(e.value)} dateFormat="dd-M-yy" showIcon showTime={false} showSeconds={false} placeholder="Session Date"/>
                    </div>
                    <div className="flex flex-column align-items-center gap-2">
                        <Button label="Save"  className="p-button"/>
                    </div>
                    </div>
                    <table>
                                <tr>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Date</th>
                                 </tr>
    
                            </table>
        </div>
    )
}
export { TutorCalendar }