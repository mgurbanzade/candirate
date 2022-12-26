import EditSection from './EditSection';
import ViewSection from './ViewSection';

import { useState } from 'react';
import { Question } from '@gql/types/graphql';
import { UIQuestionType } from '@lib/ui-types';

type Props = {
  question: Question | UIQuestionType;
  refetchQuestions: any;
  isSelectState: boolean;
  setSelectedQuestionIds: any;
};

const QuestionItem = ({
  question,
  refetchQuestions,
  isSelectState,
  setSelectedQuestionIds,
}: Props) => {
  const [viewState, setViewState] = useState<'show' | 'edit'>('show');
  const isEditView = viewState === 'edit';

  if ((question as UIQuestionType).isNew)
    return (
      <EditSection
        question={question}
        refetchQuestions={refetchQuestions}
        viewState="edit"
        setViewState={setViewState}
      />
    );

  return isEditView ? (
    <EditSection
      question={question}
      viewState={viewState}
      setViewState={setViewState}
      refetchQuestions={refetchQuestions}
    />
  ) : (
    <ViewSection
      isSelectState={isSelectState}
      question={question}
      viewState={viewState}
      setViewState={setViewState}
      setSelectedQuestionIds={setSelectedQuestionIds}
    />
  );
};

export default QuestionItem;
