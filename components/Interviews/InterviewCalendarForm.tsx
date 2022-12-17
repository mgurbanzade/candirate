import useSession from '@hooks/useSession';
import { useMutation } from '@apollo/client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CREATE_INTERVIEW_MUTATION } from '@gql/mutations/interviews';
import { Application } from '@gql/types/graphql';
import FormErrorText from '@components/Generic/FormErrorText';
import { UIInteviewType } from '@lib/ui-types';

type Props = {
  application: Application;
  event: UIInteviewType;
  setEvents: React.Dispatch<React.SetStateAction<UIInteviewType[]>>;
  closePopover: () => void;
  refetchEvents: () => void;
};

type InterviewFromInputs = {
  description: string;
  meetingLink: string;
  duration: number;
};

const InterviewModalForm = ({
  application,
  setEvents,
  event,
  closePopover,
  refetchEvents,
}: Props) => {
  const [createInterview] = useMutation(CREATE_INTERVIEW_MUTATION);
  const interviewTitle = `${application?.position?.title} Interview with ${application?.candidate?.user?.firstname}`;
  const { currentUser } = useSession();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<InterviewFromInputs>();

  const onSubmit: SubmitHandler<InterviewFromInputs> = async (data) => {
    if (!currentUser) return;

    try {
      const res = await createInterview({
        variables: {
          applicationId: application.id as number,
          createInterviewInput: {
            description: data.description,
            meetingLink: data.meetingLink,
            title: interviewTitle,
            startsAt: event?.startDate.toISO(),
            endsAt: event?.startDate.plus({ minutes: data.duration }).toISO(),
            candidateId: application?.candidate?.id as number,
            positionId: application?.position?.id as number,
            recruiterId: currentUser?.recruiterId as number,
          },
        },
      });

      if (res.data?.createInterview.title) {
        await refetchEvents();
        closePopover();
      }
    } catch (err: any) {
      setError('duration', {
        message: err.message,
      });
    }
  };

  return (
    <form
      action="#"
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 sm:space-y-5">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {interviewTitle}
            </h3>
          </div>

          <div className="space-y-6 sm:space-y-5">
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Duration (minutes)
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="number"
                    id="duration"
                    min={30}
                    max={480}
                    step={30}
                    defaultValue={30}
                    autoComplete="duration"
                    className="block w-full min-w-0 flex-1 rounded-md border-gray-300 sm:text-sm"
                    {...register('duration', {
                      required: true,
                      min: 30,
                      max: 480,
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <FormErrorText field={errors.duration} />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Meeting link
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id="meetingLink"
                    placeholder="ex: https://meet.google.com/meeting-id"
                    autoComplete="meetingLink"
                    className="block w-full min-w-0 flex-1 rounded-md border-gray-300 sm:text-sm"
                    {...register('meetingLink')}
                  />
                </div>
                <FormErrorText field={errors.meetingLink} />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Notes for the candidate
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <textarea
                    id="description"
                    rows={3}
                    placeholder="ex: Please be on time, we will start the interview at 10:00 AM"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    {...register('description')}
                  />
                </div>
                <FormErrorText field={errors.description} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() =>
            setEvents((events) => events.filter((e) => e.id !== event.id))
          }
          className="flex items-center rounded-md bg-red-500 py-2 px-2 text-sm font-medium text-white shadow-sm hover:bg-red-700"
        >
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
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
        <button
          type="submit"
          className="ml-3 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Schedule
        </button>
      </div>
    </form>
  );
};

export default InterviewModalForm;
