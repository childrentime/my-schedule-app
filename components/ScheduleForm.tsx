'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ScheduleForm() {
  const router = useRouter()
  const [isOnSchedule, setIsOnSchedule] = useState(true)
  const [reason, setReason] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isOnSchedule,
          reason: !isOnSchedule ? reason : undefined,
        }),
      })

      if (!res.ok) throw new Error('提交失败')
      
      setReason('')
      router.refresh()
    } catch (error) {
      alert('提交失败，请重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">今日记录</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">
            <input
              type="checkbox"
              checked={isOnSchedule}
              onChange={(e) => setIsOnSchedule(e.target.checked)}
              className="mr-2"
            />
            今天是否按计划执行？
          </label>
        </div>

        {!isOnSchedule && (
          <div>
            <label className="block mb-2">未执行原因：</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isSubmitting ? '提交中...' : '提交'}
        </button>
      </form>
    </div>
  )
}