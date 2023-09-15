import { Authenticator, Button, Heading, View, useAuthenticator, useTheme } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { Text, Image } from '@aws-amplify/ui-react'
import React from 'react'

const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Image
          alt="Amplify logo"
          src="https://docs.amplify.aws/assets/logo-dark.svg"
        />
      </View>
    );
  },

  Footer() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Text color={tokens.colors.neutral[80]}>
          &copy; All Rights Reserved
        </Text>
      </View>
    );
  },

  SignIn: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Sign in to your account
        </Heading>
      );
    },
    Footer() {
      const { toResetPassword } = useAuthenticator();

      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toResetPassword}
            size="small"
            variation="link"
          >
            Reset Password
          </Button>
        </View>
      );
    },
  },

  SignUp: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Create a new account
        </Heading>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();

      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toSignIn}
            size="small"
            variation="link"
          >
            Back to Sign In
          </Button>
        </View>
      );
    },
  },
  ConfirmSignUp: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  SetupTOTP: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  ConfirmSignIn: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  ResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  ConfirmResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
};
const formFields = {
  signIn: {
    username: {
      placeholder: 'Enter your email',
    },
  },
  signUp: {

    password: {
      label: 'Password:',
      placeholder: 'Enter your Password:',
      isRequired: false,
      order: 2,
    },
    confirm_password: {
      label: 'Confirm Password:',
      order: 1,
    },
  },
  'custom:role': {
    label: 'role',
    order: 3
  }
  // forceNewPassword: {
  //   password: {
  //     placeholder: 'Enter your Password:',
  //   },
  // },
  // resetPassword: {
  //   username: {
  //     placeholder: 'Enter your email:',
  //   },
  // },
  // confirmResetPassword: {
  //   confirmation_code: {
  //     placeholder: 'Enter your Confirmation Code:',
  //     label: 'New Label',
  //     isRequired: false,
  //   },
  //   confirm_password: {
  //     placeholder: 'Enter your Password Please:',
  //   },
  // },
  // setupTOTP: {
  //   QR: {
  //     totpIssuer: 'test issuer',
  //     totpUsername: 'amplify_qr_test_user',
  //   },
  //   confirmation_code: {
  //     label: 'New Label',
  //     placeholder: 'Enter your Confirmation Code:',
  //     isRequired: false,
  //   },
  // },
  // confirmSignIn: {
  //   confirmation_code: {
  //     label: 'New Label',
  //     placeholder: 'Enter your Confirmation Code:',
  //     isRequired: false,
  //   },
  // },
};

// @ts-nocheck
export default function TestComponent() {
  const services = {
    // @ts-ignore
    async handleSignUp(formData) {
      let { username, password, attributes } = formData;
      // custom username
      username = username.toLowerCase();
      console.log('formData=',formData)
      // attributes.email = attributes.email.toLowerCase();
      return Auth.signUp({
        username,
        password,
        attributes: {
          email: attributes.email, // optional
          'custom:role': 'student'
          // phoneNumber, // optional - E.164 number convention
          // other custom attributes
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });
    },
  };

  return (
    // <Authenticator components={components} formFields={formFields} services={services} >
    <Authenticator 
    signUpAttributes={[
      'email', 'name'
    ]}
      formFields={{
        signUp: {
          'custom:role': {
            label: 'Role',
            placeholder: 'role',
            order: 1
          },
          email: {
            placeholder: 'Enter your email hi',
            label: 'Email',
            order: 2
          },
        },
      
      }}

      services={services}
    >
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}