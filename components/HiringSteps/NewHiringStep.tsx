import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { CalendarDaysIcon } from '@heroicons/react/20/solid';
import { CREATE_HIRING_STEP } from '@gql/mutations/hiring-steps';
import { HiringStep, Position } from '@gql/types/graphql';

type Props = {
  refetchPosition: () => void;
  setIsNewVisible: (value: boolean) => void;
  steps: HiringStep[];
  position: Position;
};

type HiringStepFormInputs = {
  title: string;
};

const NewHiringStep = ({
  steps,
  refetchPosition,
  setIsNewVisible,
  position,
}: Props) => {
  const [createHiringStep] = useMutation(CREATE_HIRING_STEP);
  const { register, handleSubmit } = useForm<HiringStepFormInputs>();

  const handleCreate = async (data: HiringStepFormInputs) => {
    const { title } = data;

    try {
      const res = await createHiringStep({
        variables: {
          positionId: position.id as number,
          createHiringStepInput: {
            title,
            order: steps.length + 1,
          },
        },
      });

      if (res.data?.createHiringStep.id) {
        refetchPosition();
        setIsNewVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li>
      <div className="relative pt-10">
        <div className="relative flex items-center space-x-3">
          <div>
            <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-yellow-500">
              <CalendarDaysIcon
                className="h-5 w-5 text-white"
                aria-hidden="true"
              />
            </span>
          </div>
          <div className="flex items-center min-w-0 flex-1 justify-between space-x-4">
            <input
              type="text"
              id="title"
              autoComplete="title"
              defaultValue="New hiring step"
              className="block w-full border-0 border-b border-transparent border-indigo-500 focus:ring-0 sm:text-sm pl-0"
              autoFocus
              {...register('title', { required: true })}
            />
            <button
              type="button"
              onClick={handleSubmit(handleCreate)}
              className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-green-500 hover:bg-green-700 text-white focus:outline-none border-transparent"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default NewHiringStep;
