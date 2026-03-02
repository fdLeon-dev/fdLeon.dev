import { NextResponse } from 'next/server'
import { getSorteoParticipantCount } from '@/lib/supabase'

export async function GET() {
  const result = await getSorteoParticipantCount()
  if (!result.success) {
    return NextResponse.json({ success: false, error: result.error }, { status: 500 })
  }

  return NextResponse.json({ success: true, count: result.count })
}
