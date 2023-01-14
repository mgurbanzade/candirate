import cx from 'classnames';
import { Application, Position } from '@gql/types/graphql';
import PositionShowView from '@components/Positions/PositionShowView';
import CareerOverview from '@components/Candidates/CareerOverview';
import ApplicationStatus from './ApplicationStatus';
import ApplicationPageHeader from './ApplicationPageHeader';
import UpcomingInterview from './UpcomingInterview';
import useSession from '@hooks/useSession';

type Props = {
  application: Application;
  refetchApplication: () => void;
};

const ApplicationPageContainer = ({
  application,
  refetchApplication,
}: Props) => {
  const { currentUser } = useSession();
  const upcomingInterview = application.upcomingInterview;

  return (
    <main className="px-6 py-6">
      <div className="h-96 rounded-lg">
        <div className="overflow-hidden bg-white shadow sm:rounded-md mb-6">
          <ApplicationPageHeader
            application={application}
            refetchApplication={refetchApplication}
          />
          <ApplicationStatus application={application} />
        </div>
        <div
          className={cx('grid', {
            'grid-cols-2 gap-6':
              !!upcomingInterview ||
              (currentUser?.type === 'RECRUITER' && application.candidate),
          })}
        >
          {currentUser?.type === 'RECRUITER' && application.candidate && (
            <section className="col-span-2">
              <div className="bg-white shadow sm:rounded-lg">
                <CareerOverview candidate={application.candidate} showLink />
              </div>
            </section>
          )}
          {upcomingInterview && (
            <UpcomingInterview
              interview={upcomingInterview}
              headerTitle={application.currentStep?.title as string}
            />
          )}
          <section
            className={cx('col-span-2 h-full', {
              'col-span-1': upcomingInterview,
            })}
          >
            <PositionShowView
              position={application.position as Position}
              wrapperClassName="h-full"
              showLink
            />
          </section>
        </div>
      </div>
    </main>
  );
};

export default ApplicationPageContainer;
