import { Dispatch, SetStateAction } from 'react';
import { UserIcon } from '@heroicons/react/20/solid';
import { BriefcaseIcon } from '@heroicons/react/24/solid';
import cx from 'classnames';

type Props = {
  handleNextStep: Dispatch<SetStateAction<number>>;
  accountType: 'CANDIDATE' | 'RECRUITER';
  selectAccountType: Dispatch<SetStateAction<'CANDIDATE' | 'RECRUITER'>>;
};

const ArrowRight = () => (
  <svg
    className="w-6 h-6 ml-3"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const OnboardingStep1 = ({
  handleNextStep,
  selectAccountType,
  accountType,
}: Props) => {
  return (
    <>
      <h1 className="mb-4 text-2xl font-extrabold leading-tight tracking-tight text-gray-900 sm:mb-6 dark:text-white">
        How do you want to use Candirate?
      </h1>
      <ul className="mb-6 space-y-4 sm:space-y-6">
        <li>
          <button
            onClick={() => selectAccountType('RECRUITER')}
            type="button"
            className={cx(
              'inline-flex items-center justify-center w-full p-5 text-gray-500 border-2 border-gray-200 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100',
              {
                'border-primary-600 text-primary-600':
                  accountType === 'RECRUITER',
              },
            )}
          >
            <BriefcaseIcon className="w-6 h-6 mr-3" />
            <span className="w-full">I'm hiring</span>
            <ArrowRight />
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => selectAccountType('CANDIDATE')}
            className={cx(
              'inline-flex items-center justify-center w-full p-5 text-gray-500 border-2 border-gray-200 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100',
              {
                'border-primary-600 text-primary-600':
                  accountType === 'CANDIDATE',
              },
            )}
          >
            <UserIcon className="w-6 h-6 mr-3" />
            <span className="w-full">I'm looking for a job</span>
            <ArrowRight />
          </button>
        </li>
      </ul>
      <button
        onClick={() => handleNextStep((prev) => prev + 1)}
        disabled={!accountType}
        className="w-full px-5 py-2.5 sm:py-3.5 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </>
  );
};

export default OnboardingStep1;
