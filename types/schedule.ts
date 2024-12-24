export interface ScheduleItem {
  startTime: string;
  endTime: string;
  activity: string;
}

export interface DailySchedule {
  _id?: string;
  date: Date;
  isOnSchedule: boolean;
  reason?: string;
}

// 固定的作息时间表
export const DAILY_SCHEDULE: ScheduleItem[] = [
  { startTime: "10:00", endTime: "11:00", activity: "踢足球" },
  { startTime: "11:00", endTime: "12:00", activity: "学习" },
  { startTime: "12:00", endTime: "13:00", activity: "午餐" },
  // 可以继续添加更多时间段
];