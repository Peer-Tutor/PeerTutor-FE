import React, { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const SessionStats = () => {
    return (
            <Card className="col-12">
                <div className="flex flex-row flex-wrap gap-3 justify-content-between">
                   <Card className="statCard field">
                        <div className="flex flex-row align-items-center mb-3 font-bold" >
                            <label className="text-sm text-orange mr-2">Upcoming</label>
                            <i className="fa-solid fa-circle-info text-dark-blue text-xs"></i>
                        </div>
                        <div className="flex flex-row align-items-end font-semibold" >
                            <label className="flex text-3xl text-red mr-2">0</label>
                            <label className="flex text-base text-black mr-2 mb-1">/ 5</label>
                        </div>
                   </Card>
                   <Card className="statCard field">
                        <div className="flex flex-row align-items-center mb-3 font-bold" >
                            <label className="text-sm text-orange mr-2">Upcoming</label>
                            <i className="fa-solid fa-circle-info text-dark-blue text-xs"></i>
                        </div>
                        <div className="flex flex-row align-items-end font-semibold" >
                            <label className="flex text-3xl text-black mr-2">2</label>
                            <label className="flex text-base text-black mr-2 mb-1">/ 6</label>
                        </div>
                   </Card>
                   <Card className="statCard field">
                        <div className="flex flex-row align-items-center mb-3 font-bold" >
                            <label className="text-sm text-orange mr-2">Upcoming</label>
                            <i className="fa-solid fa-circle-info text-dark-blue text-xs"></i>
                        </div>
                        <div className="flex flex-row align-items-end font-semibold" >
                            <label className="flex text-3xl text-bright-green mr-2">2</label>
                            <label className="flex text-base text-black mr-2 mb-1">/ 2</label>
                        </div>
                   </Card>
                   <Card className="statCard field">
                        <div className="flex flex-row align-items-center mb-3 font-bold" >
                            <label className="text-sm text-orange mr-2">Upcoming</label>
                            <i className="fa-solid fa-circle-info text-dark-blue text-xs"></i>
                        </div>
                        <div className="flex flex-row align-items-end font-semibold" >
                            <label className="flex text-3xl text-black mr-2">2</label>
                            <label className="flex text-base text-black mr-2 mb-1">/ 8</label>
                        </div>
                   </Card>
               </div>
            </Card>
    )
}
export { SessionStats }