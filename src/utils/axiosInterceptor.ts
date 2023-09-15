import axios from 'axios'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLink } from '../constants/Constant';
import { toast } from './toastHooks';

const useInterceptorHook = () => {

  const navigate = useNavigate()
  useEffect(() => {
    axios.interceptors.response.use((response) => {
      alert("intercepting")
      if (response.status === 401) {
        navigate(PageLink.DASHBOARD_LOGIN)
      } else if (response.status !== 200) {
        toast?.current?.show({ severity: 'success', summary: 'Success Message', detail: 'Order submitted' });
      }
      else {
        return response;
      }
    }, (error) => {
      if (error.response && error.response.data) {
//         console.log('hello error')
        return Promise.reject(error?.response?.data);
      }
      return Promise.reject(error?.message);
    });
  }, [])

  return ''

}

export {useInterceptorHook}