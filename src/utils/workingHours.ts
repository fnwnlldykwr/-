import { WORKING_HOURS_SCHEDULE, WorkingDaySchedule } from '../data/companyData';

export interface AdenWorkStatus {
  dayIndex: number;
  dayNameAr: string;
  isOpen: boolean;
  statusLabel: string;
  statusDetail: string;
  adenTimeFormatted: string;
  todaySchedule: WorkingDaySchedule;
}

/**
 * Computes current working status in Aden local time (Asia/Aden, UTC+3).
 */
export function getAdenWorkStatus(now: Date = new Date()): AdenWorkStatus {
  // Aden is UTC+3 year-round (no DST)
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const adenDate = new Date(utcMs + 3 * 3600000);

  const dayIndex = adenDate.getDay(); // 0 = Sun ... 6 = Sat
  const hours = adenDate.getHours();
  const minutes = adenDate.getMinutes();
  const currentTotalMinutes = hours * 60 + minutes;

  const todaySchedule =
    WORKING_HOURS_SCHEDULE.find((d) => d.dayIndex === dayIndex) ||
    WORKING_HOURS_SCHEDULE[0];

  const openMinutes = todaySchedule.openHour * 60 + todaySchedule.openMinute;
  const closeMinutes = todaySchedule.closeHour * 60 + todaySchedule.closeMinute;

  const isOpen =
    currentTotalMinutes >= openMinutes && currentTotalMinutes < closeMinutes;

  const periodAr = hours >= 12 ? 'مساءً' : 'صباحاً';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  const paddedMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const adenTimeFormatted = `${hour12}:${paddedMin} ${periodAr}`;

  let statusDetail = '';
  if (isOpen) {
    statusDetail = `مفتوح الآن في عدن · يستمر الدوام اليوم حتى 10:00 مساءً`;
  } else if (currentTotalMinutes < openMinutes) {
    const openTimeLabel =
      todaySchedule.openHour === 16 ? '4:00 مساءً' : '9:00 صباحاً';
    statusDetail = `مغلق حالياً · يفتح اليوم ${todaySchedule.dayNameAr} الساعة ${openTimeLabel}`;
  } else {
    // After 10:00 PM
    const tomorrowIndex = (dayIndex + 1) % 7;
    const tomorrowSchedule =
      WORKING_HOURS_SCHEDULE.find((d) => d.dayIndex === tomorrowIndex) ||
      WORKING_HOURS_SCHEDULE[0];
    const tomorrowOpenLabel =
      tomorrowSchedule.openHour === 16 ? '4:00 مساءً' : '9:00 صباحاً';
    statusDetail = `مغلق حالياً · يفتح غداً (${tomorrowSchedule.dayNameAr}) الساعة ${tomorrowOpenLabel}`;
  }

  return {
    dayIndex,
    dayNameAr: todaySchedule.dayNameAr,
    isOpen,
    statusLabel: isOpen ? 'مفتوح الآن' : 'مغلق حالياً',
    statusDetail,
    adenTimeFormatted,
    todaySchedule,
  };
}
