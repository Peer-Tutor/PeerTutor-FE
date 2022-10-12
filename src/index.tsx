import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { toast } from './utils/toastHooks';
import './utils/axiosInterceptor'

axios.interceptors.response.use(
  (res) => {
    if (res.status === 401) {
      toast?.current?.show({ severity: 'error',
        content: (
           <div className="flex flex-row" style={{flex: '1'}}>
                <div className="flex mx-3">
                    <i className="text-xl text-orange fa-solid fa-triangle-exclamation"></i>
                </div>
                <div className="flex flex-1 flex-column">
                    <label className="flex text-xl text-orange font-semibold">Error</label>
                    <label className="text-base text-white font-semibold">Service call unauthorised!</label>
                </div>
           </div>), life: 5000 });
    } else if (res.status !== 200 && res.status !== 204) {
      toast?.current?.show({ severity: 'error',
        content: (
            <div className="flex flex-row align-items-center" style={{flex: '1'}}>
                <div className="flex mx-3">
                    <i className="text-xl text-orange fa-solid fa-triangle-exclamation"></i>
                </div>
                <div className="flex flex-1 flex-column">
                    <label className="flex text-lg text-orange font-bold">Error enountered</label>
                    <label className="text-xs text-white font-normal">Unexpected error encountered!</label>
                </div>
            </div>),  closable: true, life: 5000 });
    } else {
      return res;
    }
  },
  (err) => {
    console.log('network error', err.response.status)
    if (err.response.status === 401) {
      toast?.current?.show({ severity: 'error',
        content: (
            <div className="flex flex-row align-items-center" style={{flex: '1'}}>
                <div className="flex mx-3">
                    <i className="text-xl text-orange fa-solid fa-triangle-exclamation"></i>
                </div>
                <div className="flex flex-1 flex-column">
                    <label className="flex text-lg text-orange font-bold">Error enountered</label>
                    <label className="text-xs text-white font-normal">Service call unauthorised!</label>
                </div>
            </div>), closable: true, life: 5000 });
    } else if(err.response.status === 409){
      toast?.current?.show({ severity: 'error',
        content: (
            <div className="flex flex-row align-items-center" style={{flex: '1'}}>
                <div className="flex mx-3">
                    <i className="text-xl text-orange fa-solid fa-triangle-exclamation"></i>
                </div>
                <div className="flex flex-1 flex-column">
                    <label className="flex text-lg text-orange font-bold">Error enountered</label>
                    <label className="text-xs text-white font-normal">Record already exist!</label>
                </div>
            </div>), closable: true, life: 5000 });
    }
    else {
      toast?.current?.show({ severity: 'error',
        content: (
            <div className="flex flex-row align-items-center" style={{flex: '1'}}>
                <div className="flex mx-3">
                    <i className="text-xl text-orange fa-solid fa-triangle-exclamation"></i>
                </div>
                <div className="flex flex-1 flex-column">
                    <label className="flex text-lg text-orange font-bold">Error enountered</label>
                    <label className="text-xs text-white font-normal">Unexpected error encountered!</label>
                </div>
            </div>), closable: true, life: 5000 });

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

