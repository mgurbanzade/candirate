import { Dispatch, SetStateAction } from 'react';

type Props = {
  handleNextStep: Dispatch<SetStateAction<number>>;
  handlePrevStep: Dispatch<SetStateAction<number>>;
};

const OnboardingStep3 = ({ handleNextStep, handlePrevStep }: Props) => {
  return (
    <>
      <h1>Step 3</h1>
    </>
  );
};

export default OnboardingStep3;
