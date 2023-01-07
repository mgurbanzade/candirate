import ApplicationsPageContainer from '@components/Applications';

import useSession from '@hooks/useSession';
import { useQuery } from '@apollo/client';
import { GET_APPLICATIONS } from '@gql/queries/applications';
import { Application } from '@gql/types/graphql';

const ApplicationsPage = () => {
  const { currentUser } = useSession();
  const { data, error } = useQuery(GET_APPLICATIONS, {
    variables: {
      candidateId: currentUser?.candidateId as number,
    },
  });

  if (error) return null;

  return (
    <ApplicationsPageContainer
      applications={data?.getApplications as Application[]}
    />
  );
};

export default ApplicationsPage;
