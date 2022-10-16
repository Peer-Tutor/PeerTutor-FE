import React from "react";
import styles from './PageNotFound.module.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Link, useNavigate } from "react-router-dom";
import { AccountType, PageLink } from "../../constants/Constant";
import { getSessionTokenValues, getUrl } from "../../utils/apiUtils";


const PageNotFound = () => {
    const { name, sessionToken, profileId, accountType } = getSessionTokenValues();
    return (
        <Card className="col-12 my-auto py-8">
            <div className="grid">
                <div className="col-offset-3 my-5 grid align-items-center gap-2 col-6">
                    <label className="col-12 text-center font-bold text-3xl text-red"><i className="fa-solid fa-triangle-exclamation"></i> Page Not Found</label>
                    <label className="col-12 text-center font-base text-base text-black"></label>
                </div>
                <div className="col-12 text-center">
                    <Link to={accountType == AccountType.STUDENT ? PageLink.DASHBOARD_STUDENT : (accountType == AccountType.TUTOR ? PageLink.DASHBOARD_TUTOR : PageLink.DEFAULT)}>
                       <Button label="Return" icon="fa-solid fa-house" iconPos="right" className="p-button-primary" />
                    </Link>
                </div>
             </div>
        </Card>
    );
};
export {PageNotFound};