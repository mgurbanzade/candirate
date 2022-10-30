export type AuthFormProps = {
  type: 'login' | 'signup';
};

export type LoginInputs = {
  email: string;
  password: string;
};

export type SignupInputs = {
  email: string;
  firstname: string;
  password: string;
  passwordConfirmation: string;
  type: 'RECRUITER' | 'CANDIDATE';
};

export type AuthFormInputs = LoginInputs | SignupInputs;

export type FormTypeConfigProps = {
  loginHandler: (inputs: AuthFormInputs) => void;
  signupHandler: (inputs: AuthFormInputs) => void;
};

export type FormTypeFields = {
  title: string;
  submitText: string;
  footerText: string;
  footerLinkText: string;
  footerLink: string;
  formHandler: (inputs: AuthFormInputs) => void;
};

export type FormTypeConfig = {
  login: FormTypeFields;
  signup: FormTypeFields;
};
