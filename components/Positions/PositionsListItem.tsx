import Link from 'next/link';
import { MapPinIcon } from '@heroicons/react/20/solid';
import { Position } from '@gql/types/graphql';

type Props = {
  position: Position;
};

export default function PositionsListItem({ position }: Props) {
  const positionPath = `/positions/${position.id}`;
  return (
    <Link href={positionPath} className="block hover:bg-gray-50">
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <p className="truncate text-sm font-medium text-indigo-600">
            {position.title}
            {position.company && (
              <>
                <span className="text-gray-500">{' @ '}</span>
                <span className="text-gray-600">{position?.company?.name}</span>
              </>
            )}
          </p>
          <div className="ml-2 flex flex-shrink-0">
            <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
              {position.type}
            </p>
          </div>
        </div>
        <div className="mt-2 sm:flex sm:justify-between">
          {!position.isRemoteWorldWide && (
            <div className="sm:flex">
              <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                <MapPinIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                Remote
              </p>
            </div>
          )}
          {/* <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <CalendarIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <p>
                    Closing on{' '}
                    <time dateTime={position.closeDate}>
                      {position.closeDateFull}
                    </time>
                  </p>
                </div> */}
        </div>
      </div>
    </Link>
  );
}
