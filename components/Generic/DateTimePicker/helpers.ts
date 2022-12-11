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

export const getTimeStampsForDay = (dateTime: DateTime) => {
  const interval = Interval.fromDateTimes(
    dateTime.startOf('day'),
    dateTime.endOf('day'),
  );

  const timeStamps = [];

  for (let i = 0; i < 24; i++) {
    const date = interval.start.plus({ hours: i });
    const halfHour = date.plus({ minutes: 30 });
    timeStamps.push(
      {
        id: date.toISO(),
        date,
        isSelected: (selectedDate: DateTime) =>
          date.hasSame(selectedDate, 'hour'),
      },
      {
        id: halfHour.toISO(),
        date: halfHour,
        isSelected: (selectedDate: DateTime) =>
          halfHour.hasSame(selectedDate, 'hour'),
      },
    );
  }

  return timeStamps;
};
