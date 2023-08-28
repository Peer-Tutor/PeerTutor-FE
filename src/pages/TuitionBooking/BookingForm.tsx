import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Chip } from 'primereact/chip'
import React, { useEffect, useState } from 'react'
import { getSelectedTutorDetails } from './Service'

import { Chips } from 'primereact/chips';
import { MultiSelect } from 'primereact/multiselect'
import { Panel } from 'primereact/panel'
import { HeaderTemplate } from '../../components/Shared/HeaderTemplate'


export type TutorDetail = {
    id: string,
    displayName: string,
    introduction: string,
    subjects: string,
    certificates: string
};

type BookingFormProps = {
    tutorId: string,
    selectedDates: string[],
    handleSubmit: () => void,
    setSelectedDates: any,
    selectedDateDetails: {
        name: string;
        code: string;
    }[],
};
const BookingForm = ({ tutorId, selectedDates, handleSubmit, setSelectedDates, selectedDateDetails }: BookingFormProps) => {

    const [tutorDetails, setTutorDetails] = useState<TutorDetail>();
    useEffect(() => {
        getSelectedTutorDetails(tutorId, setTutorDetails)
    }, []);
    return (
        <Panel header={HeaderTemplate({ title: 'Book Tuition', hideBadge: true })} className="flex flex-column">
            <div className="flex flex-column mx-auto gap-4 flex-1">
                <div className="flex flex-row flex-wrap gap-2">
                    <div className="flex flex-1 flex-column gap-2">
                        <label className="text-orange text-sm font-semibold">Tutor Name</label>
                        <label className="text-black text-xs font-normal">{tutorDetails?.displayName}</label>
                    </div>
                    <div className="flex flex-1 flex-column gap-2">
                        <label className="text-orange text-sm font-semibold">Introduction</label>
                        <label className="text-black text-xs font-normal">{tutorDetails?.introduction}</label>
                    </div>
                </div>
                <div className="flex flex-row flex-wrap gap-2">
                    <div className="flex flex-1 flex-column gap-2">
                        <label className="text-orange text-sm font-semibold">Subjects</label>
                        <label className="text-black text-xs font-normal">{tutorDetails?.subjects ? tutorDetails?.subjects.replaceAll(';', ', ') : ''}</label>
                    </div>
                    <div className="flex flex-1 flex-column gap-2">
                        <label className="text-orange text-sm font-semibold">Certifications</label>
                        <label className="text-black text-xs font-normal">{tutorDetails?.certificates ? tutorDetails?.certificates.replaceAll(';', ', ') : ''}</label>
                    </div>
                </div>
                <div className="flex flex-column gap-2">
                    <label className="text-orange text-sm font-semibold">Selected Dates</label>
                    {selectedDateDetails.length > 0 ?
                        <MultiSelect display="chip" className="col-12"
                            value={selectedDates}
                            options={selectedDateDetails}
                            optionLabel="code"
                            optionValue="code"
                            onChange={(e) => setSelectedDates(e.value)}
                        /> :
                        <><p className="text-sm text-center text-black font-semibold">No dates available</p></>}

                </div>
                <div className="flex flex-grow-1 flex-row-reverse">
                    <Button label="Submit" className="p-button-primary" onClick={handleSubmit} disabled={selectedDates.length > 0 ? false : true} />
                </div>
            </div>
        </Panel>
    );
};

export { BookingForm };