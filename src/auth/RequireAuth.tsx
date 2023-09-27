import React, { ReactChildren } from 'react'
import { useAuthenticator, Heading } from '@aws-amplify/ui-react';
import { Navigate, useLocation } from 'react-router-dom';

// @ts-ignore
export const RequireAuth = (props) => { // todo: typescript
    const location = useLocation();
    const { route } = useAuthenticator((context) => [context.route]);
    if (route !== 'authenticated') {
        console.log("In requireAuth, is not authenticated. route = ", route)
        // return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <>
        {props.children}
    </>
}