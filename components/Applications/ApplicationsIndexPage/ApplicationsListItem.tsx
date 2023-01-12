import cx from 'classnames';
import Link from 'next/link';
import { Application } from '@gql/types/graphql';
import { applicationPath } from '@lib/routes';

type Props = {
  application: Application;
};

export default function ApplicationsListItem({ application }: Props) {
  return (
    <Link
      href={applicationPath(application.uuid as string)}
      className="block hover:bg-gray-50"
    >
      <div className="px-4 py-6 sm:px-6">
        <div className="flex items-center justify-between">
          <p className="truncate text-sm font-medium text-indigo-600">
            {application?.position?.title}
            {application?.position?.company && (
              <>
                <span className="text-gray-500">{' @ '}</span>
                <span className="text-gray-600">
                  {application.position?.company?.name}
                </span>
              </>
            )}
          </p>
          <div className="ml-2 flex flex-shrink-0">
            <p
              className={cx(
                'inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800',
                {
                  '!bg-red-500 !text-white': application?.status === 'DECLINED',
                  'bg-yellow-100 text-yellow-800':
                    application?.status === 'APPLIED',
                  'bg-green-100 text-green-800':
                    application?.status === 'INVITED',
                },
              )}
            >
              {application?.status}
            </p>
          </div>
        </div>
        {/* {!position.isRemoteWorldWide && (
          <div className="mt-2 sm:flex sm:justify-between">
            <div className="sm:flex">
              <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                <MapPinIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                Remote
              </p>
            </div>
          </div>
        )} */}
      </div>
    </Link>
  );
}
