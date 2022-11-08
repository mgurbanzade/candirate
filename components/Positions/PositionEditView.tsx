import debounce from 'lodash.debounce';
import { useRef, useState } from 'react';
import { Position } from '@gql/types/graphql';
import { useAuth } from '@hooks/useAuth';
import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
} from 'react-hook-form';

import Select from '@components/Generic/Select';
import FormErrorText from '@components/Generic/FormErrorText';
import InputAutocomplete from '@components/Generic/InputAutocomplete';

import { SEARCH_COMPANIES } from '@gql/queries/companies';

type PositionFormInputs = {
  title: string;
  description: string;
  salaryRate: number;
  salaryRateType: 'HOURLY' | 'MONTHLY' | 'YEARLY';
  companyId: number;
  type: 'FULLTIME' | 'PARTTIME';
};

type PositionEditViewProps = {
  position: Position;
  control: Control<PositionFormInputs, any>;
  register: UseFormRegister<PositionFormInputs>;
  errors: FieldErrors<PositionFormInputs>;
  setValue: UseFormSetValue<PositionFormInputs>;
};

const salaryRateOptions = [
  { id: 'HOURLY', name: 'Hourly' },
  { id: 'MONTHLY', name: 'Monthly' },
  { id: 'YEARLY', name: 'Yearly' },
];

const employmentTypeOptions = [
  { id: 'FULLTIME', name: 'Full time' },
  { id: 'PARTTIME', name: 'Part time' },
];

const PositionEditView = ({
  position,
  register,
  control,
  errors,
}: PositionEditViewProps) => {
  const [companies, setCompanies] = useState([]);
  const auth = useAuth();

  const debouncedSearch = useRef(
    debounce(async (search: string) => {
      if (!auth?.createApolloClient || !search.length) {
        return setCompanies([]);
      }

      const client = auth.createApolloClient();

      const result = await client.query({
        query: SEARCH_COMPANIES as any,
        variables: {
          query: search,
        },
      });

      if (result.data.searchCompanies) {
        setCompanies(result.data.searchCompanies);
      }
    }, 300),
  ).current;

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
                <InputAutocomplete
                  fieldName="companyId"
                  control={control}
                  options={companies}
                  onSearchHandler={debouncedSearch}
                  dropdownClassnames="w-80"
                  defaultValue={position?.company?.name || ''}
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
                    min={1}
                    defaultValue={position.salaryRate || 10}
                    className="block w-2/5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="ex: 30"
                    {...register('salaryRate', {
                      valueAsNumber: true,
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
