import { useState } from 'react';
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
    <section>
      <div className="bg-white shadow sm:rounded-lg">
        {isEditView ? (
          <EditSection
            profileData={profileData}
            setViewState={setViewState}
            refetchProfile={refetchProfile}
          />
        ) : (
          <ShowSection profileData={profileData} setViewState={setViewState} />
        )}
      </div>
    </section>
  );
}
