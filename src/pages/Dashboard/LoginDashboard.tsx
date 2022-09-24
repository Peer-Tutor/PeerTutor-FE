import React, { useEffect, useState } from "react";
import { Fieldset } from 'primereact/fieldset';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Link } from "react-router-dom";

const LoginDashboard = () => {
    const [registerView, setRegister] = useState(false);
    const [accountType, setAccountType] = useState('STUDENT');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [route, setRoute] = useState('/dashboard/tutee');

    const accountTypeList = [ { name: 'Student', code: 'STUDENT' }, { name: 'Tutor', code: 'Tutor' } ];
    const accountTypeChange = (e: { value: any }) => {
        setAccountType(e.value);
        if(e.value == 'STUDENT'){ setRoute('/dashboard/tutee'); }else{ setRoute('/dashboard/tutor'); }
    }

    if(registerView){
        return (
            <div className="global-component">
                <div className="p-4 flex flex-column h-screen">
                    <Card className="col-12 my-auto py-8">
                        <div className="grid">
                            <div className="col-12 text-center">
                                <img src={require('../../resources/TutorPeer.png')} width={400} height={120} alt=""/>
                            </div>
                            <div className="mx-auto my-5 grid align-items-center gap-4 col-6">
                                <InputText type="text" className="col-12"  value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                                <Password  className="col-12 p-0" inputClassName="col-12"  value={password} onChange={(e) => setPassword(e.target.value)}
                                           placeholder="Password" feedback={false}/>
                                <Dropdown optionLabel="name" optionValue="code" value={accountType} options={accountTypeList} onChange={accountTypeChange}/>
                                <div className="flex flex-grow-1 flex-row-reverse">
                                   <Link to={route}>
                                        <Button label="Register" className="p-button-primary flex" />
                                   </Link>
                                        <Button label="Login" className="p-button-secondary" onClick={()=>setRegister(false)}/>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }else{
        return (
            <div className="global-component">
                <div className="p-4 flex flex-column h-screen">
                    <Card className="col-12 my-auto py-8">
                        <div className="grid">
                            <div className="col-12 text-center">
                                <img src={require('../../resources/TutorPeer.png')} width={400} height={120} alt=""/>
                            </div>
                            <div className="mx-auto my-5 grid align-items-center gap-4 col-6">
                                <InputText type="text" className="col-12"  value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                                <Password  className="col-12 p-0" inputClassName="col-12"  value={password} onChange={(e) => setPassword(e.target.value)}
                                           placeholder="Password" feedback={false}/>
                                <div className="flex flex-grow-1 flex-row-reverse">
                                   <Link to={route}>
                                        <Button label="Login" className="p-button-primary flex" />
                                    </Link>
                                        <Button label="Register" className="p-button-secondary" onClick={()=>setRegister(true)}/>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}
export { LoginDashboard }