import ProfilePageContainer from '@components/Profile';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '@gql/queries/users';

const ProfilePage = () => {
  const { data, refetch } = useQuery(GET_USER_PROFILE);

  if (!data?.getUserProfile) return null;

  return (
    <ProfilePageContainer
      profileData={data?.getUserProfile}
      refetchProfile={refetch}
    />
  );
};

export default ProfilePage;
