import { describe, it, expect, vi } from 'vitest'
import { GET } from '../route'
import * as supabase from '@/lib/supabase'

// helper to simulate a Next.js Request object (not really used by our GET)
const fakeRequest = new Request('http://localhost')

describe('sorteo export API', () => {
  it('returns csv when there are participants', async () => {
    const mockData = [
      { name: 'Alice', email: 'a@example.com', business: 'Acme', phone: '123', created_at: '2025-01-01', ip_address: '1.2.3.4', user_agent: 'ua' },
      { name: 'Bob', email: 'b@example.com', business: '', phone: '', created_at: '2025-01-02' },
    ]

    vi.stubObject(supabase, {
      getSorteoParticipants: vi.fn().mockResolvedValue({ success: true, data: mockData }),
    })

    const res = await GET()
    const text = await res.text()

    expect(res.headers.get('content-type')).toContain('text/csv')
    expect(text).toContain('name,email,business,phone,created_at,ip_address,user_agent')
    expect(text).toContain('Alice')
    expect(text).toContain('Bob')
  })

  it('returns error response when supabase fails', async () => {
    vi.stubObject(supabase, {
      getSorteoParticipants: vi.fn().mockResolvedValue({ success: false, error: 'oops' }),
    })

    const res = await GET()
    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body.error).toBe('oops')
  })
})
