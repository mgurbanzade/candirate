import { Question } from '@gql/types/graphql';
import QuestionItem from './QuestionItem';

type Props = {
  questions: Question[];
  refetchQuestions: any;
  isSelectState: boolean;
  setSelectedQuestionIds: any;
};

export default function QuestionsList({
  questions,
  refetchQuestions,
  isSelectState,
  setSelectedQuestionIds,
}: Props) {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {questions.map((question) => (
          <QuestionItem
            isSelectState={isSelectState}
            key={question.id}
            question={question}
            refetchQuestions={refetchQuestions}
            setSelectedQuestionIds={setSelectedQuestionIds}
          />
        ))}
      </ul>
    </div>
  );
}
