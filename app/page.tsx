import ScheduleDisplay from '@/components/ScheduleDisplay'
import RecordsTable from '@/components/RecordsTable'
import ScheduleForm from '@/components/ScheduleForm'
import { DailySchedule } from '@/types/schedule'

async function getScheduleRecords(): Promise<DailySchedule[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schedule`, {
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('Failed to fetch schedule records')
  return res.json()
}

export default async function Home() {
  const records = await getScheduleRecords()

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">我的作息管理</h1>
      <ScheduleDisplay />
      <ScheduleForm />
      <RecordsTable records={records} />
    </main>
  )
}