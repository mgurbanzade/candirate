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
          {upcomingInterview && (
            <UpcomingInterview
              interview={upcomingInterview}
              headerTitle={application.currentStep?.title as string}
            />
          )}
          {currentUser?.type === 'RECRUITER' && application.candidate && (
            <section
              className={cx('h-full', {
                'col-span-1': upcomingInterview,
              })}
            >
              <div className="bg-white shadow sm:rounded-lg h-full">
                <CareerOverview candidate={application.candidate} showLink />
              </div>
            </section>
          )}
          <section
            className={cx('h-full', {
              'col-span-2': currentUser?.type === 'RECRUITER',
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
