import useSession from '@hooks/useSession';
import { useModal } from '@hooks/useModal';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { CREATE_POSITION_MUTATION } from '@gql/mutations/positions';

type PositionFromInputs = {
  title: string;
  description: string;
};

const PositionModalForm = () => {
  const { setIsVisible } = useModal();
  const [createPosition] = useMutation(CREATE_POSITION_MUTATION);
  const { currentUser } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PositionFromInputs>();

  const onSubmit: SubmitHandler<PositionFromInputs> = async (data) => {
    if (!currentUser?.id) return;

    const res = await createPosition({
      variables: {
        createPositionInput: {
          ...data,
          postedById: currentUser.id,
        },
      },
    });

    if (res.data?.createPosition.title) {
      setIsVisible(false);
    }
  };

  return (
    <form
      action="#"
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 divide-y divide-gray-200"
    >
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 sm:space-y-5">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              New Position
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              This information will not be published yet.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-5">
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id="title"
                    autoComplete="title"
                    className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    {...register('title', { required: true })}
                  />
                </div>
                {errors.title && (
                  <div className="text-red-500 mt-1 text-sm">
                    This field is required
                  </div>
                )}
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  defaultValue={''}
                  {...register('description', { required: true })}
                />
                {errors.description && (
                  <div className="text-red-500 mt-1 text-sm">
                    This field is required
                  </div>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Write a few sentences about the position.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default PositionModalForm;
