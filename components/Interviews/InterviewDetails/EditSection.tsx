import { useState } from 'react';
import { DateTime } from 'luxon';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { Interview } from '@gql/types/graphql';
import useSession from '@hooks/useSession';
import FormErrorText from '@components/Generic/FormErrorText';
import { UPDATE_INTERVIEW_MUTATION } from '@gql/mutations/interviews';
import DateTimePicker from '@components/Generic/DateTimePicker';

type Props = {
  interview: Interview;
  setViewState: (viewState: 'show' | 'edit') => void;
  refetchInterview: () => void;
};

type InterviewFormInputs = {
  title: string;
  description: string;
  meetingLink: string;
  duration: number;
  time: string;
};

const getStartDate = (date: DateTime, time: DateTime) => {
  const gag = date;
  const newDate = gag.set({
    year: date.year,
    month: date.month,
    day: date.day,
    hour: time.hour,
    minute: time.minute,
  });

  return newDate;
};

export default function EditSection({
  interview,
  setViewState,
  refetchInterview,
}: Props) {
  const { currentUser } = useSession();
  const [startDate, setStartDate] = useState(
    DateTime.fromISO(interview.startsAt),
  );
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setError,
    formState: { errors },
  } = useForm<InterviewFormInputs>();
  const [updateInterview] = useMutation(UPDATE_INTERVIEW_MUTATION);
  const onSubmit = async (formData: InterviewFormInputs) => {
    try {
      const time = DateTime.fromISO(getValues('time'));
      const realStartDate = getStartDate(startDate, time);

      const { errors } = await updateInterview({
        variables: {
          id: interview.id as number,
          updateInterviewInput: {
            title: formData.title,
            description: formData.description,
            meetingLink: formData.meetingLink,
            startsAt: realStartDate.toISO(),
            endsAt: realStartDate.plus({ minutes: formData.duration }).toISO(),
          },
        },
      });

      if (!errors?.length) {
        refetchInterview();
        setViewState('show');
      }
    } catch (error: any) {
      setError('duration', {
        message: error.message,
      });
    }
  };

  const setSelectedDay = (date: DateTime) => {
    const time = DateTime.fromISO(getValues('time'));
    const newDate = getStartDate(date, time);
    setStartDate(newDate);
  };

  const duration = DateTime.fromISO(interview.endsAt).diff(
    DateTime.fromISO(interview.startsAt),
    'minutes',
  ).minutes;

  return (
    <>
      <div className="flex justify-between items-center px-4 py-5 sm:px-6">
        <h2 className="text-lg font-medium leading-6 text-gray-900">
          Interview details
        </h2>
        {currentUser?.recruiterId && (
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:outline-none border-transparent bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        )}
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Interview title*
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              <input
                type="text"
                id="title"
                className="block w-80 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="ex: Senior Software Engineer"
                defaultValue={interview.title as string}
                {...register('title', { required: true })}
              />
              <FormErrorText field={errors.title} />
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Meeting link</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <input
                type="text"
                id="meetingLink"
                placeholder="ex: https://meet.google.com/meeting-id"
                autoComplete="meetingLink"
                defaultValue={(interview.meetingLink as string) || ''}
                className="block w-full min-w-0 flex-1 rounded-md border-gray-300 sm:text-sm"
                {...register('meetingLink')}
              />
              <FormErrorText field={errors.meetingLink} />
            </dd>
          </div>
        </dl>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 mt-8">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">When</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <div className="flex align-center justify-between">
                <DateTimePicker
                  selectedDay={startDate}
                  setSelectedDay={setSelectedDay}
                  control={control}
                />
              </div>
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Duration (minutes)
            </dt>
            <dd className="mt-1">
              <input
                type="number"
                id="duration"
                min={30}
                max={480}
                step={30}
                defaultValue={duration || 30}
                autoComplete="duration"
                className="block w-full min-w-0 flex-1 rounded-md border-gray-300 sm:text-sm"
                {...register('duration', {
                  required: true,
                  min: 30,
                  max: 480,
                  valueAsNumber: true,
                })}
              />
            </dd>
          </div>
          <FormErrorText field={errors.duration} />
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">
              Notes for the candidate
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              <textarea
                id="description"
                rows={3}
                defaultValue={interview.description as string}
                placeholder="ex: Please be on time, we will start the interview at 10:00 AM"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register('description')}
              />
              <FormErrorText field={errors.description} />
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}
