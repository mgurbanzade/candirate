import { useState } from 'react';
import { Position } from '@gql/types/graphql';
import { useForm } from 'react-hook-form';
import PositionShowView from '@components/Positions/PositionShowView';
import PositionEditView from '@components/Positions/PositionEditView';

type PositionPageProps = {
  position: Position;
};

type PositionFormInputs = {
  title: string;
  description: string;
  salaryRate: string;
  salaryRateType: string;
  companyId: number;
  type: 'FULLTIME' | 'PARTTIME';
};

const PositionPage = ({ position }: PositionPageProps) => {
  const [viewState, setViewState] = useState<'show' | 'edit'>('show');
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PositionFormInputs>();

  const isEditView = viewState === 'edit';
  const onSubmit = (data: PositionFormInputs) => console.log(data);

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
          </div>
        </div>
        <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
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
