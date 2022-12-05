import { User } from '@gql/types/graphql';
import Link from 'next/link';
import CareerOverview from './CareerOverview';
import PersonalData from './PersonalData';

type Props = {
  profileData: User;
  refetchProfile: () => void;
};

const ProfilePageContainer = ({ profileData, refetchProfile }: Props) => {
  return (
    <div className="py-5">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Profile
          </h1>
        </div>
      </header>
      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        {profileData.type === 'CANDIDATE' && (
          <div className="mt-6 flex space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
            <div className="flex items-start w-full justify-end">
              <Link
                href={`/candidates/${profileData?.candidate?.uuid}`}
                type="button"
                className="ml-3 inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none"
              >
                Go to public profile
              </Link>
            </div>
          </div>
        )}
        <div className="space-y-6 lg:col-span-2 lg:col-start-1">
          {profileData.type === 'CANDIDATE' && (
            <CareerOverview
              profileData={profileData}
              refetchProfile={refetchProfile}
            />
          )}
        </div>
        <div className="space-y-6 lg:col-span-2 lg:col-start-1">
          <PersonalData
            profileData={profileData}
            refetchProfile={refetchProfile}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePageContainer;
