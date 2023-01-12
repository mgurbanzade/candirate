import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import { Position } from '@gql/types/graphql';
import Tags from '@components/Tags';
import Link from 'next/link';
import { positionPath } from '@lib/routes';

type PositionShowViewProps = {
  position: Position;
  wrapperClassName?: string;
  showLink?: boolean;
};

const PositionShowView = ({
  position,
  wrapperClassName,
  showLink,
}: PositionShowViewProps) => {
  const typeTitle =
    position.type.toLowerCase()[0].toUpperCase() +
    position.type.toLowerCase().slice(1);

  return (
    <section aria-labelledby="position-details">
      <div
        className={`bg-white shadow sm:rounded-lg${
          wrapperClassName ? ' ' + wrapperClassName : ''
        }`}
      >
        <div className="flex justify-between items-center px-4 py-5 sm:px-6">
          <h2
            id="position-details"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Position details
          </h2>

          {showLink && (
            <Link href={positionPath(position.uuid as string)} target="_blank">
              <ArrowTopRightOnSquareIcon className="w-6 h-6 text-gray-500" />
            </Link>
          )}
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Title</dt>
              <dd className="mt-1 text-sm text-gray-900">{position.title}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Company</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {position.company?.name || <i>None</i>}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Salary rate</dt>
              <dd className="mt-1 text-sm text-gray-900">
                ${position.salaryRate} / {position.salaryRateType.toLowerCase()}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Employment type
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{typeTitle}</dd>
            </div>
            {position.requiredSkills && position.requiredSkills.length > 0 ? (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Skills</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <Tags tags={position.requiredSkills} isDraggable={false} />
                </dd>
              </div>
            ) : null}
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {position?.description || <i>None</i>}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default PositionShowView;
