import PositionsHeader from './PositionsHeader';
import PositionsList from './PositionsList';

const Positions = () => {
  return (
    <main className="px-6 py-6">
      <div className="h-96 rounded-lg">
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <PositionsHeader />
          <PositionsList />
        </div>
      </div>
    </main>
  );
};

export default Positions;
