import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { loginPath } from '@lib/routes';
import { useRouter } from 'next/router';
import useNotification from '@hooks/useNotification';
import { SIGNUP_MUTATION } from '@gql/mutations/auth';
import { useMutation } from '@apollo/client';

type Props = {
  handleNextStep: Dispatch<SetStateAction<number>>;
  handlePrevStep: Dispatch<SetStateAction<number>>;
  accountType: 'CANDIDATE' | 'RECRUITER';
};

export type SignupInputs = {
  email: string;
  firstname: string;
  password: string;
  passwordConfirmation: string;
};

const OnboardingStep2 = ({ handleNextStep, accountType }: Props) => {
  const [signupAction] = useMutation(SIGNUP_MUTATION);
  const { setNotification } = useNotification();
  const router = useRouter();
  const { type } = router.query;
  const isTypeDefined = type === 'r' || type === 'c';
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupInputs>();
  const signupHandler = async (data: SignupInputs) => {
    if (!data.passwordConfirmation.trim().length) {
      setError('passwordConfirmation', {
        message: 'This field is required',
      });
      return;
    }

    if (data.password !== data.passwordConfirmation) {
      setError('passwordConfirmation', {
        message: 'Passwords do not match',
      });
      return;
    }

    const { passwordConfirmation, ...signupInput } = data as SignupInputs; // eslint-disable-line @typescript-eslint/no-unused-vars
    const res = await signupAction({
      variables: {
        signupUserInput: {
          type: accountType,
          ...signupInput,
        },
      },
    });

    const firstname = res.data?.signup.user.firstname;

    if (firstname) {
      router.push(loginPath());
      // handleNextStep((prev) => prev + 1);
      setNotification({
        isVisible: true,
        type: 'success',
        title: `Welcome, ${firstname}!`,
        description: 'Please sign in to continue.',
      });
    }
  };

  return (
    <>
      <h1 className="mb-4 text-2xl font-extrabold tracking-tight text-gray-900 sm:mb-6 leding-tight dark:text-white">
        Account details
      </h1>
      <form action="#" onSubmit={handleSubmit(signupHandler)}>
        <div className="grid gap-5 my-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="full-name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First name
            </label>
            <input
              type="text"
              id="firstname"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Eddie"
              required
              {...register('firstname', { required: true })}
            />
            {(errors as any).firstname && (
              <div className="text-red-500 mt-1 text-sm">
                This field is required
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              {...register('email', { required: true })}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required
              {...register('password', { required: true })}
            />
            {errors.password && (
              <div className="text-red-500 mt-1 text-sm">
                This field is required
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required
              {...register('passwordConfirmation', {
                required: true,
              })}
            />
            {(errors as any).passwordConfirmation && (
              <div className="text-red-500 mt-1 text-sm">
                {errors.passwordConfirmation?.message}
              </div>
            )}
          </div>
        </div>
        <div className="mb-6 space-y-3">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                aria-describedby="terms"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="terms"
                className="font-light text-gray-500 dark:text-gray-300"
              >
                By signing up, you are creating a Candirate account, and you
                agree to Candirate's{' '}
                <a
                  className="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                  href="#"
                >
                  Terms of Use
                </a>{' '}
                and{' '}
                <a
                  className="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                  href="#"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="newsletter"
                aria-describedby="newsletter"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="newsletter"
                className="font-light text-gray-500 dark:text-gray-300"
              >
                Email me about product updates and resources.
              </label>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          {!isTypeDefined && (
            <button
              onClick={() => handleNextStep((prev) => prev - 1)}
              className="text-center items-center w-full py-2.5 sm:py-3.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Prev
            </button>
          )}
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 sm:py-3.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
};

export default OnboardingStep2;
