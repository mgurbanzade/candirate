import Modal from '@components/Generic/Modal';
import { useModal } from '@hooks/useModal';
import PositionModalForm from './PositionModalForm';

type Props = {
  refetchPositions: () => void;
};

const PositionsHeader = ({ refetchPositions }: Props) => {
  const { setIsVisible } = useModal();

  return (
    <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-2">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Job Postings
          </h3>
        </div>
        <div className="ml-4 mt-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => setIsVisible(true)}
            className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Post a new job
          </button>
        </div>
      </div>
      <Modal>
        <PositionModalForm refetchPositions={refetchPositions} />
      </Modal>
    </div>
  );
};

export default PositionsHeader;
