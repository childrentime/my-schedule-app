'use client'

import { useState } from 'react'
import { DailySchedule } from '@/types/schedule'
import { getDateType, getDateTypeLabel } from '@/utils/holidayUtils'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

interface Props {
  records: DailySchedule[]
}

export default function RecordsTable({ records }: Props) {
  const router = useRouter()
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这条记录吗？')) {
      return
    }

    try {
      setDeleteLoading(id)
      const response = await fetch(`/api/schedule/${id}`, {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('删除失败')
      }

      router.refresh()
    } catch (error) {
      alert('删除失败，请重试')
    } finally {
      setDeleteLoading(null)
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">执行记录</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border dark:border-gray-700 p-2">日期</th>
              <th className="border dark:border-gray-700 p-2">类型</th>
              <th className="border dark:border-gray-700 p-2">是否按计划执行</th>
              <th className="border dark:border-gray-700 p-2">未执行原因</th>
              <th className="border dark:border-gray-700 p-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => {
              const date = new Date(record.date)
              const dateType = getDateType(date)
              const isDeleting = deleteLoading === record._id
              
              return (
                <tr key={record._id} className="dark:bg-gray-900">
                  <td className="border dark:border-gray-700 p-2">
                    {date.toLocaleDateString('zh-CN')}
                  </td>
                  <td className="border dark:border-gray-700 p-2">
                    {getDateTypeLabel(dateType, date)}
                  </td>
                  <td className="border dark:border-gray-700 p-2">
                    {record.isOnSchedule ? '是' : '否'}
                  </td>
                  <td className="border dark:border-gray-700 p-2">
                    {record.reason || '-'}
                  </td>
                  <td className="border dark:border-gray-700 p-2">
                    <button
                      onClick={() => record._id && handleDelete(record._id)}
                      disabled={isDeleting}
                      className={`p-1 rounded hover:bg-red-100 dark:hover:bg-red-900 transition-colors
                        ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                      title="删除记录"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}