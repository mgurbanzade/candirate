import cx from 'classnames';
import { ClockIcon } from '@heroicons/react/20/solid';
import { DateTime } from 'luxon';

type Props = {
  id: string;
  hourStr: string;
  isNewInterview?: boolean;
  isTimeslotMode?: boolean;
  hour: DateTime;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  setEvents: React.Dispatch<React.SetStateAction<any[]>>;
  isFreeTimeslot: boolean;
};

const TimelineCell = ({
  hour,
  hourStr,
  onClick,
  isNewInterview,
  isTimeslotMode,
  isFreeTimeslot,
}: Props) => {
  const isWhole = !hourStr.includes(':');
  const nowHourFormat = DateTime.local().toFormat('ha');
  const nowMinutes = DateTime.local()
    .startOf('hour')
    .plus({ minutes: 15 })
    .toFormat('h:mma');

  const nowHour = DateTime.local().minute === 0 ? nowHourFormat : nowMinutes;

  const onClickHandler =
    isNewInterview || isTimeslotMode ? onClick : () => null;

  const isToday = hour.hasSame(DateTime.local(), 'day');

  return isWhole ? (
    <div
      onClick={onClickHandler}
      className={cx('relative', {
        'bg-lime-50': isFreeTimeslot,
      })}
      style={{
        marginLeft: 1,
      }}
    >
      {isFreeTimeslot && (
        <div className="flex items-center justify-center absolute top-0 bottom-0 left-0 right-0 m-auto text-xs text-center text-lime-700">
          <ClockIcon className="w-3 h-3 mr-1 text-lime-500" />
          <div>Free time slot provided by candidate</div>
        </div>
      )}
      {nowHour === hourStr && isToday && (
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
    <div
      className={cx('relative', {
        'bg-lime-50': isFreeTimeslot,
      })}
      style={{
        marginLeft: 1,
      }}
      onClick={onClickHandler}
    >
      {isFreeTimeslot && (
        <div className="flex items-center justify-center absolute top-0 bottom-0 left-0 right-0 m-auto text-xs text-center text-lime-700">
          <ClockIcon className="w-3 h-3 mr-1 text-lime-500" />
          <div>Free time slot provided by candidate</div>
        </div>
      )}
      {nowHour === hourStr && isToday && (
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
