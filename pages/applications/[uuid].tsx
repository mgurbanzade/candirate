import Page from '@components/Applications/ApplicationPageContainer';

import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_APPLICATION } from '@gql/queries/applications';

const ApplicationPage = () => {
  const router = useRouter();
  const { data, refetch } = useQuery(GET_APPLICATION, {
    skip: !router.query.uuid,
    variables: {
      uuid: router.query.uuid as string,
    },
  });

  const application = data?.getApplication;

  return (
    application?.uuid && (
      <Page application={application} refetchApplication={refetch} />
    )
  );
};

export default ApplicationPage;
