import { useRouter } from 'next/router';
import { GET_POSITION } from '@gql/queries/positions';
import { useQuery } from '@apollo/client';

const PositionPage = () => {
  const router = useRouter();
  const { data } = useQuery(GET_POSITION, {
    skip: !router.query.id,
    variables: {
      id: Number(router.query.id),
    },
  });

  const position = data?.getPosition;

  return (
    <main className="py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
        <div className="flex items-center space-x-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {position?.title}
            </h1>
            <p className="text-sm font-medium text-gray-500">
              Add missing details before publishing
            </p>
          </div>
        </div>
        <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            Edit
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            Publish
          </button>
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2 lg:col-start-1">
          <section aria-labelledby="applicant-information-title">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2
                  id="applicant-information-title"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Position details
                </h2>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Title</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {position?.title}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Company
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {position?.company?.name || <i>None</i>}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Salary rate
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      ${position?.salaryRate} /{' '}
                      {position?.salaryRateType.toLowerCase()}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Employment type
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {position?.type.toLowerCase()[0].toUpperCase() +
                        position?.type.toLowerCase().slice(1)}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">
                      Description
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {position?.description || <i>None</i>}
                    </dd>
                  </div>
                  {/* <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">
                      Candidates
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900"></dd>
                  </div> */}
                </dl>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PositionPage;
