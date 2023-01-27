import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { Interview } from '@gql/types/graphql';
import { DECLINE_INTERVIEW_MUTATION } from '@gql/mutations/interviews';
import { interviewPath } from '@lib/routes';
import useSession from '@hooks/useSession';

type DeclineFormInputs = {
  declineReason: string;
};

type Props = {
  interview: Interview | null;
  setIsVisible: (isVisible: boolean) => void;
  refetchInterview?: () => void;
};

const DeclineInterviewModalForm = ({
  interview,
  setIsVisible,
  refetchInterview,
}: Props) => {
  const { currentUser } = useSession();
  const [declineInterview] = useMutation(DECLINE_INTERVIEW_MUTATION);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeclineFormInputs>();

  const onSubmit: SubmitHandler<DeclineFormInputs> = async (data) => {
    if (!interview?.id) {
      return console.error('No interview id provided');
    }

    const dynamicFields = currentUser?.recruiterId
      ? { candidateId: interview.candidateId }
      : { recruiterId: interview.recruiterId };

    const res = await declineInterview({
      variables: {
        id: interview.id,
        declineInterviewInput: {
          redirectPath: interviewPath(interview.uuid as string),
          declineReason: data.declineReason,
          declinedBy: currentUser?.type,
          ...dynamicFields,
        },
      },
    });

    if (res.data?.declineInterview?.status == 'CANCELLED') {
      if (refetchInterview) refetchInterview();
      setIsVisible(false);
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6 sm:space-y-5">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900 whitespace-nowrap">
            Provide a reason for declining the interview
          </h3>
        </div>
      </div>
      <div className="space-y-6 sm:space-y-5">
        <div className="mt-1">
          <textarea
            id="reason"
            placeholder="e.g. I'm not available at this time"
            rows={4}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            defaultValue={''}
            {...register('declineReason')}
          />
        </div>
        {errors.declineReason && (
          <div className="text-red-500 mt-1 text-sm">
            This field is required
          </div>
        )}
        <div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DeclineInterviewModalForm;
