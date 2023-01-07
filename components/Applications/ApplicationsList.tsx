import { Application } from '@gql/types/graphql';
import ApplicationsListItem from './ApplicationsListItem';

type Props = {
  applications: Application[];
};

export default function ApplicationsList({ applications }: Props) {
  return applications ? (
    <ul role="list" className="divide-y divide-gray-200">
      {applications.map((application) => (
        <li key={application?.id}>
          <ApplicationsListItem application={application as Application} />
        </li>
      ))}
    </ul>
  ) : null;
}
