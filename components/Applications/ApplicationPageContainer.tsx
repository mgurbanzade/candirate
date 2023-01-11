import InterviewDetails from '@components/Interviews/InterviewDetails/InterviewDetails';
import { Application } from '@gql/types/graphql';
import ApplicationPageHeader from './ApplicationPageHeader';
import ApplicationStatus from './ApplicationStatus';

type Props = {
  application: Application;
  refetchApplication: () => void;
};

const ApplicationPageContainer = ({ application }: Props) => {
  return (
    <main className="px-6 py-6">
      <div className="h-96 rounded-lg">
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <ApplicationPageHeader />
          <ApplicationStatus application={application} />
        </div>
        {application.interview && (
          <div className="my-6">
            <InterviewDetails
              headerTitle="Upcoming interview details"
              interviewData={application.interview}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default ApplicationPageContainer;
