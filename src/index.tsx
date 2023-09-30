import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { toast } from './utils/toastHooks';
import './utils/axiosInterceptor'
import { Auth } from 'aws-amplify';
import { currentAuthenticatedUser } from './auth/utils';
import { getProfileName } from './utils/apiUtils';

axios.interceptors.request.use(async (config) => {
//   console.log('in await,')
  try {
    // const user = await Auth.currentSession()//currentAuthenticatedUser()
    // const token = await user.getAccessToken().getJwtToken()
    const user = await currentAuthenticatedUser()
    const token = user.signInUserSession.accessToken.jwtToken
    // console.log('user = ', user)
    // console.log("token = ", token)
//     console.log("in try")
    config.headers = {
      // todo: pass only if is authenticated
      "authorizationtoken": token, //user.signInUserSession.accessToken.jwtToken ,
      Name: getProfileName()
    }
    return config;
  }
  catch (err) {
//     console.log("in catch")
    console.log("ERROR!!", err)
    return config
  }
}, (err) => {
  console.log("Throwing error")
  return Promise.reject(err);
})

axios.interceptors.response.use(
  (res) => {
    if (res.status === 401) {
      toast?.current?.show({
        severity: 'error',
        content: (
          <div className="flex flex-row" style={{ flex: '1' }}>
            <div className="flex mx-3">
              <i className="text-xl text-orange fa-solid fa-triangle-exclamation"></i>
            </div>
            <div className="flex flex-1 flex-column">
              <label className="flex text-normal text-orange font-bold">Unauthorised service call</label>
              <label className="text-xs text-white font-normal">Please provide authenticated account credentials</label>
            </div>
          </div>), life: 5000
      });
    } else if (res.status !== 200 && res.status !== 204) {
      toast?.current?.show({
        severity: 'error',
        content: (
          <div className="flex flex-row align-items-center" style={{ flex: '1' }}>
            <div className="flex mx-3">
              <i className="text-xl text-orange fa-solid fa-triangle-exclamation"></i>
            </div>
            <div className="flex flex-1 flex-column">
              <label className="flex text-lg text-orange font-bold">Error encountered</label>
              <label className="text-xs text-white font-normal">Unexpected error encountered!</label>
            </div>
          </div>), closable: false, life: 5000
      });
    } else {
      return res;
    }
  },
  (err) => {
    if (err.response.status === 401) {
      toast?.current?.show({
        severity: 'error',
        content: (
          <div className="flex flex-row align-items-center" style={{ flex: '1' }}>
            <div className="flex mx-3">
              <i className="text-xl text-orange fa-solid fa-triangle-exclamation"></i>
            </div>
            <div className="flex flex-1 flex-column">
              <label className="flex text-normal text-orange font-bold">Unauthorised service call</label>
              <label className="text-xs text-white font-normal">Please provide authenticated account credentials</label>
            </div>
          </div>), closable: false, life: 5000
      });
    } else if (err.response.status === 409) {
      toast?.current?.show({
        severity: 'error',
        content: (
          <div className="flex flex-row align-items-center" style={{ flex: '1' }}>
            <div className="flex mx-3">
              <i className="text-xl text-orange fa-solid fa-triangle-exclamation"></i>
            </div>
            <div className="flex flex-1 flex-column">
              <label className="flex text-lg text-orange font-bold">Account profile exists</label>
              <label className="text-xs text-white font-normal">Please login with these credentials.</label>
            </div>
          </div>), closable: false, life: 5000
      });
    } else {
      toast?.current?.show({
        severity: 'error',
        content: (
          <div className="flex flex-row align-items-center" style={{ flex: '1' }}>
            <div className="flex mx-3">
              <i className="text-xl text-orange fa-solid fa-triangle-exclamation"></i>
            </div>
            <div className="flex flex-1 flex-column">
              <label className="flex text-lg text-orange font-bold">Error encountered</label>
              <label className="text-xs text-white font-normal">Unexpected error encountered!</label>
            </div>
          </div>), closable: false, life: 5000
      });

    }
    return Promise.reject(err);
  }
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

