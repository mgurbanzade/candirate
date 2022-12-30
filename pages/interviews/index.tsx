import Calendar from '@components/Calendar/Calendar';

const InterviewsPage = () => {
  return (
    <main className="px-6 py-6">
      <div className="mx-auto max-w-7xl">
        <div className="h-98 rounded-lg">
          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <Calendar />
          </div>
        </div>
      </div>
    </main>
  );
};

export default InterviewsPage;
