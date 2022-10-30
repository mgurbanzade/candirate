export type AuthFormProps = {
  type: 'login' | 'signup';
};

export type FormTypeConfigProps = {
  loginHandler: (event: React.FormEvent<HTMLFormElement>) => void;
  signupHandler: (event: React.FormEvent<HTMLFormElement>) => void;
};

export type FormTypeFields = {
  title: string;
  submitText: string;
  footerText: string;
  footerLinkText: string;
  footerLink: string;
  formHandler: (event: React.FormEvent<HTMLFormElement>) => void;
};

export type FormTypeConfig = {
  login: FormTypeFields;
  signup: FormTypeFields;
};
