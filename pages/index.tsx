import LandingPageContainer from '@components/LandingPage';
import useSession from '@hooks/useSession';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const { currentUser } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push('/positions');
    }
  }, [currentUser]);

  if (currentUser) return null;
  return <LandingPageContainer />;
}
