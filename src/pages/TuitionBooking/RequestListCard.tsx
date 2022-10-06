import React, { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { RequestCard } from './RequestCard';
import { ScrollPanel } from 'primereact/scrollpanel';

type AccountInfo = {
    tutorView?: string;
}

const RequestListCard = (props: AccountInfo) => {
    const [value1, setValue1] = useState('');


    if(props.tutorView == "true"){
        return(
            <div className="card">
                <div className="global-card">
                <label className="text-xl">Request List</label>
                </div>
                <div className="grid">
                    <div className="col-12 md:col-4">
                        <ScrollPanel style={{ width: '100%', height: '80%' }}>
                             <RequestCard Name="Student1" Subject="Math" DateTime="21 Aug 2022 13:00"/>
                             <RequestCard Name="Student2" Subject="English" DateTime="21 Aug 2022 14:00"/>
                        </ScrollPanel>
                    </div>
                </div>
            </div>

        )
    }
    else
    {
        return(
            <div>
            </div>
        )
    }
}

export { RequestListCard }