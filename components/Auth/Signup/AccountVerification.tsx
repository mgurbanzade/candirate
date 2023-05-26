import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  VERIFY_ACCOUNT_MUTATION,
  RESEND_VERIFICATION_LINK_MUTATION,
} from '@gql/mutations/email';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const AccountVerification = () => {
  const [isExpired, setIsExpired] = useState(false);
  const router = useRouter();
  const { token, email } = router.query;
  const [verifyAccount] = useMutation(VERIFY_ACCOUNT_MUTATION);
  const [resendVerificationLink] = useMutation(
    RESEND_VERIFICATION_LINK_MUTATION,
  );

  const handleVerifyAccount = async () => {
    try {
      const { data } = await verifyAccount({
        variables: {
          token: token as string,
        },
      });
      if (data?.verifyAccount.success) {
        toast.success('Account verified successfully');
        router.push('/login');
      }
    } catch (error) {
      const err = error as any;

      if (err.message === 'Confirmation token is expired') {
        setIsExpired(true);
      } else if (err.message === 'Email already confirmed') {
        toast.error('Your account is already verified');
        router.push('/login');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    }
  };

  const handleResend = async () => {
    try {
      const { data } = await resendVerificationLink({
        variables: {
          email: email as string,
        },
      });
      if (data?.resendVerificationLink.success) {
        toast.success('Verification link sent successfully');
      }
    } catch (error) {
      const err = error as any;

      if (err.message === 'Email already confirmed') {
        toast.error('Your account is already verified');
        router.push('/login');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="bg-white">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8 h-screen">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {isExpired ? 'This link is expired' : 'Verify your account'}
          </h2>
          {isExpired ? (
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Get a new one to your email.
            </p>
          ) : (
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              This link will expire in 24 hours.
              <br />
              Make sure to verify your account before the expiration time.
            </p>
          )}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              type="button"
              onClick={isExpired ? handleResend : handleVerifyAccount}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isExpired ? 'Resend verification link' : 'Verify account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountVerification;
