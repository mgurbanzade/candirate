import { TimelineCellType, UIInteviewType } from '@lib/ui-types';
import { DateTime, Interval } from 'luxon';

const lastMonthDaysDispatcher = {
  '1': 7,
  '2': 1,
  '3': 2,
  '4': 3,
  '5': 4,
  '6': 5,
  '7': 6,
};

export const getTimelineForDate = (dateTime: DateTime): TimelineCellType[] => {
  const hours = [];

  for (let i = 0; i <= 23; i++) {
    const hour = dateTime.plus({ hours: i });
    const hourAndHalf = dateTime.plus({ hours: i, minutes: 30 });

    hours.push(hour, hourAndHalf);
  }

  return hours.map((hour) => {
    return {
      id: hour.toString(),
      hour,
      hourStr: hour.minute === 30 ? hour.toFormat('h:ma') : hour.toFormat('ha'),
      events: [],
    };
  });
};

export const getDatePickerData = (dateTime: DateTime = DateTime.local()) => {
  const startOfMonth = dateTime.startOf('month');
  const weekDay = startOfMonth.weekday;
  const lastMonthDays = lastMonthDaysDispatcher[weekDay];
  const firstDayOfLastMonth = startOfMonth.minus({ days: lastMonthDays });
  const interval = Interval.fromDateTimes(
    firstDayOfLastMonth,
    firstDayOfLastMonth.plus({ days: 42 }),
  );

  const days = [];

  for (let i = 0; i < 42; i++) {
    const date = interval.start.plus({ days: i });
    days.push({
      id: date.toISO(),
      date,
      isWeekend: date.weekday === 6 || date.weekday === 7,
      isToday: date.hasSame(DateTime.local(), 'day'),
      isCurrentMonth: date.hasSame(dateTime, 'month'),
      isSelected: (selectedDate: DateTime) => date.hasSame(selectedDate, 'day'),
    });
  }

  return days;
};

const roundToNearestHalfHour = (minutes: number) => {
  return Math.ceil(minutes / 30) * 30;
};

export const mapInterviewsToTimeline = (
  interviews: any[],
): UIInteviewType[] => {
  return interviews.map((interview) => {
    const start = DateTime.fromISO(interview.startsAt);
    const end = DateTime.fromISO(interview.endsAt);

    return {
      id: interview.id,
      uuid: interview.uuid,
      application: null,
      description: interview.description,
      startDate: start,
      title: interview.title,
      startStr: start.toFormat('h:mma'),
      duration: roundToNearestHalfHour(end.diff(start, 'minutes').minutes) / 60,
    };
  });
};
