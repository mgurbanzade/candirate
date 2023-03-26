import { useState, Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import OnboardingHeader from './OnboardingHeader';
import OnboardingSidebar from './OnboardingSidebar';
import OnboardingStep1 from './OnboardingStep1';
import OnboardingStep2 from './OnboardingStep2';
import OnboardingStep3 from './OnboardingStep3';
import { useRouter } from 'next/router';
import { Logo } from '@components/LandingPage/Logo';

type StepIncrement = Dispatch<SetStateAction<number>>;
type AccountType = 'CANDIDATE' | 'RECRUITER';
type SelectAccountType = Dispatch<SetStateAction<AccountType>>;

const stepsDispatcher = {
  1: (
    handleNextStep: StepIncrement,
    selectAccountType: SelectAccountType,
    accountType: AccountType,
  ) => (
    <OnboardingStep1
      accountType={accountType}
      handleNextStep={handleNextStep}
      selectAccountType={selectAccountType}
    />
  ),
  2: (
    handleNextStep: StepIncrement,
    handlePrevStep: StepIncrement,
    accountType: AccountType,
  ) => (
    <OnboardingStep2
      handleNextStep={handleNextStep}
      handlePrevStep={handlePrevStep}
      accountType={accountType}
    />
  ),
  3: (handleNextStep: StepIncrement, handlePrevStep: StepIncrement) => (
    <OnboardingStep3
      handleNextStep={handleNextStep}
      handlePrevStep={handlePrevStep}
    />
  ),
};

const Onboarding = () => {
  const router = useRouter();
  const { type } = router.query;
  const isTypeDefined = type === 'r' || type === 'c';
  const [currentStep, setCurrentStep] = useState(isTypeDefined ? 2 : 1);
  const [accountType, setAccountType] = useState<
    'CANDIDATE' | 'RECRUITER' | null
  >(type === 'r' ? 'RECRUITER' : type === 'c' ? 'CANDIDATE' : null);
  const stepForm = (stepsDispatcher as any)[currentStep](
    setCurrentStep,
    setAccountType,
    accountType,
  );

  return (
    <section className="py-8 bg-white dark:bg-gray-900 lg:py-0">
      <div className="lg:flex">
        <div className="hidden w-full max-w-md py-10 px-12 lg:h-screen lg:flex flex-col justify-between bg-primary-600">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex text-2xl font-semibold text-white">
              <Logo color="white" width={280} height={70} />
            </Link>
          </div>
          <OnboardingSidebar />
          <div />
        </div>
        <div className="flex items-center mx-auto md:w-[42rem] px-4 md:px-8 xl:px-0">
          <div className="w-full">
            <OnboardingHeader currentStep={currentStep} />
            {stepForm}
            <p className="mt-4 text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Login here
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Onboarding;
