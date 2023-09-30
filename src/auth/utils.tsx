import { Auth } from 'aws-amplify';

export type SignUpParameters = {
  username: string;
  password: string;
  email: string;
  role: string;
  // phoneNumber: string;
};

// const roleMap


type ConfirmSignUpParameters = {
  username: string;
  code: string;
};

export async function confirmSignUp({ username, code }: ConfirmSignUpParameters) {
  try {
    return await Auth.confirmSignUp(username, code);
  } catch (error) {
    console.log('error confirming sign up', error);
  }
}

export async function signUp({ username, password, email, role }: SignUpParameters) {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email, // optional
        'custom:role': role
        // phoneNumber, // optional - E.164 number convention
        // other custom attributes
      },
      autoSignIn: {
        // optional - enables auto sign in after user is confirmed
        enabled: true,
      },
    });
//     console.log(user);
    return user
  } catch (error) {
    console.log('error signing up:', error);
  }
}


type SignInParameters = {
  username: string;
  password: string;
};

export async function signIn({ username, password }: SignInParameters) {
  try {
    const user = await Auth.signIn(username, password);

    
  } catch (error) {
    console.log('error signing in', error);
  }
}

export async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}


export async function currentAuthenticatedUser() {
  try {
    const user = await Auth.currentAuthenticatedUser({
      bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    });
//     console.log(user);
    return user
  } catch(err) {
    console.log(err);
  }
};