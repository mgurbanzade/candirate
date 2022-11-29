import { useState } from 'react';
import cx from 'classnames';
import { User } from '@gql/types/graphql';
import ShowSection from './ShowSection';
import EditSection from './EditSection';

type Props = {
  profileData: User;
  refetchProfile: () => void;
};

export default function PersonalData({ profileData, refetchProfile }: Props) {
  const [viewState, setViewState] = useState<'show' | 'edit'>('show');
  const isEditView = viewState === 'edit';

  return (
    <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2 lg:col-start-1">
        <section aria-labelledby="user-information">
          <div className="bg-white shadow sm:rounded-lg">
            {isEditView ? (
              <EditSection
                profileData={profileData}
                setViewState={setViewState}
                refetchProfile={refetchProfile}
              />
            ) : (
              <ShowSection
                profileData={profileData}
                setViewState={setViewState}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
