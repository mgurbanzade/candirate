import cx from 'classnames';
import { Question } from '@gql/types/graphql';
import { UIQuestionType } from '@lib/ui-types';

type Props = {
  setQuestions: any;
  isSelectState: boolean;
  setIsSelectState: any;
};

const QuestionsListHeader = ({
  setQuestions,
  isSelectState,
  setIsSelectState,
}: Props) => {
  const handleNewQuestion = () => {
    setQuestions((prevQuestions: Question[]) => [
      {
        id: Date.now(),
        isNew: true,
        title: "Edit new question's title",
        points: 5,
      } as UIQuestionType,
      ...prevQuestions,
    ]);
  };

  return (
    <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-2">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Questions
          </h3>
        </div>
        <div className="ml-4 mt-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => setIsSelectState(!isSelectState)}
            className={cx(
              'inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
              {
                'bg-gray-300 hover:bg-gray-300': isSelectState,
              },
            )}
          >
            Select
          </button>
          <button
            type="button"
            onClick={handleNewQuestion}
            disabled={isSelectState}
            className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-3"
          >
            New Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionsListHeader;
