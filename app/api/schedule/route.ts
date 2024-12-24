import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { DailySchedule } from '@/types/schedule'
import { ObjectId } from 'mongodb'

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("scheduleDB")
    
    const body = await req.json()
    const { isOnSchedule, reason } = body
    
    const schedule: Partial<DailySchedule> = {
      date: new Date(),
      isOnSchedule,
      reason: reason || undefined
    }
    
    // 检查今天是否已经有记录
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const existingRecord = await db.collection("schedules").findOne({
      date: {
        $gte: today,
        $lt: tomorrow
      }
    })

    if (existingRecord) {
      // 更新今天的记录
      const result = await db.collection("schedules").updateOne(
        { _id: existingRecord._id },
        { $set: schedule }
      )
      return NextResponse.json({ success: true, id: existingRecord._id })
    } else {
      // 创建新记录
      const result = await db.collection("schedules").insertOne(schedule as any)
      return NextResponse.json({ success: true, id: result.insertedId })
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '保存记录失败' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("scheduleDB")
    
    const schedules = await db
      .collection("schedules")
      .find({})
      .sort({ date: -1 })
      .limit(30)
      .toArray()
    
    return NextResponse.json(schedules)
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '获取记录失败' },
      { status: 500 }
    )
  }
}