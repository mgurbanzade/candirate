import { useState } from 'react';
import QuestionsListHeader from './QuestionsListHeader';
import QuestionsList from './QuestionsList';
import QuestionsEmptyState from './QuestionsEmptyState';
import Modal from '@components/Generic/Modal';
import QuestionModalForm from './QuestionModalForm';
import useSession from '@hooks/useSession';
import { useQuery } from '@apollo/client';
import { GET_QUESTIONS } from '@gql/queries/questions';
import { useModal } from '@hooks/useModal';
import { Question } from '@gql/types/graphql';

const QuestionsPageContainer = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isSelectState, setIsSelectState] = useState(false);
  const { setIsVisible } = useModal();
  const { currentUser } = useSession();
  const { error, refetch } = useQuery(GET_QUESTIONS, {
    variables: {
      recruiterId: currentUser?.recruiterId as number,
    },
    onCompleted: (data) => {
      setQuestions((data.getQuestions as Question[]) || []);
    },
  });

  if (error) return <div>Error</div>;

  return (
    <div className="py-5">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Questions
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <div className="h-96 rounded-lg">
              {questions && questions.length > 0 ? (
                <div className="overflow-hidden bg-white shadow sm:rounded-md">
                  <QuestionsListHeader
                    setQuestions={setQuestions}
                    isSelectState={isSelectState}
                    setIsSelectState={setIsSelectState}
                  />
                  <QuestionsList
                    questions={questions}
                    refetchQuestions={refetch}
                    isSelectState={isSelectState}
                  />
                </div>
              ) : (
                <QuestionsEmptyState onClick={() => setIsVisible(true)} />
              )}
            </div>
          </div>
        </div>
        <Modal>
          <QuestionModalForm refetchQuestions={refetch} />
        </Modal>
      </main>
    </div>
  );
};

export default QuestionsPageContainer;
