import React from "react"
import {
    Routes,
    Route,
    Link,
    Outlet,
} from "react-router-dom";
import { BaseLayout } from '../components/Layout/BaseLayout'
import NavBar from "../components/NavBar/NavBar";
import {PageOne} from '../pages/PageOne/PageOne'
import {PageTwo} from '../pages/PageTwo/PageTwo'

const AppNavigation = () => {
    return (
        <Routes>
            <Route path="/" element={<NavBar />} />
            <Route path="expenses" element={<PageOne />} />
            <Route path="invoices" element={<PageTwo />} />
        </Routes>
        // <Routes>
        //     <Route path="/" element={<BaseLayout />}>
        //         {/* <Route index element={<Activity />} />
        //         <Route path="invoices" element={<Invoices />} />
        //         <Route path="activity" element={<Activity />} /> */}
        //     </Route>
        // </Routes>

    )
}
export default AppNavigation