import React, { useEffect } from "react"
import { Routes, Route } from "react-router-dom";
import { BaseLayout } from '../Layout/BaseLayout';
import NavBar from '../NavBar/NavBar';
import { PrimeReactSample } from '../../pages/PrimeReactSample/PrimeReactSample';
import { TutorDashboard } from '../../pages/Dashboard/TutorDashboard';
import { TuteeDashboard } from '../../pages/Dashboard/TuteeDashboard';
import { LoginDashboard } from '../../pages/Dashboard/LoginDashboard';
import { WelcomeDashboard } from '../../pages/Dashboard/WelcomeDashboard';

import { ManageSessions } from '../../pages/ManageSessions/ManageSessions';
import { AccountManagement } from '../../pages/AccountManagement/AccountManagement';
import { TuitionBooking } from '../../pages/TuitionBooking/TuitionBooking';
import { TutorCalendar } from '../../pages/TutorCalendar/TutorCalendar';
import { TutorReview } from '../../pages/TutorReview/TutorReview';
import { AddTutorReview } from '../../pages/TutorReview/AddTutorReview';
import { PageNotFound } from "../../pages/PageNotFound/PageNotFound";
import { SearchTutor } from "../../pages/SearchTutor/SearchTutor";
import { useForceUpdate } from "../../utils/HookUtils";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { RequireAuth } from "../../auth/RequireAuth";

const RouteConfig = () => {
    const [refresh, onRefresh] = useForceUpdate()
    const { user, signOut, route } = useAuthenticator((context) => [context.route]);
    let authenticated = route === 'authenticated'

    // useEffect(() => {
    //     console.log('calling on refresh, route = ', route)

    //     if (route !== 'authenticated') { 
    //         // TODO: shift to navbar or layout to route to unprotected if is not authenticated
    //         // onRefresh()
    //         console.log("User signed in")
    //         // TODO: Call user login flow api

    //     } 
    // }, [route])


    return (
        <Routes>
            <Route path="/" element={<BaseLayout forceRefresh={onRefresh} authenticated={false} />}>
                <Route path="" element={<WelcomeDashboard />} />
                {/*  <Route path="library" element={<PrimeReactSample />} /> */}
                <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route path="/dashboard" element={<RequireAuth><BaseLayout forceRefresh={onRefresh} authenticated={true} /></RequireAuth>}>
                <Route path="tutor" element={<RequireAuth><TutorDashboard refresh={refresh} /></RequireAuth>} />
                <Route path="student" element={<RequireAuth><TuteeDashboard refresh={refresh} /></RequireAuth>} />
                {/* <Route path="manage-session" element={<ManageSessions />} /> */}
                <Route path="manage-account" element={<RequireAuth><AccountManagement /></RequireAuth>} />
                <Route path="tuition-booking" element={<RequireAuth><TuitionBooking /></RequireAuth>} />
                <Route path="tuition-calendar" element={<RequireAuth><TutorCalendar /></RequireAuth>} />
                <Route path="tutor-review" element={<RequireAuth><TutorReview /></RequireAuth>} />
                <Route path="add-tutor-review" element={<RequireAuth><AddTutorReview /></RequireAuth>} />
                <Route path="search-tutor" element={<RequireAuth><SearchTutor /></RequireAuth>} />
                <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route path="/account" element={<LoginDashboard />} />
        </Routes>
    )
}
export default RouteConfig