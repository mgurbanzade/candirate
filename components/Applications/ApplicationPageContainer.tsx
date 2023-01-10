import { Application } from '@gql/types/graphql';
import ApplicationPageHeader from './ApplicationPageHeader';
type Props = {
  application: Application;
  refetchApplication: () => void;
};

const ApplicationPageContainer = ({
  application,
  refetchApplication,
}: Props) => {
  return (
    <main className="px-6 py-6">
      <div className="h-96 rounded-lg">
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <ApplicationPageHeader />
          {/* <PositionsList /> */}
        </div>
      </div>
    </main>
  );
};

export default ApplicationPageContainer;
