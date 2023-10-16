import React from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";
import { getHomeLink } from "../../utils/apiUtils";


const PageNotFound = () => {
    return (
        <Card className="col-12 my-auto py-3">
            <div className="flex flex-1 flex-column">
                <div className="flex flex-fill flex-1 flex-column align-items-center gap-3 mb-4">
                    <Link to={getHomeLink()}>
                        <img src={require('../../resources/Home.png')} width={200} height={200} alt=""/>
                    </Link>
                    <label className="flex text-center font-bold text-2xl text-red">Invalid / Unauthorised Access Route</label>
                    <label className="flex text-center font-bold text-base text-black">The page you are attempting to access either could not be found or accessible under your current role access privileges.</label>
                    <label className="flex text-center font-bold text-base text-black">For more information, please contact portal administrator.</label>
                </div>
                <div className="flex flex-fill flex-1 flex-column align-items-center mt-3">
                    <Link to={getHomeLink()}>
                       <Button label="Return" icon="fa-solid fa-house" iconPos="right" className="p-button-primary" />
                    </Link>
                </div>
             </div>
        </Card>
    );
};
export {PageNotFound};