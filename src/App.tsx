import React from 'react';
import RouteConfig from './components/RouteConfig/RouteConfig';
import { BrowserRouter } from 'react-router-dom';
import './Global.css';
import './PrimeReact.css';
import './auth/AmplifyAuth'

import { redirectToHostedUi } from './utils/Auth';

import { API, Amplify, Auth, Hub,Logger } from 'aws-amplify';
import { TestLoginPage } from './auth/TestLoginPage';

function App() {

  return <TestLoginPage/>
  // redirectToHostedUi()
  // return (
  //   <div>
  //     <h1>Hi</h1>
  //     {/* <a href={process.env.COGNITO_DOMAIN}>Login</a> */}
  //     <button onClick={() => {
  //       if (COGNITO_DOMAIN)
  //         // window.location.href = "https://auth.peertutor.site"// COGNITO_DOMAIN
  //         // @ts-ignore
  //         Auth.federatedSignIn()
  //     }}> login </button>
  //   </div>
  // )
  return (
    <BrowserRouter>
      <RouteConfig />
    </BrowserRouter>
  );
}

export default App;
