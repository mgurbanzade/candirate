import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { User } from '@gql/types/graphql';
import Select from '@components/Generic/Select';
import FormErrorText from '@components/Generic/FormErrorText';
import { UPDATE_CANDIDATE_MUTATION } from '@gql/mutations/candidates';
import SkillsEditor from './SkillsEditor';

type Props = {
  profileData: User;
  setViewState: (viewState: 'show' | 'edit') => void;
  refetchProfile: () => void;
};

type CandidateFormInputs = {
  about: string;
  salaryExpectation: number;
  positionTitle: string;
  yearsOfExperience: number;
  salaryRateType: 'HOURLY' | 'MONTHLY' | 'YEARLY';
};

const salaryRateOptions = [
  { id: 'HOURLY', name: 'Hourly' },
  { id: 'MONTHLY', name: 'Monthly' },
  { id: 'YEARLY', name: 'Yearly' },
];

export default function EditSection({
  profileData,
  setViewState,
  refetchProfile,
}: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<CandidateFormInputs>();

  const [updateCandidate] = useMutation(UPDATE_CANDIDATE_MUTATION);
  const onSubmit = async (formData: CandidateFormInputs) => {
    if (!profileData?.candidateId) {
      throw new Error('Candidate ID is missing');
    }
    if (!isDirty) return setViewState('show');
    try {
      const { errors } = await updateCandidate({
        variables: {
          candidateId: profileData.candidateId,
          updateCandidateInput: formData,
        },
      });

      if (!errors?.length) {
        refetchProfile();
        setViewState('show');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const defaultSelectedSalaryRate = {
    id:
      salaryRateOptions.find(
        (el) => el.id === profileData?.candidate?.salaryRateType,
      )?.id || 'HOURLY',
    name:
      salaryRateOptions.find(
        (el) => el.id === profileData?.candidate?.salaryRateType,
      )?.name || 'Hourly',
  };

  return (
    <>
      <div className="flex justify-between items-center px-4 py-5 sm:px-6">
        <h2 className="text-lg font-medium leading-6 text-gray-900">
          Career overview
        </h2>
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-gray-50 focus:outline-none border-transparent bg-blue-600 hover:bg-blue-700"
        >
          Save
        </button>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Position title*
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              <input
                type="text"
                id="positionTitle"
                className="block w-80 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="ex: Senior Software Engineer"
                defaultValue={profileData?.candidate?.positionTitle || ''}
                {...register('positionTitle', { required: true })}
              />
              <FormErrorText field={errors.positionTitle} />
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Years of experience*
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              <div className="w-2/5">
                <input
                  id="yearsOfExperience"
                  type="number"
                  min={1}
                  defaultValue={profileData?.candidate?.yearsOfExperience || 1}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="ex: 30"
                  {...register('yearsOfExperience', {
                    valueAsNumber: true,
                    required: true,
                    min: 1,
                  })}
                />
                <FormErrorText field={errors.yearsOfExperience} />
              </div>
            </dd>
          </div>
        </dl>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 mt-8">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Salary expectation*
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              <div className="flex align-center justify-between w-80">
                <div className="w-2/5">
                  <input
                    id="salaryExpectation"
                    type="number"
                    min={0}
                    defaultValue={
                      profileData?.candidate?.salaryExpectation || 0
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="ex: 30"
                    {...register('salaryExpectation', {
                      valueAsNumber: true,
                      required: true,
                      min: 1,
                    })}
                  />
                  <FormErrorText field={errors.salaryExpectation} />
                </div>
                <Select
                  fieldName="salaryRateType"
                  options={salaryRateOptions}
                  control={control}
                  defaultSelected={defaultSelectedSalaryRate}
                  wrapperClassnames="w-40"
                  dropdownClassnames="w-40"
                />
              </div>
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Skills</dt>
            <dd
              className="mt-1 text-sm text-gray-900 rounded-md border border-gray-300 p-2"
              style={{ minHeight: 40 }}
            >
              <SkillsEditor
                skills={profileData.candidate?.skills}
                candidateId={profileData.candidateId}
                refetchProfile={refetchProfile}
              />
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">About me</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <textarea
                rows={6}
                id="description"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                defaultValue={profileData.candidate?.about as string}
                {...register('about')}
              />
              <FormErrorText field={errors.about} />
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}
