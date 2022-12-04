import { useState } from 'react';
import { User } from '@gql/types/graphql';
import ShowSection from './ShowSection';
import EditSection from './EditSection';

type Props = {
  profileData: User;
  refetchProfile: () => void;
};

export default function CareerOverview({ profileData, refetchProfile }: Props) {
  const [viewState, setViewState] = useState<'show' | 'edit'>('show');
  const isEditView = viewState === 'edit';

  if (!profileData) {
    return null;
  }

  return (
    <section aria-labelledby="user-information">
      <div className="bg-white shadow sm:rounded-lg">
        {isEditView ? (
          <EditSection
            profileData={profileData}
            refetchProfile={refetchProfile}
            setViewState={setViewState}
          />
        ) : profileData.candidate ? (
          <ShowSection
            candidate={profileData.candidate}
            setViewState={setViewState}
          />
        ) : null}
      </div>
    </section>
  );
}
