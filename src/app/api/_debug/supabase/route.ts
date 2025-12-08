import { NextResponse } from 'next/server'
import { supabase, getServiceRoleClient } from '@/lib/supabase'

export async function GET() {
  try {
    const serviceClient = getServiceRoleClient()
    const usingService = !!serviceClient

    // Helper to run a simple count query against a table
    const runCount = async (client: any, table: string) => {
      try {
        const res = await client.from(table).select('id', { count: 'exact', head: true })
        return { success: true, count: (res.count as number) || 0 }
      } catch (err: any) {
        return { success: false, error: err?.message ?? String(err) }
      }
    }

    // Check both clients when possible
    const checks: Record<string, any> = {
      usingServiceClient: usingService,
      publicClientUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || null,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    }

    const tablesToCheck = ['sorteo_participants', 'contact_messages', 'blog_subscribers']

    // Run checks with the public client
    for (const t of tablesToCheck) {
      // @ts-ignore
      checks[`public_${t}`] = await runCount(supabase, t)
    }

    // If service client available, run checks too
    if (serviceClient) {
      for (const t of tablesToCheck) {
        // @ts-ignore
        checks[`service_${t}`] = await runCount(serviceClient, t)
      }
    }

    return NextResponse.json({ success: true, checks })
  } catch (error: any) {
    console.error('Debug supabase endpoint error:', error)
    return NextResponse.json({ success: false, error: error?.message ?? String(error) }, { status: 500 })
  }
}
