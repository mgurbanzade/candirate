import Link from 'next/link';
import Tag from '@components/Tags/Tag';
import { Question } from '@gql/types/graphql';

type Props = {
  question: Question;
  viewState: 'show' | 'edit';
  setViewState: (viewState: 'show' | 'edit') => void;
  isSelectState: boolean;
  setSelectedQuestionIds: any;
};

const QuestionViewSection = ({ question }: Props) => {
  return (
    <li key={question.id}>
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm font-medium text-indigo-600">
            <Link href="/questions">
              <span className="mr-2">{question.title}</span>
              <Tag
                bgColor="bg-emerald-500 mb-0"
                textColor="!text-white"
                data={{
                  id: question.id as number,
                  name: `${String(question.points) as string} points`,
                }}
              />
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};

export default QuestionViewSection;
