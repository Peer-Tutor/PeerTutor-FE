import React from "react"
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

const RouteConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<BaseLayout authenticated={false}/>}>
                <Route path="" element={<WelcomeDashboard />} />
                <Route path="library" element={<PrimeReactSample />} />
                <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route path="/dashboard" element={<BaseLayout authenticated={true}/>}>
                <Route path="tutor" element={<TutorDashboard />} />
                <Route path="student" element={<TuteeDashboard />} />
                <Route path="manage-session" element={<ManageSessions />} />
                <Route path="manage-account" element={<AccountManagement />} />
                <Route path="tuition-booking" element={<TuitionBooking />} />
                <Route path="tuition-calendar" element={<TutorCalendar />} />
                <Route path="tutor-review" element={<TutorReview />} />
                <Route path="add-tutor-review" element={<AddTutorReview />} />
                <Route path="search-tutor" element={<SearchTutor />} />
                <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route path="/account" element={<LoginDashboard />} />
        </Routes>
    )
}
export default RouteConfig