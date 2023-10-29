import { Amplify, Hub, Logger } from "aws-amplify";

const isDev = process.env.REACT_APP_IS_DEV === "prod" ? false : true // process.env.REACT_APP_IS_DEV !== undefined ? process.env.REACT_APP_IS_DEV : true
const USER_POOL_ID = process.env.REACT_APP_COGNITO_USER_POOL_ID
const CLIENT_ID = process.env.REACT_APP_COGNITO_CLIENT_ID
const COGNITO_DOMAIN = process.env.REACT_APP_COGNITO_DOMAIN
const HOST_DOMAIN = process.env.REACT_APP_HOST_DOMAIN
const REDIRECT_URI = process.env.REACT_APP_COGNITO_REDIRECT_URI

console.log("isDev = ", isDev, process.env.REACT_APP_IS_DEV, process.env)
console.log("Env variables = ", "USER_POOL_ID", USER_POOL_ID, "CLIENT_ID", CLIENT_ID, "COGNITO_DOMAIN", COGNITO_DOMAIN, "HOST_DOMAIN", HOST_DOMAIN, "REDIRECT_URI", REDIRECT_URI)

Amplify.configure({
  Auth: {
    // (required) only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: 'ap-southeast-1:846fc306-5a64-4f33-a57b-579953345ec8',

    // (required)- Amazon Cognito Region
    region: 'ap-southeast-1',

    // (optional) - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    // identityPoolRegion: 'ap-southeast-1',

    // (optional) - Amazon Cognito User Pool ID
    userPoolId: USER_POOL_ID,//'XX-XXXX-X_abcd1234',

    // (optional) - Amazon Cognito Web Client ID (26-char alphanumeric string, App client secret needs to be disabled)
    userPoolWebClientId: CLIENT_ID,//'a1b2c3d4e5f6g7h8i9j0k1l2m3',

    // (optional) - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,

    // (optional) - Configuration for cookie storage
    // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    cookieStorage: {
      // - Cookie domain (only required if cookieStorage is provided)

      // TODO CHANGE BASED ON DIFF ENV
      domain: isDev ? 'localhost' : HOST_DOMAIN,//'.yourdomain.com',
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
      // TODO CHANGE BASED ON DIFF ENV
      redirectSignIn: REDIRECT_URI,//'http://localhost:3000/',
      // TODO CHANGE BASED ON DIFF ENV
      redirectSignOut: isDev === "1" ? 'http://localhost:3000/' : REDIRECT_URI,//'http://localhost:3000/',
      clientId: CLIENT_ID,
      responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
    }
  }
});

let obj = {
  Auth: {
    // (required) only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: 'ap-southeast-1:846fc306-5a64-4f33-a57b-579953345ec8',

    // (required)- Amazon Cognito Region
    region: 'ap-southeast-1',

    // (optional) - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    // identityPoolRegion: 'ap-southeast-1',

    // (optional) - Amazon Cognito User Pool ID
    userPoolId: USER_POOL_ID,//'XX-XXXX-X_abcd1234',

    // (optional) - Amazon Cognito Web Client ID (26-char alphanumeric string, App client secret needs to be disabled)
    userPoolWebClientId: CLIENT_ID,//'a1b2c3d4e5f6g7h8i9j0k1l2m3',

    // (optional) - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,

    // (optional) - Configuration for cookie storage
    // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    cookieStorage: {
      // - Cookie domain (only required if cookieStorage is provided)

      // TODO CHANGE BASED ON DIFF ENV
      domain: isDev ? 'localhost' : HOST_DOMAIN,//'.yourdomain.com',
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
      // TODO CHANGE BASED ON DIFF ENV
      redirectSignIn: isDev ? 'http://localhost:3000/' : REDIRECT_URI,//'http://localhost:3000/',
      // TODO CHANGE BASED ON DIFF ENV
      redirectSignOut: isDev ? 'http://localhost:3000/' : REDIRECT_URI,//'http://localhost:3000/',
      clientId: CLIENT_ID,
      responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
    }
  }
}

console.log('obj = ', obj)

const logger = new Logger('My-Logger');

// @ts-ignore
const listener = (data) => {
  switch (data?.payload?.event) {
    case 'configured':
      logger.info('the Auth module is configured');
      break;
    case 'signIn':
      console.log("User signed in")
      logger.info('user signed in');
      break;
    case 'signIn_failure':

      logger.error('user sign in failed');
      break;
    case 'signUp':
      console.log("User signed up")

      logger.info('user signed up');
      break;
    case 'signUp_failure':
      logger.error('user sign up failed');
      break;
    case 'confirmSignUp':
      logger.info('user confirmation successful');
      break;
    case 'completeNewPassword_failure':
      logger.error('user did not complete new password flow');
      break;
    case 'autoSignIn':
      logger.info('auto sign in successful');
      break;
    case 'autoSignIn_failure':
      logger.error('auto sign in failed');
      break;
    case 'forgotPassword':
      logger.info('password recovery initiated');
      break;
    case 'forgotPassword_failure':
      logger.error('password recovery failed');
      break;
    case 'forgotPasswordSubmit':
      logger.info('password confirmation successful');
      break;
    case 'forgotPasswordSubmit_failure':
      logger.error('password confirmation failed');
      break;
    case 'verify':
      logger.info('TOTP token verification successful');
      break;
    case 'tokenRefresh':
      logger.info('token refresh succeeded');
      break;
    case 'tokenRefresh_failure':
      logger.error('token refresh failed');
      break;
    case 'cognitoHostedUI':
      logger.info('Cognito Hosted UI sign in successful');
      break;
    case 'cognitoHostedUI_failure':
      logger.error('Cognito Hosted UI sign in failed');
      break;
    case 'customOAuthState':
      logger.info('custom state returned from CognitoHosted UI');
      break;
    case 'customState_failure':
      logger.error('custom state failure');
      break;
    case 'parsingCallbackUrl':
      logger.info('Cognito Hosted UI OAuth url parsing initiated');
      break;
    case 'userDeleted':
      logger.info('user deletion successful');
      break;
    case 'updateUserAttributes':
      logger.info('user attributes update successful');
      break;
    case 'updateUserAttributes_failure':
      logger.info('user attributes update failed');
      break;
    case 'signOut':
      logger.info('user signed out');
      break;
    default:
      logger.info('unknown event type');
      break;
  }
};

Hub.listen('auth', listener);
