import axios from "axios"
import React, { useEffect, useState } from "react";
import { Subdomain } from "../../constants/Subdomain"
import { getUrl } from "../../utils/apiUtils"
import styles from './PageOne.module.css'; //'./PageOne.module.css'
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

const PageOne = () => {
    const [state, setState] = useState()

    useEffect(() => {
        const url = getUrl(Subdomain.ACCOUNT_MGR, '/health')
        axios.get(url).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log('error!' , err)
        })
        // callApi('/health', null, 'GET').then(res => {
        //     console.log('success, res=', res)
        // }).catch(err => {
        //     console.log('error', err)
        // })

    }, [])
    // console.log('page one rendered')
    return (
        <div className="global-component">
            <div className="global-card">
                <h1>Input fields</h1>
            </div>
            <div className="flex align-items-center">
                <Button label="Save"  className="p-button"/>
                <Button label="Save"  className="p-button-primary"/>
                <Button label="Save"  className="p-button-secondary"/>
                <Button label="Save"  className="p-button-tertiary"/>
            </div>
        </div>
    )
}
export { PageOne }