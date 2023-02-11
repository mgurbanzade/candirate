import { useRouter } from 'next/router';
import { Interview } from '@gql/types/graphql';
import { useMutation } from '@apollo/client';
import { IMPORT_QUESTIONS_MUTATION } from '@gql/mutations/interviews';
import { interviewPath } from '@lib/routes';

type Props = {
  interviews: Interview[];
  selectedQuestionIds: number[];
};

const InterviewsList = ({ interviews, selectedQuestionIds }: Props) => {
  const router = useRouter();
  const [importQuestions] = useMutation(IMPORT_QUESTIONS_MUTATION);

  const addToInterview = async (
    interviewId: number,
    uuid: string,
    positionId: number,
  ) => {
    try {
      const res = await importQuestions({
        variables: {
          interviewId,
          positionId,
          questionIds: selectedQuestionIds,
        },
      });

      if (!res.errors) {
        router.push(interviewPath(uuid));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ul role="list" className="divide-y divide-gray-200">
      {interviews?.length === 0 && 'No interviews found'}
      {interviews?.map((interview) => (
        <li
          key={interview?.id}
          className="flex items-center justify-between py-4"
        >
          <div className="flex items-center mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>

            <div className="flex items-center text-sm font-medium text-indigo-600 ml-3">
              <span className="mr-2">{interview?.title}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                addToInterview(
                  interview?.id as number,
                  interview.uuid as string,
                  interview?.positionId as number,
                )
              }
              className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 ml-3"
            >
              Add
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default InterviewsList;
