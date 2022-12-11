type Props = {
  id: string;
  hourStr: string;
  isNewInterview?: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  setEvents: React.Dispatch<React.SetStateAction<any[]>>;
};

const TimelineCell = ({ hourStr, onClick, isNewInterview }: Props) => {
  const isHalf = hourStr.includes(':30');

  return !isHalf ? (
    <div onClick={isNewInterview ? onClick : () => null}>
      <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
        {hourStr}
      </div>
    </div>
  ) : (
    <div onClick={isNewInterview ? onClick : () => null} />
  );
};

export default TimelineCell;
