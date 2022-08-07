import { WeekDaysEnum } from 'src/entities/openinig-hours/week-days.enum';

export const normalizeDayWeeks = (dayWeek: string) => {
  const dayWeekNormalized = dayWeek.toLowerCase();
  let dayWeekSerialized = '';

  switch (dayWeekNormalized) {
    case 'segunda' || 'seg':
      dayWeekSerialized = WeekDaysEnum.MONDAY;
      break;

    case 'terça' || 'ter':
      dayWeekSerialized = WeekDaysEnum.TUESDAY;
      break;

    case 'quarta' || 'qua':
      dayWeekSerialized = WeekDaysEnum.WEDNESDAY;
      break;

    case 'quinta' || 'qui':
      dayWeekSerialized = WeekDaysEnum.THURSDAY;
      break;

    case 'sexta' || 'sex':
      dayWeekSerialized = WeekDaysEnum.FRIDAY;
      break;

    case 'sabado' || 'sab':
      dayWeekSerialized = WeekDaysEnum.SATURDAY;
      break;

    case 'domingo' || 'dom':
      dayWeekSerialized = WeekDaysEnum.SUNDAY;
      break;
  }

  return dayWeekSerialized;
};
