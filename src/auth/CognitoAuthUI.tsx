import { Authenticator,ThemeProvider, Theme, Button, Heading, View, useAuthenticator, useTheme } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { Text, Image } from '@aws-amplify/ui-react'
import React, { useState } from 'react'
import { Dropdown } from 'primereact/dropdown';
import { AccountType, AccountTypeList } from '../constants/Constant';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { LOGIN_NAME_REGEX, LOGIN_NAME_SIZE, PASSWORD_SIZE } from '../constants/Validation';

// @ts-nocheck
export default function TestComponent() {
  const [accountType, setAccountType] = useState(AccountType.STUDENT);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const accountTypeList = AccountTypeList;
  const accountTypeChange = (e: { value: any }) => { setAccountType(e.value); };

  const { tokens } = useTheme();
  const theme: Theme = {
    name: 'Auth Example Theme',
    tokens: {
      colors: {
        background: {
          primary: {
            value: tokens.colors.neutral['90'].value,
          },
          secondary: {
            value: tokens.colors.neutral['100'].value,
          },
        },
        font: {
          interactive: {
            value: tokens.colors.white.value,
          },
        },
        brand: {
          primary: {
            '10': tokens.colors.teal['100'],
            '80': tokens.colors.teal['40'],
            '90': tokens.colors.teal['20'],
            '100': tokens.colors.teal['10'],
          },
        },
      },
      components: {
        tabs: {
          item: {
            _focus: {
              color: {
                value: tokens.colors.white.value,
              },
            },
            _hover: {
              color: {
                value: tokens.colors.yellow['80'].value,
              },
            },
            _active: {
              color: {
                value: tokens.colors.white.value,
              },
            },
          },
        },
      },
    },
  };
  const components = {
    // SignIn: {
    //   FormFields() {
    //     return (
    //       <>
    //         <Authenticator.SignUp.Header />
    //       </>
    //     )
    //   }
    // },
    SignUp: {
      FormFields() {
        const { validationErrors } = useAuthenticator();

        return (
          <>
            {/* Re-use default `Authenticator.SignUp.FormFields` */}
            {/* <Authenticator.SignUp.FormFields /> */}

            {/* Override sign up forms */}
            <div className="mx-auto my-5 grid align-items-center gap-4 col-6">
              <InputText
                type="text"
                className="col-12"
                name="username"
                keyfilter={LOGIN_NAME_REGEX}
                // value={name}
                // onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                maxLength={LOGIN_NAME_SIZE}
                tooltip="Name should not contain numeric or special characters"
                tooltipOptions={{ event: 'both', position: 'right' }}
              />

              <InputText
                type="text"
                className="col-12"
                name="email"
                // keyfilter={LOGIN_NAME_REGEX} // TODO: CHANGE TO EMAIL_REGEX
                placeholder="Email"
                // maxLength={LOGIN_NAME_SIZE} // TODO: CHANGE TO EMAIL_SIZE
                tooltip="Email should not contain numeric or special characters"
                tooltipOptions={{ event: 'both', position: 'right' }}
              />
              <Password
                name="password"
                className="col-12 p-0"
                inputClassName="col-12"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                keyfilter={/^[^\#\$\^\*\(\)\-\=\_\+\{\}\|\[\]\;\'\:\"\<\>\?\,\.\/]+$/}
                placeholder="Password" feedback={true} maxLength={PASSWORD_SIZE}
                weakLabel="Current password is not advisable to ensure account secured."
                mediumLabel="Password entered could be stronger to keep your account secured."
                strongLabel="Current password is advisable and sufficient to keep account secured."
                tooltip="Contain at least 1 digit, uppercase, lowercase and special characters: @$!%*?&"
                tooltipOptions={{ event: 'both', position: 'right' }}
              />

              <Dropdown name="custom:role"
                optionLabel="name"
                optionValue="code"
                value={accountType}
                options={accountTypeList}
                onChange={accountTypeChange}
              />
            </div>
          </>
        );
      }
    }
  }
  const services = {
    // @ts-ignore
    async handleSignUp(formData) {
      let { username, password, attributes } = formData;
      // custom username
      username = username.toLowerCase();
      const role = formData.attributes['custom:role']
      console.log('formData=', formData)
      // attributes.email = attributes.email.toLowerCase();
      return Auth.signUp({
        username,
        password,
        attributes: {
          email: attributes.email, // optional
          'custom:role': role// 'student'
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
    <ThemeProvider theme={theme}>
    <Authenticator
      signUpAttributes={[
        'email', 'name'
      ]}
      formFields={{
        signUp: {

          email: {
            placeholder: 'Enter your email hi',
            label: 'Email',
            order: 1
          },
          password: {
            order: 5
          },
          confirm_password: {
            order: 6
          }
        },

      }}
      components={components}
      services={services}
    >
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
    </ThemeProvider>
  );
}