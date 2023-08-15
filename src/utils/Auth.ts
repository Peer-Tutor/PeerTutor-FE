// axios.get<AccountResponse>(url, { params: {
//     name: token.name ?? '',
//     sessionToken: token.sessionToken ?? '',
//     accountName: token.name,
//     id: ''
// } }).then(res => {
//     setName(res.data.displayName ?? token.name ?? '');
//     setIntro(res.data.introduction ?? '');
//     setSubject(res.data.subjects ?? '');
//     setCertificates(res.data.certificates ?? '');
// }).catch(err => {
//     console.log('error!', err);
// });

import axios from 'axios'
import queryString from 'query-string';

export const redirectToHostedUi = () => {
    const COGNITO_DOMAIN = process.env.REACT_APP_COGNITO_DOMAIN
    const REDIRECT_URI = process.env.REACT_APP_COGNITO_REDIRECT_URI
    const USER_POOL_ID = process.env.REACT_APP_COGNITO_USER_POOL_ID
    const CLIENT_ID = process.env.REACT_APP_COGNITO_CLIENT_ID

    // https://app.peertutor.site/?code=a9ea84d0-614c-49e2-b778-0051b6572529&state=TEST
    if (COGNITO_DOMAIN) {
        const output = queryString.stringifyUrl({
            url: COGNITO_DOMAIN, query:
            {
                client_id: CLIENT_ID,
                redirect_uri: REDIRECT_URI,
                response_type: 'code',
                state: 'TEST',
                scope: 'profile email openid',
                // code_challenge_method: '',
                // code_challenge: ''
            }
        });
        console.log('output = ', output)

    } else {
        console.log('COGNITO_DOMAIN is undefined')
    }
}

