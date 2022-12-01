import { User } from '@gql/types/graphql';
import CareerOverview from './CareerOverview';
import PersonalData from './PersonalData';

type Props = {
  profileData: User;
  refetchProfile: () => void;
};

const ProfilePageContainer = ({ profileData, refetchProfile }: Props) => {
  return (
    <div>
      {profileData.type === 'CANDIDATE' && (
        <CareerOverview
          profileData={profileData}
          refetchProfile={refetchProfile}
        />
      )}
      <PersonalData profileData={profileData} refetchProfile={refetchProfile} />
    </div>
  );
};

export default ProfilePageContainer;
