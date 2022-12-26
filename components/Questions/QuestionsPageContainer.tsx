import Modal from '@components/Generic/Modal';
import useSession from '@hooks/useSession';
import QuestionsList from './QuestionsList';
import InterviewsList from './InterviewsList';
import QuestionModalForm from './QuestionModalForm';
import QuestionsListHeader from './QuestionsListHeader';
import QuestionsEmptyState from './QuestionsEmptyState';

import { DateTime } from 'luxon';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useModal } from '@hooks/useModal';
import { Interview, Question } from '@gql/types/graphql';
import { GET_QUESTIONS } from '@gql/queries/questions';
import { GET_INTERVIEWS } from '@gql/queries/interviews';

const QuestionsPageContainer = () => {
  const { setIsVisible } = useModal();
  const { currentUser } = useSession();
  const [isSelectState, setIsSelectState] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<number[]>([]);

  const { error, refetch } = useQuery(GET_QUESTIONS, {
    variables: {
      recruiterId: currentUser?.recruiterId as number,
    },
    onCompleted: (data) => {
      setQuestions((data.getQuestions as Question[]) || []);
    },
  });

  const dayStart = DateTime.local().startOf('minute').toISO();
  const dayEnd = DateTime.local().plus({ years: 10 }).endOf('minute').toISO();

  const { data } = useQuery(GET_INTERVIEWS, {
    variables: {
      getInterviewsWhereInput: {
        recruiterId: currentUser?.recruiterId as number,
        dayStart,
        dayEnd,
      },
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
                    selectedQuestionIds={selectedQuestionIds}
                    setIsSelectState={setIsSelectState}
                  />
                  <QuestionsList
                    questions={questions}
                    refetchQuestions={refetch}
                    isSelectState={isSelectState}
                    setSelectedQuestionIds={setSelectedQuestionIds}
                  />
                </div>
              ) : (
                <QuestionsEmptyState onClick={() => setIsVisible(true)} />
              )}
            </div>
          </div>
        </div>
        <Modal>
          {isSelectState ? (
            <InterviewsList
              interviews={data?.getInterviews as Interview[]}
              selectedQuestionIds={selectedQuestionIds}
            />
          ) : (
            <QuestionModalForm refetchQuestions={refetch} />
          )}
        </Modal>
      </main>
    </div>
  );
};

export default QuestionsPageContainer;
