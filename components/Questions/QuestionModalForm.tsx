import useSession from '@hooks/useSession';
import { useModal } from '@hooks/useModal';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { CREATE_QUESTION_MUTATION } from '@gql/mutations/questions';

type QuestionFormInputs = {
  title: string;
};

type Props = {
  refetchQuestions: () => void;
};

const QuestionModalForm = ({ refetchQuestions }: Props) => {
  const { setIsVisible } = useModal();
  const [createQuestion] = useMutation(CREATE_QUESTION_MUTATION);
  const { currentUser } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionFormInputs>();

  const onSubmit: SubmitHandler<QuestionFormInputs> = async (data) => {
    if (!currentUser?.id || !currentUser?.recruiterId) return;

    const res = await createQuestion({
      variables: {
        createQuestionInput: {
          ...data,
          recruiterId: currentUser?.recruiterId,
        },
      },
    });

    if (res.data?.createQuestion.id) {
      setIsVisible(false);
      refetchQuestions();
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
              New Question
            </h3>
          </div>

          <div className="space-y-6 sm:space-y-5">
            <div className="mt-6">
              <div className="sm:col-span-3">
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
            Create
          </button>
        </div>
      </div>
    </form>
  );
};

export default QuestionModalForm;
