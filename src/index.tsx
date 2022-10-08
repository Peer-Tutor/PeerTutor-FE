import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { toast } from './utils/toastHooks';
import './utils/axiosInterceptor'

axios.interceptors.response.use(
  (res) => {
    if (res.status === 401) {
      toast?.current?.show({ severity: 'error', summary: 'Error', detail: 'Unauthorised!' });
    } else if (res.status !== 200) {
      toast?.current?.show({ severity: 'error', summary: 'Error', detail: 'An error has occured' });
    } else {
      return res;
    }
  },
  (err) => {
    console.log('network error', err.response.status)
    if (err.response.status === 401) {
      toast?.current?.show({ severity: 'error', summary: 'Error', detail: 'Unauthorised!' });
    } else if(err.response.status === 409){
      toast?.current?.show({ severity: 'error', summary: 'Error', detail: 'Record already exists.' });
    } 
    else {
      toast?.current?.show({ severity: 'error', summary: 'Error', detail: 'An error has occured' });

    }
    return Promise.reject(err);
  }
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

