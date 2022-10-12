import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Chip } from 'primereact/chip'
import React, { useEffect, useState } from 'react'
import { getSelectedTutorDetails } from './Service'


export type TutorDetail = {
    id: string,
    displayName: string,
    introduction: string,
    subjects: string,
    certificates: string
}

type BookingFormProps = {
    tutorId: string,
    selectedDates: string[],
    setBookingFormVisibility: any,
    removeSelectedDate: (d:string)=>void,
    handleSubmit: ()=>void
}
const BookingForm = ({ tutorId, selectedDates, setBookingFormVisibility, removeSelectedDate ,handleSubmit }: BookingFormProps) => {

    const [tutorDetails, setTutorDetails] = useState<TutorDetail>()
    useEffect(() => {
        getSelectedTutorDetails(tutorId, setTutorDetails)
    }, [])
    return (
        <Card className="flex flex-column py-4 w-full">
            <div className="flex flex-column mx-auto gap-2 col-6">
                <div className="flex flex-column gap-2">
                    <label className="text-orange text-sm font-semibold">Tutor Name</label>
                    <p>{tutorDetails?.displayName}</p>
                </div>
                <div className="flex flex-column gap-2">
                    <label className="text-orange text-sm font-semibold">Introduction</label>
                    <p>{tutorDetails?.introduction}</p>
                </div>
                <div className="flex flex-column gap-2">
                    <label className="text-orange text-sm font-semibold">Subjects</label>
                    <p>{tutorDetails?.subjects.replace(';', ', ')}</p>
                </div>
                <div className="flex flex-column gap-2">
                    <label className="text-orange text-sm font-semibold">Certifications</label>
                    <p>{tutorDetails?.certificates.replace(';', ', ')}</p>
                </div>
                <div className="flex flex-column gap-2">
                    <div className="flex flex-row align-items-center justify-content-between">
                        <label className="text-orange text-sm font-semibold">Selected Dates</label>
                        <Button icon='fa-regular fa-calendar' onClick={() => { setBookingFormVisibility(true) }}></Button>
                    </div>

                </div>
                <div className="flex gap-1 flex-wrap">
                    {selectedDates.map((elt) => {
                        return (
                            <Chip removable={true} label={elt} defaultValue={elt} key={elt} onRemove={()=> {removeSelectedDate(elt)}} />
                        )
                    })}
                </div>
                <div className="flex flex-grow-1 flex-row-reverse">
                    <Button label="Submit" className="p-button-primary" onClick={handleSubmit} />
                </div>
            </div>
        </Card>
    )
}

export {BookingForm}