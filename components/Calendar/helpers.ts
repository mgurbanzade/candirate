import {
  TimelineCellType,
  TimelineEventTypes,
  UITimelineEventType,
  MappedTimeslotType,
} from '@lib/ui-types';
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

export const getTimelineForDate = (
  dateTime: DateTime,
  timeslots?: MappedTimeslotType[],
): TimelineCellType[] => {
  const hours = [];

  for (let i = 0; i <= 23; i++) {
    const hour = dateTime.plus({ hours: i });
    const hourAndQuarter = dateTime.plus({ hours: i, minutes: 15 });
    const hourAndHalf = dateTime.plus({ hours: i, minutes: 30 });
    const hourAndThreeQuarter = dateTime.plus({ hours: i, minutes: 45 });

    hours.push(hour, hourAndQuarter, hourAndHalf, hourAndThreeQuarter);
  }

  return hours.map((hour) => {
    const isTimeslot = timeslots?.find((timeslot) => {
      const hourIsBetween =
        hour >= timeslot.startDate && hour < timeslot.endDate;

      return hourIsBetween;
    });

    return {
      id: hour.toString(),
      hour,
      hourStr: hour.minute === 0 ? hour.toFormat('ha') : hour.toFormat('h:ma'),
      events: [],
      isFreeTimeslot: !!isTimeslot,
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

const roundToNearestQuarter = (minutes: number) => {
  return Math.ceil(minutes / 15) * 15;
};

export const mapInterviewsToTimeline = (
  interviews: any[],
): UITimelineEventType[] => {
  return interviews.map((interview) => {
    const start = DateTime.fromISO(interview.startsAt);
    const end = DateTime.fromISO(interview.endsAt);

    return {
      id: interview.id,
      uuid: interview.uuid,
      hiringStepId: interview.hiringStepId,
      status: interview.status,
      application: null,
      applicationId: interview.applicationId,
      description: interview.description,
      startDate: start,
      endDate: end,
      type: TimelineEventTypes.INTERVIEW,
      title: interview.title,
      startStr: start.toFormat('h:mma'),
      endStr: end.toFormat('h:mma'),
      duration: roundToNearestQuarter(end.diff(start, 'minutes').minutes) / 60,
    };
  });
};

export const getDaysForWeek = (dateTime: DateTime = DateTime.local()) => {
  const days = [];
  const startOfWeek = dateTime.startOf('week');

  for (let i = 0; i <= 6; i++) {
    const date = startOfWeek.plus({ days: i });
    days.push({
      id: date.toISO(),
      date,
      isWeekend: date.weekday === 6 || date.weekday === 7,
      isToday: date.hasSame(DateTime.local(), 'day'),
      isSelected: (selectedDate: DateTime) => date.hasSame(selectedDate, 'day'),
    });
  }

  return days;
};
