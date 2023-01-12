import cx from 'classnames';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  UPDATE_HIRING_STEP,
  DELETE_HIRING_STEP,
} from '@gql/mutations/hiring-steps';
import { CalendarDaysIcon } from '@heroicons/react/20/solid';
import { HiringStep } from '@gql/types/graphql';

type Props = {
  hiringStep: HiringStep;
  isLastItem: boolean;
  refetchPosition: () => void;
};

type HiringStepFormInputs = {
  title: string;
};

const HiringStepItem = ({ hiringStep, isLastItem, refetchPosition }: Props) => {
  const [viewState, setViewState] = useState<'show' | 'edit'>('show');
  const { register, handleSubmit, formState } = useForm<HiringStepFormInputs>();

  const [updateHiringStep] = useMutation(UPDATE_HIRING_STEP);
  const [deleteHiringStep] = useMutation(DELETE_HIRING_STEP);

  const handleDeletion = async () => {
    try {
      const { errors } = await deleteHiringStep({
        variables: {
          id: hiringStep.id as number,
        },
      });

      if (!errors) {
        refetchPosition();
        setViewState('show');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (data: HiringStepFormInputs) => {
    const { title } = data;

    try {
      const res = await updateHiringStep({
        variables: {
          id: hiringStep.id as number,
          updateHiringStepInput: {
            title,
          },
        },
      });

      if (res.data?.updateHiringStep.id) {
        refetchPosition();
        setViewState('show');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li>
      <div
        className={cx('relative', {
          'pb-10': !isLastItem,
        })}
      >
        {!isLastItem ? (
          <span
            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
            aria-hidden="true"
          />
        ) : null}
        <div className="relative flex items-center space-x-3">
          <div>
            <span
              className={cx(
                'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-indigo-500',
              )}
            >
              <CalendarDaysIcon
                className="h-5 w-5 text-white"
                aria-hidden="true"
              />
            </span>
          </div>
          <div className="flex items-center min-w-0 flex-1 justify-between space-x-4">
            {viewState === 'show' ? (
              <p className="text-sm font-medium text-gray-900">
                {hiringStep.title}
              </p>
            ) : (
              <input
                type="text"
                id="title"
                autoComplete="title"
                defaultValue={hiringStep.title || ''}
                className="block w-full border-0 border-b border-transparent border-indigo-500 focus:ring-0 sm:text-sm pl-0"
                autoFocus
                {...register('title', { required: true })}
              />
            )}
            {viewState === 'edit' && (
              <button
                type="button"
                onClick={handleDeletion}
                className={cx(
                  'inline-flex items-center rounded-md border border-transparent bg-red-500 hover:bg-red-700 px-4 py-1.5 text-sm font-medium text-white',
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            )}
            <button
              type="button"
              onClick={
                viewState === 'show'
                  ? () => setViewState('edit')
                  : handleSubmit(handleUpdate)
              }
              className={cx(
                'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none border-transparent',
                {
                  'bg-indigo-500 hover:bg-indigo-700 !text-white':
                    viewState === 'edit',
                },
              )}
            >
              {viewState === 'show' ? 'Edit' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default HiringStepItem;
