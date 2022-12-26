import { useMutation } from '@apollo/client';
import { Question } from '@gql/types/graphql';
import { useForm } from 'react-hook-form';
import useSession from '@hooks/useSession';
import {
  UPDATE_QUESTION,
  CREATE_QUESTION_MUTATION,
} from '@gql/mutations/questions';
import { UIQuestionType } from '@lib/ui-types';

type Props = {
  question: Question | UIQuestionType;
  viewState: 'show' | 'edit';
  setViewState: (viewState: 'show' | 'edit') => void;
  refetchQuestions: any;
};

type QuestionFormInputs = {
  title: string;
  points: number;
};

const QuestionEditSection = ({
  question,
  setViewState,
  refetchQuestions,
}: Props) => {
  const { currentUser } = useSession();
  const [createQuestion] = useMutation(CREATE_QUESTION_MUTATION);
  const [updateQuestion] = useMutation(UPDATE_QUESTION);
  const { register, handleSubmit } = useForm<QuestionFormInputs>();
  const onSubmit = async (data: QuestionFormInputs) => {
    try {
      if (question.hasOwnProperty('isNew')) {
        const res = await createQuestion({
          variables: {
            createQuestionInput: {
              ...data,
              recruiterId: currentUser?.recruiterId,
            },
          },
        });

        if (res.data?.createQuestion.id) {
          setViewState('show');
          refetchQuestions();
        }
        return;
      }

      const res = await updateQuestion({
        variables: {
          id: currentUser?.id as number,
          updateQuestionInput: data,
        },
      });

      if (res.data?.updateQuestion.id) {
        setViewState('show');
        refetchQuestions();
      }
    } catch (e) {}
  };

  return (
    <li key={question.id}>
      <form className="px-4 py-4 sm:px-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <div className="mt-1 rounded-md w-2/5">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              autoComplete="title"
              defaultValue={question.title || ''}
              className="block w-full border-0 border-b border-transparent border-indigo-600 focus:ring-0 sm:text-sm pl-0"
              autoFocus
              {...register('title', { required: true })}
            />
          </div>
          <div className="mt-1 rounded-md">
            <label className="block text-sm font-medium text-gray-700">
              Points
            </label>
            <input
              type="number"
              id="points"
              defaultValue={question.points || 1}
              min={1}
              max={5}
              className="block w-full border-0 border-b border-transparent border-indigo-600 focus:ring-0 sm:text-sm pl-0"
              {...register('points', { required: true, valueAsNumber: true })}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none border-transparent"
          >
            Save
          </button>
        </div>
      </form>
    </li>
  );
};

export default QuestionEditSection;
