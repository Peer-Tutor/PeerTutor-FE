import React from 'react';
import RouteConfig from './components/RouteConfig/RouteConfig';
import { BrowserRouter } from 'react-router-dom';
import './Global.css';
import './PrimeReact.css';
import { redirectToHostedUi } from './utils/Auth';

import { Amplify, Auth, Hub } from 'aws-amplify';

const USER_POOL_ID = process.env.REACT_APP_COGNITO_USER_POOL_ID
const CLIENT_ID = process.env.REACT_APP_COGNITO_CLIENT_ID
const COGNITO_DOMAIN = process.env.REACT_APP_COGNITO_DOMAIN
const HOST_DOMAIN = process.env.REACT_APP_HOST_DOMAIN
const REDIRECT_URI = process.env.REACT_APP_COGNITO_REDIRECT_URI

Amplify.configure({
  Auth: {
    // (required) only for Federated Authentication - Amazon Cognito Identity Pool ID
    // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',

    // (required)- Amazon Cognito Region
    region: 'ap-southeast-1',

    // (optional) - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    // identityPoolRegion: 'XX-XXXX-X',

    // (optional) - Amazon Cognito User Pool ID
    userPoolId: USER_POOL_ID,//'XX-XXXX-X_abcd1234',

    // (optional) - Amazon Cognito Web Client ID (26-char alphanumeric string, App client secret needs to be disabled)
    userPoolWebClientId: CLIENT_ID,//'a1b2c3d4e5f6g7h8i9j0k1l2m3',

    // (optional) - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,

    // (optional) - Configuration for cookie storage
    // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    cookieStorage: {
      // - Cookie domain (only required if cookieStorage is provided)
      domain: HOST_DOMAIN,//'.yourdomain.com',
      // (optional) - Cookie path
      path: '/',
      // (optional) - Cookie expiration in days
      expires: 365,
      // (optional) - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
      sameSite: 'strict',//'strict' | 'lax',
      // (optional) - Cookie secure flag
      // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
      secure: true
    },

    // (optional) - customized storage object
    // storage: MyStorage,

    // (optional) - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    // authenticationFlowType: 'USER_SRP_AUTH',

    // (optional) - Manually set key value pairs that can be passed to Cognito Lambda Triggers
    // clientMetadata: { myCustomKey: 'myCustomValue' },

    // (optional) - Hosted UI configuration
    oauth: {
      domain: COGNITO_DOMAIN,
      scope: [
        'email',
        'profile',
        'openid',
        // 'aws.cognito.signin.user.admin'
      ],
      redirectSignIn: REDIRECT_URI,//'http://localhost:3000/',
      redirectSignOut: REDIRECT_URI,//'http://localhost:3000/',
      clientId: CLIENT_ID,
      responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
    }
  }
});

// Amplify.configure({
//   Auth: {
//     aws_cognito_region: 'ap-southeast-1', // (required) - Region where Amazon Cognito project was created
//     // aws_user_pools_id: USER_POOL_ID, // (optional) -  Amazon Cognito User Pool ID
//     // aws_user_pools_web_client_id: CLIENT_ID, // (optional) - Amazon Cognito App Client ID (App client secret needs to be disabled)
//     // aws_cognito_identity_pool_id:
//     //   'us-east-1:f602c14b-0fde-409c-9a7e-0baccbfd87d0', // (optional) - Amazon Cognito Identity Pool ID
//     // aws_mandatory_sign_in: 'enable', // (optional) - Users are not allowed to get the aws credentials unless they are signed in
//     // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
//     // cookieStorage: {
//     //   // - Cookie domain (only required if cookieStorage is provided)
//     //   domain: HOST_DOMAIN,
//     //   // (optional) - Cookie path
//     //   path: '/',
//     //   // (optional) - Cookie expiration in days
//     //   expires: 365,
//     //   // (optional) - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
//     //   sameSite: 'strict', //| 'lax',
//     //   // (optional) - Cookie secure flag
//     //   // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
//     //   secure: true
//     // },
//     authenticationFlowType: 'ALLOW_USER_SRP_AUTH',

//     // // (optional) - Manually set key value pairs that can be passed to Cognito Lambda Triggers
//     // clientMetadata: { myCustomKey: 'myCustomValue' },
//     // (optional) - Hosted UI configuration
//     oauth: {
//       domain: COGNITO_DOMAIN,
//       scope: [
//         // 'phone',
//         'email',
//         'profile',
//         'openid',
//         // 'aws.cognito.signin.user.admin'
//       ],
//       redirectSignIn: REDIRECT_URI,//'http://localhost:3000/',
//       redirectSignOut: REDIRECT_URI,// 'http://localhost:3000/',
//       clientId: CLIENT_ID,
//       responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
//     }
//   }
// }
// );

function App() {
  redirectToHostedUi()
  return (
    <div>
      <h1>Hi</h1>
      {/* <a href={process.env.COGNITO_DOMAIN}>Login</a> */}
      <button onClick={() => {
        if (COGNITO_DOMAIN)
          // window.location.href = "https://auth.peertutor.site"// COGNITO_DOMAIN
          // @ts-ignore
          Auth.federatedSignIn()
      }}> login </button>
    </div>
  )
  return (
    <BrowserRouter>
      <RouteConfig />
    </BrowserRouter>
  );
}

export default App;
