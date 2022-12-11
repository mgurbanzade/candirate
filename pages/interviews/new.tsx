import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_APPLICATION } from '@gql/queries/applications';
import Calendar from '@components/Calendar/Calendar';

const NewInterviewPage = () => {
  const router = useRouter();
  const { data } = useQuery(GET_APPLICATION, {
    skip: !router.query.a,
    variables: { uuid: router.query.a as string },
  });

  if (!data?.getApplication) return <h1>Application not found</h1>;

  return <Calendar application={data.getApplication} isNewInterview />;
};

export default NewInterviewPage;
