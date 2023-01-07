import {
  TimelineCellType,
  TimelineEventTypes,
  UITimelineEventType,
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

export const getTimelineForDate = (dateTime: DateTime): TimelineCellType[] => {
  const hours = [];

  for (let i = 0; i <= 23; i++) {
    const hour = dateTime.plus({ hours: i });
    const hourAndQuarter = dateTime.plus({ hours: i, minutes: 15 });
    const hourAndHalf = dateTime.plus({ hours: i, minutes: 30 });
    const hourAndThreeQuarter = dateTime.plus({ hours: i, minutes: 45 });

    hours.push(hour, hourAndQuarter, hourAndHalf, hourAndThreeQuarter);
  }

  return hours.map((hour) => {
    return {
      id: hour.toString(),
      hour,
      hourStr: hour.minute === 0 ? hour.toFormat('ha') : hour.toFormat('h:ma'),
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
      application: null,
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

export const mapTimeslotsToTimeline = (
  timeslots: any[],
): UITimelineEventType[] => {
  return timeslots.map((timeslot) => {
    const { startsAt, endsAt, application } = timeslot;
    const start = DateTime.fromISO(startsAt);
    const end = DateTime.fromISO(endsAt);
    const duration = Math.abs(start.diff(end, 'hours').hours);

    return {
      id: timeslot.id,
      title: `Free time slot provided by candidate (click to schedule interview)`,
      startDate: start,
      endDate: end,
      startStr: start.toFormat('h:mma'),
      endStr: start.toFormat('h:mma'),
      type: TimelineEventTypes.SUBMITTED_SLOT,
      duration,
      application,
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
