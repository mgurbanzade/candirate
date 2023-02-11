import { useModal } from '@hooks/useModal';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import useSession from '@hooks/useSession';
import Tag from '@components/Tags/Tag';
import Modal from '@components/Generic/Modal';
import DeclineModalForm from '@components/Positions/DeclineApplicationModalForm';
import { Application, HiringStep } from '@gql/types/graphql';
import {
  applicationPath,
  manageTimeslotsPath,
  scheduleInterviewPath,
} from '@lib/routes';
import { ClockIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { HIRE_APPLICATION_MUTATION } from '@gql/mutations/applications';

type Props = {
  application: Application;
  refetchApplication: () => void;
};

const ApplicationPageHeader = ({ application, refetchApplication }: Props) => {
  const router = useRouter();
  const [hireApplication] = useMutation(HIRE_APPLICATION_MUTATION);
  const { currentUser } = useSession();
  const { setIsVisible } = useModal();
  const isDeclined = application.status === 'DECLINED';
  const isHired = application.status === 'HIRED';
  const setApplicationHired = async () => {
    try {
      const res = await hireApplication({
        variables: {
          id: application.id as number,
          redirectPath: applicationPath(application.uuid as string),
          positionId: application.position?.id as number,
        },
      });

      if (res.data?.hireApplication.status === 'HIRED') {
        refetchApplication();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleNextStep = () => {
    const [lastStep] = [
      ...(application.position?.hiringSteps as HiringStep[]),
    ].sort((a, b) => ((a?.order as number) > (b?.order as number) ? -1 : 1));

    if (!lastStep) {
      console.error('No hiring steps found');
      return;
    }

    const isLastStep = lastStep?.id === application.currentStep?.id;

    if (isLastStep) {
      setApplicationHired();
      return;
    }
    router.push(
      scheduleInterviewPath(
        application.uuid as string,
        application.candidate?.uuid as string,
      ),
    );
  };

  return (
    <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Application status
          {isDeclined && (
            <Tag
              bgColor="bg-red-500 ml-2"
              textColor="!text-white"
              data={{
                id: 1,
                name: 'Rejected',
              }}
            />
          )}
        </h3>
        {currentUser?.type === 'RECRUITER' && !isDeclined && !isHired && (
          <div>
            <button
              type="submit"
              onClick={() => setIsVisible(true)}
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="ml-3 inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none"
            >
              {application.status === 'APPLIED' && !application.currentStep
                ? 'Schedule'
                : 'Proceed'}
            </button>
          </div>
        )}
        {currentUser?.type === 'CANDIDATE' && !isHired && (
          <Link
            href={manageTimeslotsPath(
              application.uuid as string,
              application.candidate?.uuid as string,
            )}
            className="ml-3 inline-flex items-center justify-center rounded-md border border-transparent bg-yellow-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-yellow-500 focus:outline-none"
          >
            <ClockIcon className="h-5 w-5 mr-2" />
            Timeslots
          </Link>
        )}
      </div>
      {application.status === 'DECLINED' && application.declineMessage && (
        <p className="text-sm mt-3">
          <span className="text-gray-500">Reason:</span>
          <span className="text-gray-500 italic ml-2">
            {application.declineMessage}
          </span>
        </p>
      )}
      <Modal>
        <DeclineModalForm
          application={application}
          setIsVisible={setIsVisible}
          refetchApplication={refetchApplication}
        />
      </Modal>
    </div>
  );
};

export default ApplicationPageHeader;
