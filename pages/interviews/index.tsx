import { useModal } from '@hooks/useModal';
import Modal from '@components/Generic/Modal';
import InterviewsEmptyState from '@components/Interviews/InterviewsEmptyState';
import InterviewModalForm from '@components/Interviews/InterviewModalForm';

const InterviewsPage = () => {
  const { setIsVisible } = useModal();
  return (
    <div className="py-5">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Interviews
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <div className="h-96 rounded-lg">
              <div className="overflow-hidden bg-white shadow sm:rounded-md">
                <InterviewsEmptyState onClick={() => setIsVisible(true)} />
                <Modal>
                  <InterviewModalForm />
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewsPage;
