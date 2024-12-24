'use client'

import { useState } from 'react'
import { ScheduleItem } from '@/types/schedule'
import { getDateType, getDateTypeLabel, DateType } from '@/utils/holidayUtils'

// 不同类型日期的作息时间表
const SCHEDULE_TEMPLATES: Record<DateType, ScheduleItem[]> = {
  'REGULAR_WORKDAY': [
    { startTime: "08:00", endTime: "08:30", activity: "起床" },
    { startTime: "09:30", endTime: "21:00", activity: "工作" },
    { startTime: "21:00", endTime: "24:00", activity: "休息" }
  ],
  'GYM_WORKDAY': [
    { startTime: "08:00", endTime: "08:30", activity: "起床" },
    { startTime: "09:30", endTime: "19:00", activity: "工作" },
    { startTime: "19:00", endTime: "21:00", activity: "健身" },
    { startTime: "21:00", endTime: "24:00", activity: "休息" }
  ],
  'WEEKEND': [
    { startTime: "09:00", endTime: "10:00", activity: "起床" },
    { startTime: "14:00", endTime: "15:00", activity: "健身" },
    { startTime: "15:00", endTime: "24:00", activity: "自由安排" }
  ],
  'HOLIDAY': [
    { startTime: "自由", endTime: "自由", activity: "假期自由安排" }
  ]
};

export default function ScheduleDisplay() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  
  const date = new Date(selectedDate)
  const dateType = getDateType(date)
  const schedule = SCHEDULE_TEMPLATES[dateType]

  return (
    <div className="mb-8">
      <div className="mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-700"
        />
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          日期类型：{getDateTypeLabel(dateType, date)}
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border dark:border-gray-700 p-2 text-left">时间</th>
              <th className="border dark:border-gray-700 p-2 text-left">活动</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item, index) => (
              <tr key={index} className="dark:bg-gray-900">
                <td className="border dark:border-gray-700 p-2">
                  {item.startTime} - {item.endTime}
                </td>
                <td className="border dark:border-gray-700 p-2">{item.activity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}