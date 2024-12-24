import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const client = await clientPromise
    const db = client.db("scheduleDB")
    
    const result = await db.collection("schedules").deleteOne({
      _id: new ObjectId(params.id)
    })
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: '记录不存在' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '删除失败' },
      { status: 500 }
    )
  }
}