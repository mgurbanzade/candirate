import cx from 'classnames';
import { Badge } from 'flowbite-react';
import { useModal } from '@hooks/useModal';
import { Interview, Question } from '@gql/types/graphql';
import InterviewDetails from './InterviewDetails/InterviewDetails';
import InterviewQuestionsList from './InterviewQuestionsList/InterviewQuestionsList';
import Modal from '@components/Generic/Modal';
import { useRouter } from 'next/router';
import useSession from '@hooks/useSession';
import DeclineInterviewModalForm from '@components/Interviews/DeclineInterviewModalForm';
import { rescheduleInterviewPath } from '@lib/routes';

type Props = {
  interviewData: Interview;
  refetchInterview: () => void;
};

const InterviewPageContainer = ({ interviewData, refetchInterview }: Props) => {
  const { currentUser } = useSession();
  const router = useRouter();
  const { setIsVisible } = useModal();
  const isCancelled = interviewData.status === 'CANCELLED';

  return (
    <div className="py-5">
      <header className="flex justify-between sm:px-6 lg:max-w-7xl ">
        <div className="max-w-7xl">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 mr-3">
              {interviewData.title}
            </h1>
            {isCancelled && <Badge color="failure">Cancelled</Badge>}
          </div>
          {interviewData.declineReason && (
            <p className="text-sm text-gray-500 mt-2">
              Reason: {interviewData.declineReason}
            </p>
          )}
        </div>

        {currentUser?.type === 'RECRUITER' && (
          <button
            type="submit"
            onClick={() =>
              !isCancelled
                ? setIsVisible(true)
                : router.push(
                    rescheduleInterviewPath({
                      appUuid: interviewData?.application?.uuid as string,
                      candidateUuid: interviewData?.application?.candidate
                        ?.uuid as string,
                      hiringStepId: interviewData.hiringStepId as number,
                      interviewId: interviewData.id as number,
                    }),
                  )
            }
            className={cx(
              'ml-3 inline-flex justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none self-start',
              {
                'bg-blue-500 hover:bg-blue-600': isCancelled,
              },
            )}
          >
            {isCancelled ? 'Reschedule' : 'Decline'}
          </button>
        )}
      </header>
      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2 lg:col-start-1">
          <InterviewDetails
            headerTitle="Interview details"
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
      <Modal>
        <DeclineInterviewModalForm
          refetchInterview={refetchInterview}
          setIsVisible={setIsVisible}
          interview={interviewData}
        />
      </Modal>
    </div>
  );
};

export default InterviewPageContainer;
