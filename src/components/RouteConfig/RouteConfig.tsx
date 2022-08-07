import React from "react"
import { Routes, Route } from "react-router-dom";
import { BaseLayout } from '../Layout/BaseLayout'
import { PageOne } from '../../pages/PageOne/PageOne'
import { PageTwo } from '../../pages/PageTwo/PageTwo'
import { PageNotFound } from "../../pages/PageNotFound/PageNotFound";

const RouteConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<BaseLayout />}>
                <Route path="PageOne" element={<PageOne />} />
                <Route path="PageTwo" element={<PageTwo />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}
export default RouteConfig