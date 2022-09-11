import React from "react";
import styles from './PageOne.module.css'; //'./PageOne.module.css'
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

const PageOne = () => {
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
export {PageOne}