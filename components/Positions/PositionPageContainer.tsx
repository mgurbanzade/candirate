import cx from 'classnames';
import { useState } from 'react';
import { useMutation, ApolloQueryResult } from '@apollo/client';
import { Position, GetPositionQuery } from '@gql/types/graphql';
import {
  UPDATE_POSITION_MUTATION,
  PUBLISH_POSITION_MUTATION,
} from '@gql/mutations/positions';
import { useForm, SubmitHandler } from 'react-hook-form';
import PositionShowView from '@components/Positions/PositionShowView';
import PositionEditView from '@components/Positions/PositionEditView';
import useNotification from '@hooks/useNotification';

type PositionPageProps = {
  position: Position;
  refetchPosition: (
    variables?:
      | Partial<{
          id: number;
        }>
      | undefined,
  ) => Promise<ApolloQueryResult<GetPositionQuery>>;
};

type PositionFormInputs = {
  title: string;
  description: string;
  salaryRate: number;
  salaryRateType: 'HOURLY' | 'MONTHLY' | 'YEARLY';
  companyId: number;
  type: 'FULLTIME' | 'PARTTIME';
};

const PositionPage = ({ position, refetchPosition }: PositionPageProps) => {
  const [publishError, setPublishError] = useState<string | null>(null);
  const [viewState, setViewState] = useState<'show' | 'edit'>('show');
  const { setNotification } = useNotification();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty },
  } = useForm<PositionFormInputs>();
  const [updatePosition] = useMutation(UPDATE_POSITION_MUTATION);
  const [publishPosition] = useMutation(PUBLISH_POSITION_MUTATION);

  const handleUpdate = async (position: Position, data: PositionFormInputs) => {
    if (!position.id) return;
    if (!isDirty) {
      setViewState('show');
      return;
    }
    const res = await updatePosition({
      variables: {
        id: position.id,
        updatePositionInput: {
          ...data,
        },
      },
    });

    if (res.data?.updatePosition) {
      setViewState('show');
      setPublishError(null);
      refetchPosition();
    }
  };

  const handlePublish = async (position: Position) => {
    if (!position.id || position.isPublished) return;
    try {
      const res = await publishPosition({
        variables: {
          id: position.id,
        },
      });

      if (res.data?.publishPosition) {
        setViewState('show');
        refetchPosition();
        setNotification({
          type: 'success',
          title: 'Sucess!',
          description: 'Position published successfully',
          isVisible: true,
        });
      }
    } catch (e: any) {
      if (e.message) {
        setPublishError(e.message);
        setViewState('edit');
      }
    }
  };

  const isEditView = viewState === 'edit';
  const onSubmit: SubmitHandler<PositionFormInputs> = async (data) => {
    return isEditView ? handleUpdate(position, data) : handlePublish(position);
  };

  return (
    <main className="py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
        <div className="flex items-center space-x-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {position.title}
            </h1>
            <p className="text-sm font-medium text-gray-500">
              Add missing details before publishing
            </p>
            {publishError && (
              <div className="text-red-500 mt-1 text-sm">{publishError}</div>
            )}
          </div>
        </div>
        <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
          {position.isPublished ? (
            <button
              type="button"
              onClick={
                isEditView ? handleSubmit(onSubmit) : () => setViewState('edit')
              }
              className={cx(
                'inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100',
                {
                  'border-gray-300 bg-white text-gray-700 hover:bg-gray-50':
                    !isEditView,
                  'border-transparent bg-blue-600 text-white hover:bg-blue-700':
                    isEditView,
                },
              )}
            >
              {isEditView ? 'Save' : 'Edit'}
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setViewState(isEditView ? 'show' : 'edit')}
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              >
                {isEditView ? 'Cancel' : 'Edit'}
              </button>
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              >
                {isEditView ? 'Save' : 'Publish'}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2 lg:col-start-1">
          {isEditView ? (
            <PositionEditView
              position={position}
              control={control}
              register={register}
              errors={errors}
              setValue={setValue}
            />
          ) : (
            <PositionShowView position={position} />
          )}
        </div>
      </div>
    </main>
  );
};

export default PositionPage;
