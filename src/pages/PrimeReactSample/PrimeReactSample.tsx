import axios from "axios"
import React, { useEffect, useState } from "react";
import { Subdomain } from "../../constants/Subdomain"
import { getUrl } from "../../utils/apiUtils"
import styles from './PrimeReactSample.module.css'; //'./PrimeReactSample.module.css'
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

type ResponseDataExample = string
const PrimeReactSample = () => {
    const [state, setState] = useState<ResponseDataExample>() // todo type script
    const [selectedCity1, setSelectedCity1] = useState<any>(null);
    const [value1, setValue1] = useState('');

    useEffect(() => {
        const url = getUrl(Subdomain.ACCOUNT_MGR, '/health')
        axios.get<ResponseDataExample>(url).then(res => {
            console.log("res.data=", res.data)
            setState(res.data)
        }).catch(err => {
            console.log('error!', err)
        })
    }, [])
    // console.log('page one rendered')

    const onCityChange = (e: { value: any }) => {
        setSelectedCity1(e.value);
    }

    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    return (
        <div>
            <div className="global-card">
                <div className="flex flex-column align-items-start gap-3">
                    <h1>Api Response = "{state}"</h1>
                </div>
                <label className="text-3xl  text-orange">DasboardActionCard fields</label>
                <div className="flex align-items-center w-6 mt-3 mb-6 gap-3">

                    <div className="flex flex-column align-items-center gap-3">
                        <Button label="Save" className="p-button" />
                        <label>Default Button</label>
                    </div>
                    <div className="flex flex-column align-items-center gap-3">
                        <Button label="Save" className="p-button" />
                        <label>Default Button</label>
                    </div>
                    <div className="flex flex-column align-items-center gap-3">
                        <Button label="Save" className="p-button-primary" />
                        <label>Primary Button</label>
                    </div>
                    <div className="flex flex-column align-items-center gap-3">
                        <Button label="Save" className="p-button-secondary" />
                        <label>Secondary Button</label>
                    </div>
                    <div className="flex flex-column align-items-center gap-3">
                        <Button label="Cancel" className="p-button-tertiary" />
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
                        <InputText value={value1} onChange={(e) => setValue1(e.target.value)} placeholder="Search" />
                    </div>
                    <div className="flex flex-column align-items-center">
                        <span className="p-input-icon-left">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <InputText value={value1} onChange={(e) => setValue1(e.target.value)} placeholder="Search" />
                        </span>
                    </div>
                </div>
            </div>

            <div className="global-card ">
                <label className="text-3xl text-orange">Labels</label>
                <div className="flex flex-column align-items-start ml-3">
                    <label className="flex my-2 text-3xl">Page Heading (text-3xl)</label>
                    <label className="flex my-2 text-2xl">Section Heading / Name (text-2xl)</label>
                    <label className="flex my-2 text-xl">Table Text</label>
                    <label className="flex my-2 text-lg">Field Label / Column Heading</label>
                    <label className="flex my-2 text-base">Legends</label>
                </div>
            </div>
        </div>
    )
}
export { PrimeReactSample }