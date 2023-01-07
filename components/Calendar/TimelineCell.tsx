// import cx from 'classnames';
import { DateTime } from 'luxon';

type Props = {
  id: string;
  hourStr: string;
  isNewInterview?: boolean;
  isTimeslot?: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  setEvents: React.Dispatch<React.SetStateAction<any[]>>;
};

const TimelineCell = ({
  hourStr,
  onClick,
  isNewInterview,
  isTimeslot,
}: Props) => {
  const isWhole = !hourStr.includes(':');
  const nowHourFormat = DateTime.local().toFormat('ha');
  const nowMinutes = DateTime.local()
    .startOf('hour')
    .plus({ minutes: 15 })
    .toFormat('h:mma');

  const nowHour = DateTime.local().minute === 0 ? nowHourFormat : nowMinutes;

  const onClickHandler = isNewInterview || isTimeslot ? onClick : () => null;

  return isWhole ? (
    <div onClick={onClickHandler} className="relative">
      {nowHour === hourStr && (
        <>
          <div
            className="w-3 h-3 absolute flex items-center bg-green-600 rounded-full -left-1.5"
            style={{
              transform: 'translateY(-7px)',
            }}
          />
          <div
            className="w-full absolute bg-green-600"
            style={{ height: 2, marginTop: '-2px', zIndex: 51 }}
          />
        </>
      )}
      <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
        {hourStr}
      </div>
    </div>
  ) : (
    <div className="relative" onClick={onClickHandler}>
      {nowHour === hourStr && (
        <>
          <div
            className="w-3 h-3 absolute flex items-center bg-green-600 rounded-full -left-1.5 z-50"
            style={{
              transform: 'translateY(-7px)',
            }}
          ></div>
          <div
            className="w-full absolute bg-green-600"
            style={{ height: 2, marginTop: '-2px', zIndex: 51 }}
          />
        </>
      )}
    </div>
  );
};

export default TimelineCell;
