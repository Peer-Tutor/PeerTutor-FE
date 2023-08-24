import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import { currentAuthenticatedUser, signIn, signUp } from './utils'
import TestComponent from './LLL'
import { API, Auth, Signer } from 'aws-amplify'

export const TestLoginPage = () => {
    const [name, setName] = useState('')
    const [pw, setPw] = useState('')
    const [email, setEmail] = useState('')


    API.get('PetStore', '/pets', {
        headers: {}, // OPTIONAL
        response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
        queryStringParameters: {
            name: 'param' // OPTIONAL
        }})
        .then((response) => {
            // Add your code here
            console.log('response = ', response)
        })
        .catch((error) => {
            console.log('error,', error)
            console.log(error.response);
        });
    return (
        <Card className="col-12 my-auto py-8">
            <TestComponent />
            <div className="flex flex-1">
                <div className="flex flex-column mx-auto gap-5 col-6">
                    <div className="flex flex-column gap-2">
                        <label className="text-orange text-sm font-semibold">Name</label>
                        <InputText type="text" className="col-12" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="flex flex-column gap-2">
                        <label className="text-orange text-sm font-semibold">Password</label>
                        <InputText type="password" className="col-12" value={pw} onChange={(e) => setPw(e.target.value)} />
                    </div>

                    <div className="flex flex-column gap-2">
                        <label className="text-orange text-sm font-semibold">Email</label>
                        <InputText type="password" className="col-12" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="flex flex-grow-1 flex-row-reverse">
                        <Button label="Register" className="p-button-primary" onClick={() => {
                            signUp({ username: name, password: pw, email: email })
                        }} />
                    </div>
                    <div className="flex flex-grow-1 flex-row-reverse">
                        <Button label="Sign in" className="p-button-primary" onClick={() => {
                            signIn({ username: name, password: pw })
                        }} />
                    </div>

                    <div className="flex flex-grow-1 flex-row-reverse">
                        <Button label="Current User" className="p-button-primary" onClick={() => {
                            currentAuthenticatedUser()
                        }} />
                    </div>


                    <div className="flex flex-grow-1 flex-row-reverse">
                        <Button label="Test Api Call" className="p-button-primary" onClick={async function () {
                            // console.log('test')
                            Auth.currentUserCredentials()
                            // user.getUserCredentials().accessKeyId
                            await API.get('Test', '/pets', {
                                // headers: {
                                    // 'Authorization': `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
                                // }, // OPTIONAL
                                response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
                                queryStringParameters: {
                                    // name: 'param' // OPTIONAL
                                }})
                                .then((response) => {
                                    // Add your code here
                                    console.log('response = ', response)
                                })
                                .catch((error) => {
                                    console.log('error', error)
                                    // console.log(error.response);
                                });
                        }} />
                    </div>
                </div>
            </div>
        </Card>
    )
}