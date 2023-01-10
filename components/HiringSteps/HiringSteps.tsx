import { useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { HiringStep } from '@gql/types/graphql';
import HiringStepItem from './HiringStepItem';
import NewHiringStep from './NewHiringStep';

type Props = {
  steps: HiringStep[];
  positionId: number;
  refetchPosition: () => void;
};

export default function HiringSteps({
  steps,
  positionId,
  refetchPosition,
}: Props) {
  const [isNewVisible, setIsNewVisible] = useState(false);
  if (!steps?.length) return null;

  return (
    <section aria-labelledby="hiring-steps">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="flex justify-between items-center px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Hiring steps
          </h2>
          <button
            type="button"
            onClick={() => setIsNewVisible(true)}
            className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none border-transparent"
          >
            Add
            <PlusCircleIcon
              className="h-6 w-6 text-gray-400 ml-2"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="flow-root px-6 py-6 border-t border-gray-200">
          <ul role="list">
            {steps.map((step, stepIdx) => (
              <HiringStepItem
                key={step.id}
                hiringStep={step}
                refetchPosition={refetchPosition}
                isLastItem={stepIdx === steps.length - 1}
              />
            ))}
            {isNewVisible && (
              <NewHiringStep
                setIsNewVisible={setIsNewVisible}
                refetchPosition={refetchPosition}
                positionId={positionId}
              />
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
