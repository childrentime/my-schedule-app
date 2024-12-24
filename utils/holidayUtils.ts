// src/utils/holidayUtils.ts

// 使用简单的算法判断是否是节假日
export function isHoliday(date: Date): boolean {
  const month = date.getMonth() + 1; // 0-11 转换为 1-12
  const day = date.getDate();
  
  // 元旦（1月1日）
  if (month === 1 && day === 1) return true;
  
  // 劳动节（5月1日）
  if (month === 5 && day === 1) return true;
  
  // 国庆节（10月1日-7日）
  if (month === 10 && day >= 1 && day <= 7) return true;
  
  // 春节假期（农历新年，大约在1月底或2月初，简单处理）
  if ((month === 1 && day >= 21) || (month === 2 && day <= 20)) return true;
  
  // 清明节（4月4日前后）
  if (month === 4 && day >= 4 && day <= 6) return true;
  
  // 端午节（农历五月初五，大约在6月）
  if (month === 6 && day >= 10 && day <= 12) return true;
  
  // 中秋节（农历八月十五，大约在9月中旬）
  if (month === 9 && day >= 15 && day <= 17) return true;
  
  return false;
}

// 获取节假日名称
export function getHolidayName(date: Date): string | null {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  if (month === 1 && day === 1) return "元旦";
  if (month === 5 && day === 1) return "劳动节";
  if (month === 10 && day >= 1 && day <= 7) return "国庆节";
  if ((month === 1 && day >= 21) || (month === 2 && day <= 20)) return "春节";
  if (month === 4 && day >= 4 && day <= 6) return "清明节";
  if (month === 6 && day >= 10 && day <= 12) return "端午节";
  if (month === 9 && day >= 15 && day <= 17) return "中秋节";
  
  return null;
}

// 获取日期类型
export type DateType = 'HOLIDAY' | 'REGULAR_WORKDAY' | 'GYM_WORKDAY' | 'WEEKEND';

export function getDateType(date: Date): DateType {
  // 先检查是否是节假日
  if (isHoliday(date)) {
    return 'HOLIDAY';
  }
  
  const dayOfWeek = date.getDay(); // 0是周日，1-6是周一到周六
  
  // 检查是否是周末
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return 'WEEKEND';
  }
  
  // 健身日（周三和周五）
  if (dayOfWeek === 3 || dayOfWeek === 5) {
    return 'GYM_WORKDAY';
  }
  
  // 其他工作日
  return 'REGULAR_WORKDAY';
}

// 获取日期类型的中文描述
export function getDateTypeLabel(type: DateType, date: Date): string {
  if (type === 'HOLIDAY') {
    const holidayName = getHolidayName(date);
    return holidayName ? `${holidayName}假期` : '节假日';
  }

  const typeLabels: Record<DateType, string> = {
    'REGULAR_WORKDAY': '普通工作日（周一、二、四）',
    'GYM_WORKDAY': '健身工作日（周三、五）',
    'WEEKEND': '周末',
    'HOLIDAY': '节假日'
  };
  
  return typeLabels[type];
}