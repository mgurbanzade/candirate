import { useModal } from '@hooks/useModal';
import { useRouter } from 'next/router';
import useSession from '@hooks/useSession';
import Tag from '@components/Tags/Tag';
import Modal from '@components/Generic/Modal';
import DeclineModalForm from '@components/Positions/DeclineApplicationModalForm';
import { Application } from '@gql/types/graphql';
import { scheduleInterviewPath } from '@lib/routes';

type Props = {
  application: Application;
  refetchApplication: () => void;
};

const ApplicationPageHeader = ({ application, refetchApplication }: Props) => {
  const router = useRouter();
  const { currentUser } = useSession();
  const { setIsVisible } = useModal();
  const isDeclined = application.status === 'DECLINED';
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
        {currentUser?.type === 'RECRUITER' && !isDeclined && (
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
              onClick={() =>
                router.push(
                  scheduleInterviewPath(
                    application.uuid as string,
                    application.candidate?.uuid as string,
                  ),
                )
              }
              className="ml-3 inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none"
            >
              {application.status === 'APPLIED' && !application.currentStep
                ? 'Schedule'
                : 'Proceed'}
            </button>
          </div>
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
