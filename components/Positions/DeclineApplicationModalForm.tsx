import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { UPDATE_APPLICATION_MUTATION } from '@gql/mutations/applications';

type DeclineFormInputs = {
  declineMessage: string;
};

type Props = {
  appId: number;
  setIsVisible: (isVisible: boolean) => void;
  setCurrApplicationId: (id: number | null) => void;
};

const DeclineModalForm = ({
  appId,
  setIsVisible,
  setCurrApplicationId,
}: Props) => {
  const [updateApplication] = useMutation(UPDATE_APPLICATION_MUTATION);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeclineFormInputs>();

  const onSubmit: SubmitHandler<DeclineFormInputs> = async (data) => {
    if (!appId) {
      return console.error('No application id provided');
    }
    const res = await updateApplication({
      variables: {
        id: appId,
        updateApplicationInput: {
          ...data,
          status: 'DECLINED',
        },
      },
    });

    if (res.data?.updateApplication.status == 'DECLINED') {
      setIsVisible(false);
      setCurrApplicationId(null);
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6 sm:space-y-5">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900 whitespace-nowrap">
            Provide a reason for declining this application
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Candidates will be notified of your decision.
          </p>
        </div>
      </div>
      <div className="space-y-6 sm:space-y-5">
        <div className="mt-1">
          <textarea
            id="reason"
            placeholder="e.g. 'We have decided to go with another candidate.'"
            rows={4}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            defaultValue={''}
            {...register('declineMessage', { required: true })}
          />
        </div>
        {errors.declineMessage && (
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
              Decline
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DeclineModalForm;
