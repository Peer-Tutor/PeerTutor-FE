import React from "react"
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import styles from "src/style-sheet/global.module.css";

interface BaseLayoutProps {
    // children?: React.ReactNode;
}
const BaseLayout = (props:BaseLayoutProps) => {
    console.log('baselayour rendered')
    return (
        <div>
            <NavBar/>
            <Outlet />
        </div>
    )
}

export {BaseLayout}