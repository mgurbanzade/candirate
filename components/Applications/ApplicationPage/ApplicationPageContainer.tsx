import { Application, Position } from '@gql/types/graphql';
import PositionShowView from '@components/Positions/PositionShowView';
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
        <div className="overflow-hidden bg-white shadow sm:rounded-md mb-6">
          <ApplicationPageHeader />
          <ApplicationStatus application={application} />
        </div>
        <div className="grid grid-cols-2 gap-x-6">
          {upcomingInterview && (
            <UpcomingInterview
              interview={upcomingInterview}
              headerTitle={application.currentStep?.title as string}
            />
          )}
          <PositionShowView
            wrapperClassName="h-full"
            showLink
            position={application.position as Position}
          />
        </div>
      </div>
    </main>
  );
};

export default ApplicationPageContainer;
