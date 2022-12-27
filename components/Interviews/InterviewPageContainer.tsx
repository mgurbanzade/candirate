import { Interview, Question } from '@gql/types/graphql';
import InterviewDetails from './InterviewDetails/InterviewDetails';
import InterviewQuestionItem from './InterviewQuestionsList/InterviewQuestionItem';
import InterviewQuestionsList from './InterviewQuestionsList/InterviewQuestionsList';

type Props = {
  interviewData: Interview;
  refetchInterview: () => void;
};

const InterviewPageContainer = ({ interviewData, refetchInterview }: Props) => {
  return (
    <div className="py-5">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            {interviewData.title}
          </h1>
        </div>
      </header>
      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2 lg:col-start-1">
          <InterviewDetails
            interviewData={interviewData}
            refetchInterview={refetchInterview}
          />
        </div>
        {(interviewData.questions?.length as number) > 0 && (
          <div className="overflow-hidden bg-white shadow sm:rounded-md space-y-6 lg:col-span-2 lg:col-start-1">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium leading-6 text-gray-900">
                Attached questions
              </h2>
            </div>
            <InterviewQuestionsList
              questions={interviewData.questions as Question[]}
              refetchQuestions={refetchInterview}
              isSelectState={false}
              setSelectedQuestionIds={() => null}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewPageContainer;
