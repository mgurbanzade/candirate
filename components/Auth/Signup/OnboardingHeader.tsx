import cx from 'classnames';

const steps = [
  {
    id: 1,
    title: 'Account type',
  },
  {
    id: 2,
    title: 'Personal Info',
  },
  // {
  //   id: 3,
  //   title: 'Confirmation',
  // },
];

type Props = {
  currentStep: number;
};

const OnboardingHeader = ({ currentStep }: Props) => {
  const stepsToRender = steps.map((step) => (
    <li
      key={step.id}
      className={cx('flex items-center', {
        "after:content-[''] after:w-12 after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700":
          step.id < steps.length,
        'text-primary-600 dark:text-primary-500': currentStep > step.id,
      })}
    >
      <div className="flex items-center sm:block after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500">
        <div className="mr-2 sm:mb-2 sm:mx-auto">
          {currentStep > step.id ? (
            <svg
              className="w-4 h-4 mr-2 sm:mb-2 sm:w-6 sm:h-6 sm:mx-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
          ) : (
            step.id
          )}
        </div>
        <span className="hidden sm:inline-flex whitespace-nowrap">
          {step.title}
        </span>
      </div>
    </li>
  ));

  return (
    <>
      <div className="flex items-center justify-center mb-8 space-x-4 lg:hidden">
        <a href="#" className="flex items-center text-2xl font-semibold">
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          />
          <span className="text-gray-900 dark:text-white">Candirate</span>
        </a>
      </div>
      <ol className="flex justify-center items-center mb-6 text-sm font-medium text-center text-gray-500 dark:text-gray-400 lg:mb-12 sm:text-base">
        {stepsToRender}
      </ol>
    </>
  );
};

export default OnboardingHeader;
