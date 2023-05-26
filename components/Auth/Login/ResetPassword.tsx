import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD_MUTATION } from '@gql/mutations/users';
import { SEND_PASSWORD_RESET_LINK_MUTATION } from '@gql/mutations/email';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [resetPassword] = useMutation(RESET_PASSWORD_MUTATION);
  const [sendPasswordResetLink] = useMutation(
    SEND_PASSWORD_RESET_LINK_MUTATION,
  );
  const { token, email: queryEmail } = router.query;
  const isNewPasswordState = token?.length && queryEmail?.length;

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage('Please enter your email address');
      return;
    }

    try {
      const { data } = await sendPasswordResetLink({
        variables: {
          email: email,
        },
      });

      if (data?.sendPasswordResetLink?.success) {
        setErrorMessage('');
        setEmail('');
        toast.success('Success! Check your email for a reset link');
      }
    } catch (e) {
      const err = e as Error;

      if (err.message === 'User not found') {
        setErrorMessage('User not found');
      } else if (err.message === 'Password reset link already sent') {
        setErrorMessage('Password reset link already sent. Check your email');
        setEmail('');
      } else {
        setErrorMessage('Something went wrong. Please try again later.');
      }
    }
  };

  const updatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const { data } = await resetPassword({
        variables: {
          resetPasswordInput: {
            token: token as string,
            email: queryEmail as string,
            password,
          },
        },
      });

      if (data?.resetPassword?.email) {
        toast.success('Success! Your password has been reset');
        router.push('/login');
      }
    } catch (e) {
      toast.error('Something went wrong. Please try again later.');
    }
  };

  const handleSubmit = isNewPasswordState
    ? updatePassword
    : handleResetPassword;

  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24 lg:py-32 h-screen">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            <h2 className="inline sm:block">Password recovery</h2>
          </div>
          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            {isNewPasswordState
              ? 'Enter your new password and confirm it.'
              : 'Enter your email address and we will send you a link to reset your password'}
          </p>
          {isNewPasswordState ? (
            <form className="mt-10 max-w-md" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-x-4">
                <label htmlFor="email-address" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mb-5 min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="New password"
                />
                <input
                  id="password-confirm"
                  name="password-confirm"
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                  className="mb-5 min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Re-enter your new password"
                />
                {errorMessage && (
                  <div className="text-red-500 mb-5 text-sm whitespace-nowrap">
                    {errorMessage}
                  </div>
                )}
                <button
                  type="submit"
                  className="mb-3 flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Send
                </button>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-900">
                We care about your data. Read our{' '}
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  privacy&nbsp;policy
                </a>
                .
              </p>
            </form>
          ) : (
            <form className="mt-10 max-w-md" onSubmit={handleSubmit}>
              <div className="flex gap-x-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Send
                </button>
              </div>
              {errorMessage && (
                <div className="text-red-500 my-5 text-sm whitespace-nowrap">
                  {errorMessage}
                </div>
              )}
              <p className="mt-4 text-sm leading-6 text-gray-900">
                We care about your data. Read our{' '}
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  privacy&nbsp;policy
                </a>
                .
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
