import { NextResponse } from 'next/server'
import { getSorteoParticipants } from '@/lib/supabase'

function participantsToCSV(participants: any[]) {
  if (!Array.isArray(participants)) return ''
  const fields = [
    'name',
    'email',
    'business',
    'phone',
    'created_at',
    'ip_address',
    'user_agent',
  ]

  const escape = (value: any) => {
    const str = value == null ? '' : String(value)
    // doble comillas dentro del campo se escapan duplicando
    return `"${str.replace(/"/g, '""')}"`
  }

  const header = fields.join(',')
  const rows = participants.map((p) =>
    fields.map((f) => escape(p[f])).join(',')
  )

  return [header, ...rows].join('\n')
}

export async function GET() {
  const result = await getSorteoParticipants()
  if (!result.success) {
    return NextResponse.json(
      { success: false, error: result.error || 'Error fetching participants' },
      { status: 500 }
    )
  }

  const csv = participantsToCSV(result.data || [])

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition':
        'attachment; filename="sorteo_participants.csv"',
    },
  })
}
