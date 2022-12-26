import { Question } from '@gql/types/graphql';
import InterviewQuestionItem from './InterviewQuestionItem';

type Props = {
  questions: Question[];
  refetchQuestions: any;
  isSelectState: boolean;
  setSelectedQuestionIds: any;
};

export default function InterviewQuestionsList({
  questions,
  refetchQuestions,
  isSelectState,
  setSelectedQuestionIds,
}: Props) {
  return (
    <ul
      role="list"
      className="divide-y divide-gray-200 border-t border-gray-200 !mt-0"
    >
      {questions.map((question) => (
        <InterviewQuestionItem
          isSelectState={isSelectState}
          key={question.id}
          question={question}
          refetchQuestions={refetchQuestions}
          setSelectedQuestionIds={setSelectedQuestionIds}
        />
      ))}
    </ul>
  );
}
