import React from 'react';
import Link from 'next/link';
import Select from '@components/Generic/Select';
import useNotification from '@hooks/useNotification';
import useSession from '@hooks/useSession';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth, AuthContextType } from '@hooks/useAuth';
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION } from '@gql/mutations/auth';
import { rootPath, loginPath } from '@lib/routes';
import { AuthFormProps, AuthFormInputs, SignupInputs } from './types';
import { getFormTypeConfig } from './helpers';

import scss from './AuthForm.module.scss';

const signupOptions = [
  { id: 'RECRUITER', name: 'Recruiter' },
  { id: 'CANDIDATE', name: 'Candidate' },
];

const AuthForm = ({ type }: AuthFormProps) => {
  const { currentUser } = useSession();
  const router = useRouter();
  const { setNotification } = useNotification();
  const { loginAction } = useAuth() as AuthContextType;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuthFormInputs>();

  const [signupAction] = useMutation(SIGNUP_MUTATION);

  if (!!currentUser) router.push(rootPath());

  const signupHandler = async (data: AuthFormInputs) => {
    const { passwordConfirmation, ...signupInput } = data as SignupInputs; // eslint-disable-line @typescript-eslint/no-unused-vars
    const res = await signupAction({
      variables: {
        signupUserInput: {
          ...signupInput,
        },
      },
    });

    const firstname = res.data?.signup.user.firstname;

    if (firstname) {
      router.push(loginPath());
      setNotification({
        isVisible: true,
        type: 'success',
        title: `Welcome, ${firstname}!`,
        description: 'Please sign in to continue.',
      });
    }
  };

  const {
    title,
    submitText,
    footerText,
    footerLinkText,
    footerLink,
    formHandler,
  } = getFormTypeConfig({
    loginHandler: loginAction,
    signupHandler,
  })[type];

  const onSubmit: SubmitHandler<AuthFormInputs> = (data) => {
    formHandler(data);
  };

  return currentUser ? null : (
    <section className={scss.formRoot}>
      <div className="flex min-h-full justify-center">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                {title}
              </h2>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form
                  action="#"
                  method="POST"
                  className="space-y-6"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {type === 'signup' && (
                    <div className="space-y-2">
                      <Select
                        fieldName="type"
                        options={signupOptions}
                        label="Sign up as"
                        control={control}
                      />
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        required
                        {...register('email', { required: true })}
                      />
                      {errors.email && (
                        <div className="text-red-500 mt-1 text-sm">
                          This field is required
                        </div>
                      )}
                    </div>
                  </div>
                  {type === 'signup' && (
                    <div className="space-y-1">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <div className="mt-1">
                        <input
                          id="firstname"
                          type="text"
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          required
                          {...register('firstname', { required: true })}
                        />
                        {(errors as any).firstname && (
                          <div className="text-red-500 mt-1 text-sm">
                            This field is required
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        required
                        {...register('password', { required: true })}
                      />
                      {errors.password && (
                        <div className="text-red-500 mt-1 text-sm">
                          This field is required
                        </div>
                      )}
                    </div>
                  </div>
                  {type === 'signup' && (
                    <div className="space-y-1">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm your password
                      </label>
                      <div className="mt-1">
                        <input
                          id="password-confirm"
                          type="password"
                          autoComplete="current-password"
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          required
                          {...register('passwordConfirmation', {
                            required: true,
                          })}
                        />
                        {(errors as any).passwordConfirmation && (
                          <div className="text-red-500 mt-1 text-sm">
                            This field is required
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {type === 'login' && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor="remember-me"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="text-sm">
                        <a
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Forgot your password?
                        </a>
                      </div>
                    </div>
                  )}

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      {submitText}
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <p className="text-sm">{footerText}</p>
                    <div className="text-sm">
                      <Link
                        href={footerLink}
                        className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                      >
                        {footerLinkText}
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
