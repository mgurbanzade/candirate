import { Application } from '@gql/types/graphql';
import ApplicationsHeader from './ApplicationsHeader';
import ApplicationsList from './ApplicationsList';

type Props = {
  applications: Application[];
};

const ApplicationsPageContainer = ({ applications }: Props) => {
  return (
    <main className="px-6 py-6">
      <div className="h-96 rounded-lg">
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <ApplicationsHeader />
          <ApplicationsList applications={applications} />
        </div>
      </div>
    </main>
  );
};

export default ApplicationsPageContainer;
