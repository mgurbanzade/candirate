import { Position } from '@gql/types/graphql';
import { Control, UseFormRegister, FieldErrors } from 'react-hook-form';

import Select from '@components/Generic/Select';
import FormErrorText from '@components/Generic/FormErrorText';

type PositionFormInputs = {
  title: string;
  description: string;
  salaryRate: string;
  salaryRateType: string;
  companyId: number;
  type: 'FULLTIME' | 'PARTTIME';
};

type PositionEditViewProps = {
  position: Position;
  control: Control<PositionFormInputs, any>;
  register: UseFormRegister<PositionFormInputs>;
  errors: FieldErrors<PositionFormInputs>;
};

const salaryRateOptions = [
  { id: 'hourly', name: 'Hourly' },
  { id: 'monthly', name: 'Monthly' },
  { id: 'yearly', name: 'Yearly' },
];

const employmentTypeOptions = [
  { id: 'fulltime', name: 'Full time' },
  { id: 'parttime', name: 'Part time' },
];

const PositionEditView = ({
  position,
  register,
  control,
  errors,
}: PositionEditViewProps) => {
  return (
    <section aria-labelledby="applicant-information-title">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2
            id="applicant-information-title"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Position details
          </h2>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Title</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <input
                  type="text"
                  id="title"
                  className="block w-80 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="ex: Senior Software Engineer"
                  defaultValue={position.title as string}
                  {...register('title', { required: true })}
                />
                <FormErrorText field={errors.title} />
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Company</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <input
                  type="text"
                  id="companyId"
                  className="block w-80 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="ex: Amazon"
                  {...register('companyId', { required: true })}
                />
                <FormErrorText field={errors.companyId} />
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Salary rate</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <div className="flex align-center justify-between w-80">
                  <input
                    id="salaryRate"
                    type="number"
                    min={0}
                    defaultValue={position.salaryRate as number}
                    className="block w-2/5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="ex: 3000"
                    {...register('salaryRate', {
                      required: true,
                      min: 1,
                    })}
                  />
                  <Select
                    fieldName="salaryRateType"
                    options={salaryRateOptions}
                    control={control}
                    wrapperClassnames="w-40"
                    dropdownClassnames="w-40"
                  />
                </div>
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Employment type
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                <Select
                  fieldName="type"
                  options={employmentTypeOptions}
                  control={control}
                  wrapperClassnames="w-80"
                  dropdownClassnames="w-80"
                />
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <textarea
                  rows={6}
                  id="description"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  defaultValue={position.description as string}
                  {...register('description', {
                    required: true,
                  })}
                />
                <FormErrorText field={errors.description} />
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default PositionEditView;
