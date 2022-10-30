import { FormTypeConfigProps, FormTypeConfig } from './types';

export const getFormTypeConfig = ({
  loginHandler,
  signupHandler,
}: FormTypeConfigProps): FormTypeConfig => ({
  login: {
    title: 'Sign in to your account',
    submitText: 'Log in',
    footerText: 'Not registered yet?',
    footerLinkText: 'Sign up',
    footerLink: '/signup',
    formHandler: loginHandler,
  },
  signup: {
    title: 'Create a new account',
    submitText: 'Sign up',
    footerText: 'Already have account?',
    footerLinkText: 'Log in',
    footerLink: '/login',
    formHandler: signupHandler,
  },
});
