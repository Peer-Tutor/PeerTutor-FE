import axios from "axios"
import React, { useEffect, useState } from "react";
import { Subdomain } from "../../constants/Subdomain"
import { getUrl } from "../../utils/apiUtils"
import styles from './PageOne.module.css'; //'./PageOne.module.css'
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';

const TuitionBooking = () => {
    const [state, setState] = useState() // todo type script
    const [selectedCity1, setSelectedCity1] = useState<any>(null);
    const [value1, setValue1] = useState('');
    const [visibility, setDialogVisibility] = useState(false);
    const [valueBookingForm, setValueBookingForm] = useState('');
    const [visibilityBookingForm, setBookingFormVisibility] = useState(false);
    const [date, setDate] = useState<Date | Date[] | undefined>(undefined);
    const [selectedTime, setTime] = useState<any>(null);
    const [selectedSubject, setSubject] = useState<any>(null);

    function dialogClose() {
        setDialogVisibility(false);
    }
    function handleClick() {
        setDialogVisibility(true);
    }

    function closeBookingForm()
    {
        setBookingFormVisibility(false);
    }

    function showBookingForm()
    {
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

    const renderFooter = () => {
      return (
        <div>
          <Button
            label="Accept"
            icon="pi pi-times"
            onClick={() => setDialogVisibility(false)}
            className="p-button-text"
          />
          <Button
            label="Reject"
            icon="pi pi-check"
            onClick={() => setDialogVisibility(false)}
            autoFocus
          />
        </div>
      );
    };

    useEffect(() => {
        const url = getUrl(Subdomain.ACCOUNT_MGR, '/health')
        axios.get(url).then(res=>{
            console.log(res)
            //setState(res)
        }).catch(err=>{
            console.log('error!' , err)
        })
    }, [])
    // console.log('page one rendered')

     const onCityChange = (e: { value: any}) => {
            setSelectedCity1(e.value);
        }

     const onTimeChange = (e: { value: any}) => {
            setTime(e.value);
        }

     const onSubjectChange = (e: { value: any}) => {
            setSubject(e.value);
        }

    const time =[
                { name: '1PM', code: '1PM' },
                { name: '2PM', code: '2PM' },
                { name: '3PM', code: '3PM' },
                { name: '4PM', code: '4PM' },
                { name: '5PM', code: '5PM' }
                ];

    const cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
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
                <label className="text-3xl  text-orange">Tuition Booking</label>
                <div className="flex align-items-center w-6 mt-3 mb-6 gap-3">
                    <div className="flex flex-column align-items-center gap-3">
                        <Button label="Save"  className="p-button"/>
                        <label>Default Button</label>
                    </div>
                    <div className="flex flex-column align-items-center gap-3">
                        <Button label="Save"  className="p-button-primary"/>
                        <label>Primary Button</label>
                    </div>
                    <div className="flex flex-column align-items-center gap-3">
                        <Button label="Save"  className="p-button-secondary"/>
                        <label>Secondary Button</label>
                    </div>
                    <div className="flex flex-column align-items-center gap-3">
                        <Button label="Cancel"  className="p-button-tertiary"/>
                        <label>Tertiary Button</label>
                    </div>
                </div>
                <div className="flex align-items-center w-6 my-3 gap-3">
                    <div className="flex flex-column align-items-center gap-3">
                        <Dropdown optionLabel="name" value={selectedCity1} options={cities}
                                  onChange={onCityChange}
                                  placeholder="Select a City"
                                  />
                    </div>
                    <div className="flex flex-column align-items-center">
                        <InputText value={value1} onChange={(e) => setValue1(e.target.value)} placeholder="Search"/>
                    </div>
                    <div className="flex flex-column align-items-center">
                        <span className="p-input-icon-left">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <InputText value={value1} onChange={(e) => setValue1(e.target.value)} placeholder="Search"/>
                        </span>
                    </div>
                </div>
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
                            <col width="50%" text-align="left"/>
                            <col width="50%" />
                        </colgroup>
                        <tr>
  					        <td><label className="flex my-2 text-lg">Date</label></td>
                            <td><label id="Date" className="flex my-2 text-lg"></label></td>
                        </tr>
                        <tr>
  					        <td><label className="flex my-2 text-lg">Time</label></td>
  					        <Dropdown optionLabel="name" value={selectedTime} options={time}
                                      onChange={onTimeChange}/>
                        </tr>
                        <tr>
  					        <td><label className="flex my-2 text-lg">Subject</label></td>
                            <Dropdown optionLabel="name" value={selectedSubject} options={subjects}
                                      onChange={onSubjectChange}/>
                        </tr>
  					</table>
  					</div>
                </Dialog>
            </div>
            <div>
                <label className="flex my-2 text-xl">Request List</label>
                <div>
                    <table>
                        <colgroup>
                            <col width="25%" text-align="left"/>
                            <col width="75%" />
                        </colgroup>
                        <tr>
                          <th>Student Name</th>
                        </tr>
                        <div id="StudentList" >
                            <Button label="Student 1"  className="p-button" onClick={handleClick}/><br/>
                            <Button label="Student 2"  className="p-button" onClick={handleClick}/>
  				            <Dialog
  				            	header='Student Information'
  				            	visible={visibility}
  				            	onHide={dialogClose}
  				            	modal={true}
  				            	footer={renderFooter()}
  				            	maximizable={true}>
  				            	<div>
  				            	<table>
  				                    <colgroup>
                                        <col width="50%" text-align="left"/>
                                        <col width="50%" />
                                    </colgroup>
                                    <tr>
  				            	        <td><label className="flex my-2 text-lg">Student</label></td>
                                        <td><label id="StudentName" className="flex my-2 text-lg">Vanessa</label></td>
                                    </tr>
                                    <tr>
  				            	        <td><label className="flex my-2 text-lg">Subject</label></td>
                                        <td><label id="Subject" className="flex my-2 text-lg">Math</label></td>
                                    </tr>
                                    <tr>
  				            	        <td><label className="flex my-2 text-lg">Date</label></td>
                                        <td><label id="Date" className="flex my-2 text-lg">18/9/2022</label></td>
                                    </tr>
                                    <tr>
  				            	        <td><label className="flex my-2 text-lg">Time</label></td>
                                        <td><label id="Time" className="flex my-2 text-lg">4:00pm</label></td>
                                    </tr>
  				            	</table>
  				            	</div>
                            </Dialog>
                        </div>
                    </table>
                </div>
            </div>
        </div>
    )
}
export { TuitionBooking }