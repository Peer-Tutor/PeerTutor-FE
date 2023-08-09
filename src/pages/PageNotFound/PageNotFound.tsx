import React from "react";
import styles from './PageNotFound.module.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Link, useNavigate } from "react-router-dom";
import { AccountType, PageLink } from "../../constants/Constant";
import { getUrl, getHomeLink } from "../../utils/apiUtils";


const PageNotFound = () => {
    return (
        <Card className="col-12 my-auto py-8">
            <div className="grid">
                <div className="col-offset-3 my-5 grid align-items-center gap-2 col-6">
                    <label className="col-12 text-center font-bold text-3xl text-red"><i className="fa-solid fa-triangle-exclamation"></i> Page Not Found</label>
                    <label className="col-12 text-center font-base text-base text-black"></label>
                </div>
                <div className="col-12 text-center">
                    <Link to={getHomeLink()}>
                       <Button label="Return" icon="fa-solid fa-house" iconPos="right" className="p-button-primary" />
                    </Link>
                </div>
             </div>
        </Card>
    );
};
export {PageNotFound};