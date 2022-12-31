import cx from 'classnames';
import { useState } from 'react';
import { useMutation, ApolloQueryResult } from '@apollo/client';
import {
  Position,
  GetPositionQuery,
  Application,
  Candidate,
} from '@gql/types/graphql';
import {
  UPDATE_POSITION_MUTATION,
  PUBLISH_POSITION_MUTATION,
  APPLY_POSITION_MUTATION,
} from '@gql/mutations/positions';
import { useForm, SubmitHandler } from 'react-hook-form';
import PositionShowView from '@components/Positions/PositionShowView';
import PositionEditView from '@components/Positions/PositionEditView';
import useNotification from '@hooks/useNotification';
import useSession from '@hooks/useSession';
import { interviewsPath, profilePath } from '@lib/routes';
import ApplicationList from './ApplicationList';
import { useRouter } from 'next/router';
import statusIcons from './statusIcons';
import SuggestedCandidatesList from './SuggestedCandidatesList';

type PositionPageProps = {
  position: Position;
  refetchPosition: (
    variables?:
      | Partial<{
          uuid: string;
        }>
      | undefined,
  ) => Promise<ApolloQueryResult<GetPositionQuery>>;
};

type PositionFormInputs = {
  title: string;
  description: string;
  salaryRate: number;
  salaryRateType: 'HOURLY' | 'MONTHLY' | 'YEARLY';
  companyId: number;
  type: 'FULLTIME' | 'PARTTIME';
};

const PositionPage = ({ position, refetchPosition }: PositionPageProps) => {
  const session = useSession();
  const router = useRouter();
  const [publishError, setPublishError] = useState<string | null>(null);
  const [viewState, setViewState] = useState<'show' | 'edit'>('show');
  const { setNotification } = useNotification();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty },
  } = useForm<PositionFormInputs>();
  const [updatePosition] = useMutation(UPDATE_POSITION_MUTATION);
  const [publishPosition] = useMutation(PUBLISH_POSITION_MUTATION);
  const [applyToPosition] = useMutation(APPLY_POSITION_MUTATION);
  const handleUpdate = async (position: Position, data: PositionFormInputs) => {
    if (!position.id) return;
    if (!isDirty) {
      setViewState('show');
      return;
    }
    const res = await updatePosition({
      variables: {
        id: position.id,
        updatePositionInput: {
          ...data,
        },
      },
    });

    if (res.data?.updatePosition) {
      setViewState('show');
      setPublishError(null);
      refetchPosition();
    }
  };

  const handlePublish = async (position: Position) => {
    if (!position.id || position.isPublished) return;
    try {
      const res = await publishPosition({
        variables: {
          id: position.id,
        },
      });

      if (res.data?.publishPosition) {
        setViewState('show');
        refetchPosition();
        setNotification({
          type: 'success',
          title: 'Sucess!',
          description: 'Position published successfully',
          isVisible: true,
        });
      }
    } catch (e: any) {
      if (e.message) {
        setPublishError(e.message);
        setViewState('edit');
      }
    }
  };

  const handleApply = async (position: Position) => {
    if (!position.id || !session?.currentUser?.candidateId) return;
    const candidate = session.currentUser.candidate;
    if (
      !candidate?.positionTitle ||
      !candidate?.salaryExpectation ||
      !candidate?.yearsOfExperience
    ) {
      setNotification({
        type: 'error',
        title: 'Error!',
        description: 'Please complete your profile before applying',
        isVisible: true,
      });
      return router.push(profilePath());
    }

    try {
      const res = await applyToPosition({
        variables: {
          positionId: position.id,
          candidateId: session?.currentUser.candidateId,
        },
      });

      if (res.data?.applyToPosition) {
        refetchPosition();
        setNotification({
          type: 'success',
          title: 'Sucess!',
          description: 'Application sent successfully',
          isVisible: true,
        });
      }
    } catch (e: any) {
      if (e.message) {
        setNotification({
          type: 'error',
          title: 'Error',
          description: e.message,
          isVisible: true,
        });
      }
    }
  };

  const isEditView = viewState === 'edit';
  const isUserAuthor = position.authorId === session.currentUser?.id;
  const onSubmit: SubmitHandler<PositionFormInputs> = async (data) => {
    if (!isUserAuthor) return handleApply(position);
    return isEditView ? handleUpdate(position, data) : handlePublish(position);
  };

  const applicationStatusIcon =
    session.currentUser?.type === 'CANDIDATE'
      ? statusIcons[position.applicationStatus as keyof typeof statusIcons]()
      : null;

  return (
    <main className="py-5">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
        <div className="flex items-center space-x-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {position.title}
              {position.company && (
                <>
                  <span className="text-gray-500">{' @ '}</span>
                  <span className="text-gray-600">
                    {position?.company?.name}
                  </span>
                </>
              )}
            </h1>
            {position.isPublished ? null : (
              <p className="text-sm font-medium text-gray-500">
                Add missing details before publishing
              </p>
            )}
            {publishError && (
              <div className="text-red-500 mt-1 text-sm">{publishError}</div>
            )}
          </div>
        </div>
        <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
          {isUserAuthor ? (
            <div>
              {position.isPublished ? (
                <button
                  type="button"
                  onClick={
                    isEditView
                      ? (router.push(interviewsPath()) as any)
                      : () => setViewState('edit')
                  }
                  className={cx(
                    'inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100',
                    {
                      'border-gray-300 bg-white text-gray-700 hover:bg-gray-50':
                        !isEditView,
                      'border-transparent bg-blue-600 text-white hover:bg-blue-700':
                        isEditView,
                    },
                  )}
                >
                  {isEditView ? 'Save' : 'Edit'}
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setViewState(isEditView ? 'show' : 'edit')}
                    className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                  >
                    {isEditView ? 'Cancel' : 'Edit'}
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 ml-3"
                  >
                    {isEditView ? 'Save' : 'Publish'}
                  </button>
                </>
              )}
            </div>
          ) : (
            <div>
              <button
                type="button"
                onClick={
                  position.applicationStatus === 'NOT_APPLIED'
                    ? handleSubmit(onSubmit)
                    : () => null
                }
                disabled={position.applicationStatus !== 'NOT_APPLIED'}
                className={cx(
                  'shadow-none inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100',
                  {
                    'bg-green-500 hover:bg-green-500 text-white': [
                      'APPLIED',
                      'INVITED',
                    ].includes(position.applicationStatus),
                    'bg-red-500 hover:bg-red-500 text-white':
                      position.applicationStatus === 'DECLINED',
                  },
                )}
              >
                {applicationStatusIcon}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2 lg:col-start-1">
          {isEditView ? (
            <PositionEditView
              refetchPosition={refetchPosition}
              position={position}
              control={control}
              register={register}
              errors={errors}
              setValue={setValue}
            />
          ) : (
            <PositionShowView position={position} />
          )}
        </div>
        {session?.currentUser?.type === 'RECRUITER' &&
        position.suggestedCandidates?.length ? (
          <div className="space-y-6 lg:col-span-1 lg:col-start-3">
            <SuggestedCandidatesList
              candidates={position.suggestedCandidates as Candidate[]}
            />
          </div>
        ) : null}
      </div>
      {session?.currentUser?.type === 'RECRUITER' &&
      position.applications?.length ? (
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2 lg:col-start-1">
            <ApplicationList
              applications={position.applications as Application[]}
            />
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default PositionPage;
