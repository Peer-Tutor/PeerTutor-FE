import React from "react"
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import styles from "src/style-sheet/global.module.css";
import { Toast } from "primereact/toast";
import { useToastHook } from "../../utils/toastHooks";
// import {useInterceptorHook} from '../../utils/axiosInterceptor'
type BaseLayoutProps = {
    authenticated: boolean;
    forceRefresh: any
};
const BaseLayout = (props:BaseLayoutProps) => {
    const [toast] = useToastHook()
    return (
        <div className="global-component">
            <NavBar forceRefresh={props.forceRefresh} authenticated={props.authenticated}/>
            <Toast ref={toast} />
            <div className="p-4">
                <Outlet />
            </div>
        </div>
    );
}

export {BaseLayout}