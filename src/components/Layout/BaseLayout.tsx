import React from "react"
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import styles from "src/style-sheet/global.module.css";

type BaseLayoutProps = {
    authenticated: boolean;
}
const BaseLayout = (props:BaseLayoutProps) => {
    return (
        <div className="global-component">
            <NavBar authenticated={props.authenticated}/>
            <div className="p-4">
                <Outlet />
            </div>
        </div>
    );
}

export {BaseLayout}