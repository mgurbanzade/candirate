import { Application } from '@gql/types/graphql';
import InterviewDetails from '@components/Interviews/InterviewDetails/InterviewDetails';
import ApplicationStatus from './ApplicationStatus';
import ApplicationPageHeader from './ApplicationPageHeader';
import UpcomingInterview from './UpcomingInterview';

type Props = {
  application: Application;
  refetchApplication: () => void;
};

const ApplicationPageContainer = ({ application }: Props) => {
  const upcomingInterview = application.currentStep?.interview;
  return (
    <main className="px-6 py-6">
      <div className="h-96 rounded-lg">
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <ApplicationPageHeader />
          <ApplicationStatus application={application} />
        </div>
        {upcomingInterview && (
          <UpcomingInterview
            interview={upcomingInterview}
            headerTitle={application.currentStep?.title as string}
          />
        )}
      </div>
    </main>
  );
};

export default ApplicationPageContainer;
