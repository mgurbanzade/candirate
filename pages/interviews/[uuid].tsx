import { useRouter } from 'next/router';
import { GET_INTERVIEW } from '@gql/queries/interviews';
import { useQuery } from '@apollo/client';
import Page from '@components/Interviews/InterviewPageContainer';

const InterviewPage = () => {
  const router = useRouter();
  const { data, refetch } = useQuery(GET_INTERVIEW, {
    skip: !router.query.uuid,
    variables: {
      uuid: router.query.uuid as string,
    },
  });

  const interview = data?.getInterview;

  return (
    interview?.id && (
      <Page interviewData={interview} refetchInterview={refetch} />
    )
  );
};

export default InterviewPage;
