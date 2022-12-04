import { useMutation } from '@apollo/client';
import { User } from '@gql/types/graphql';
import FormErrorText from '@components/Generic/FormErrorText';
import { useForm } from 'react-hook-form';
import { UPDATE_USER_MUTATION } from '@gql/mutations/users';

type Props = {
  profileData: User;
  setViewState: (viewState: 'show' | 'edit') => void;
  refetchProfile: () => void;
};

type UserFormInputs = {
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
};

export default function EditSection({
  profileData,
  setViewState,
  refetchProfile,
}: Props) {
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<UserFormInputs>();

  const onSubmit = async (formData: UserFormInputs) => {
    if (!profileData?.id) {
      throw new Error('User ID is missing');
    }
    if (!isDirty) return setViewState('show');
    try {
      const { errors } = await updateUser({
        variables: {
          id: profileData.id,
          updateUserInput: formData,
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

  return (
    <>
      <div className="flex justify-between items-center px-4 py-5 sm:px-6">
        <h2 className="text-lg font-medium leading-6 text-gray-900">
          Personal data
        </h2>
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:outline-none border-transparent bg-blue-600 text-white hover:bg-blue-700"
        >
          Save
        </button>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">First name*</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <input
                type="text"
                id="firstname"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="ex: Adam"
                defaultValue={profileData?.firstname || ''}
                {...register('firstname', { required: true })}
              />
              <FormErrorText field={errors.firstname} />
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Middle name</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <input
                type="text"
                id="middlename"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="ex: John"
                defaultValue={profileData?.middlename || ''}
                {...register('middlename')}
              />
              <FormErrorText field={errors.middlename} />
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Last name*</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <input
                type="text"
                id="lastname"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="ex: Smith"
                defaultValue={profileData?.lastname || ''}
                {...register('lastname', { required: true })}
              />
              <FormErrorText field={errors.lastname} />
            </dd>
          </div>
        </dl>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 mt-8">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Email adress*</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <input
                type="email"
                id="email"
                className="block w-80 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="ex: adam.smith@gmail.com"
                defaultValue={profileData?.email || ''}
                {...register('email', { required: true })}
              />
              <FormErrorText field={errors.email} />
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}
