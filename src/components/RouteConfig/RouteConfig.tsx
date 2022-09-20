import React from "react"
import { Routes, Route } from "react-router-dom";
import { BaseLayout } from '../Layout/BaseLayout'
import { PageOne } from '../../pages/PageOne/PageOne'
import { ManageSessions } from '../../pages/ManageSessions/ManageSessions'
import { AccountManagement } from '../../pages/AccountManagement/AccountManagement'
import { TuitionBooking } from '../../pages/TuitionBooking/TuitionBooking'
import { PageNotFound } from "../../pages/PageNotFound/PageNotFound";

const RouteConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<BaseLayout />}>
                <Route path="PrimeReact-Component" element={<PageOne />} />
                <Route path="ManageSessions" element={<ManageSessions />} />
                <Route path="AccountManagement" element={<AccountManagement />} />
                <Route path="TuitionBooking" element={<TuitionBooking />} />
                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    )
}
export default RouteConfig