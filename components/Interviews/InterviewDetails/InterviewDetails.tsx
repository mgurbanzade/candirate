import { useState } from 'react';
import { Interview } from '@gql/types/graphql';
import ShowSection from './ShowSection';
import EditSection from './EditSection';
import useSession from '@hooks/useSession';

type Props = {
  headerTitle: string;
  interviewData: Interview;
  refetchInterview?: () => void;
};

export default function InterviewDetails({
  headerTitle,
  interviewData,
  refetchInterview,
}: Props) {
  const { currentUser } = useSession();
  const [viewState, setViewState] = useState<'show' | 'edit'>('show');
  const isEditView = viewState === 'edit';

  if (!interviewData) {
    return null;
  }

  return (
    <section>
      <div className="bg-white shadow sm:rounded-lg">
        {isEditView && currentUser?.type === 'RECRUITER' && refetchInterview ? (
          <EditSection
            headerTitle={headerTitle}
            interview={interviewData}
            refetchInterview={refetchInterview}
            setViewState={setViewState}
          />
        ) : (
          <ShowSection
            headerTitle={headerTitle}
            interview={interviewData}
            setViewState={setViewState}
          />
        )}
      </div>
    </section>
  );
}
