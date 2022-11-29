import { User } from '@gql/types/graphql';

type Props = {
  profileData: User;
  setViewState: (viewState: 'show' | 'edit') => void;
};

export default function ShowSection({ profileData, setViewState }: Props) {
  return (
    <>
      <div className="flex justify-between items-center px-4 py-5 sm:px-6">
        <h2
          id="applicant-information-title"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          Personal data
        </h2>
        <button
          type="button"
          onClick={() => setViewState('edit')}
          className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none border-transparent"
        >
          Edit
        </button>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
          <div className="sm:col-span-1 w-full">
            <dt className="text-sm font-medium text-gray-500">First name</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {profileData.firstname || 'none'}
            </dd>
          </div>
          <div className="sm:col-span-1 w-full">
            <dt className="text-sm font-medium text-gray-500">Middle name</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {profileData.middlename || 'none'}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Last name</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {profileData.lastname || 'none'}
            </dd>
          </div>
        </dl>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 mt-8">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 text-sm text-gray-900">{profileData.email}</dd>
          </div>
        </dl>
      </div>
    </>
  );
}
