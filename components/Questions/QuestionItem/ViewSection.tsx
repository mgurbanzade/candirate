import { createRef } from 'react';
import Tag from '@components/Tags/Tag';

import { useState, useEffect } from 'react';
import { Question } from '@gql/types/graphql';

type Props = {
  question: Question;
  viewState: 'show' | 'edit';
  setViewState: (viewState: 'show' | 'edit') => void;
  isSelectState: boolean;
  setSelectedQuestionIds: any;
};

const CheckboxRef = createRef<HTMLInputElement>();

const QuestionViewSection = ({
  setSelectedQuestionIds,
  question,
  setViewState,
  isSelectState,
}: Props) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckbox = () => null; // do nothing;

  const handleItemClick = () => {
    if (!isSelectState) return;
    if (isChecked) {
      setIsChecked(false);
      setSelectedQuestionIds((prev: number[]) =>
        prev.filter((id) => id !== question.id),
      );
    } else {
      setIsChecked(true);
      setSelectedQuestionIds((prev: number[]) => [...prev, question.id]);
    }
  };

  useEffect(() => {
    if (!isSelectState) setIsChecked(false);
  }, [isSelectState]);

  return (
    <li key={question.id} onClick={handleItemClick}>
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm font-medium text-indigo-600">
            {isSelectState && (
              <input
                ref={CheckboxRef}
                id="comments"
                aria-describedby="comments-description"
                onChange={handleCheckbox}
                name="comments"
                type="checkbox"
                checked={isChecked}
                className="h-6 w-6 rounded border-gray-300 text-indigo-600 focus-0 mr-3"
              />
            )}
            <span className="mr-2">{question.title}</span>
            <Tag
              bgColor="bg-emerald-500 mb-0"
              textColor="!text-white"
              data={{
                id: question.id as number,
                name: `${String(question.points) as string} points`,
              }}
            />
          </div>
          <button
            type="button"
            disabled={isSelectState}
            onClick={() => setViewState('edit')}
            className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none border-transparent"
          >
            Edit
          </button>
        </div>
      </div>
    </li>
  );
};

export default QuestionViewSection;
