import cx from 'classnames';
import { DateTime } from 'luxon';

type Props = {
  id: string;
  hourStr: string;
  isNewInterview?: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  setEvents: React.Dispatch<React.SetStateAction<any[]>>;
};

const TimelineCell = ({ hourStr, onClick, isNewInterview }: Props) => {
  const isHalf = hourStr.includes(':30');
  const nowHourFormat = DateTime.local().toFormat('ha');
  const nowMinutes = DateTime.local()
    .startOf('hour')
    .plus({ minutes: 30 })
    .toFormat('h:mma');

  const nowHour = DateTime.local().minute < 30 ? nowHourFormat : nowMinutes;

  return !isHalf ? (
    <div
      onClick={isNewInterview ? onClick : () => null}
      className={cx('relative', {
        '!border-t-2 !border-green-600': nowHour === hourStr,
      })}
    >
      {nowHour === hourStr && (
        <div
          style={{
            transform: 'translateY(-7px)',
          }}
          className="w-3 h-3 absolute bg-green-600 rounded-full -left-1.5"
        />
      )}
      <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
        {hourStr}
      </div>
    </div>
  ) : (
    <div
      className={cx('relative', {
        '!border-t-2 !border-green-600': nowHour === hourStr,
      })}
      onClick={isNewInterview ? onClick : () => null}
    >
      {nowHour === hourStr && (
        <div
          className="w-3 h-3 absolute bg-green-600 rounded-full -left-1.5"
          style={{
            transform: 'translateY(-7px)',
          }}
        />
      )}
    </div>
  );
};

export default TimelineCell;
