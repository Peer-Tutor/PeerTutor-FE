import React from "react"
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

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