import TimeslotCalendar from '@components/Calendar/TimeslotCalendar/TimeslotCalendar';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_APPLICATION } from '@gql/queries/applications';
import { Application } from '@gql/types/graphql';

const TimeslotsPage = () => {
  const router = useRouter();
  const { data } = useQuery(GET_APPLICATION, {
    variables: {
      uuid: router.query.uuid as string,
    },
  });

  return (
    <main className="px-6 py-6">
      <div className="mx-auto max-w-7xl">
        <div className="h-98 rounded-lg">
          <TimeslotCalendar application={data?.getApplication as Application} />
        </div>
      </div>
    </main>
  );
};

export default TimeslotsPage;
