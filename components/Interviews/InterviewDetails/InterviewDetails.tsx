import { useState } from 'react';
import { Interview } from '@gql/types/graphql';
import ShowSection from './ShowSection';
import EditSection from './EditSection';

type Props = {
  interviewData: Interview;
  refetchInterview: () => void;
};

export default function InterviewDetails({
  interviewData,
  refetchInterview,
}: Props) {
  const [viewState, setViewState] = useState<'show' | 'edit'>('show');
  const isEditView = viewState === 'edit';

  if (!interviewData) {
    return null;
  }

  return (
    <section aria-labelledby="user-information">
      <div className="bg-white shadow sm:rounded-lg">
        {isEditView ? (
          <EditSection
            interview={interviewData}
            refetchInterview={refetchInterview}
            setViewState={setViewState}
          />
        ) : (
          <ShowSection interview={interviewData} setViewState={setViewState} />
        )}
      </div>
    </section>
  );
}
