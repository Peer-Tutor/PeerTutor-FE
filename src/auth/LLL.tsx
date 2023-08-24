import { Authenticator } from '@aws-amplify/ui-react';
import React from 'react'

// @ts-nocheck
export default function TestComponent() {

    return (
        <Authenticator>
        {({ signOut, user }) => (
          <main>
            <h1>Hello {user?.username}</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    );
  }