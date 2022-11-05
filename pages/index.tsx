import Positions from '@components/Positions';
// import { useQuery } from '@apollo/client';
// import { GET_USERS } from '@gql/queries';

export default function Home() {
  // const { data } = useQuery(GET_USERS);
  return (
    <main className="bg-gray-100 h-screen">
      <Positions />
    </main>
  );
}
