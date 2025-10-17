import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@/test/utils'
import userEvent from '@testing-library/user-event'
import { ThemeToggle } from '../theme-toggle'

// Mock analytics
vi.mock('@/lib/analytics', () => ({
  analytics: {
    trackThemeToggle: vi.fn(),
  },
}))

describe('ThemeToggle', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders theme toggle button', () => {
    render(<ThemeToggle />)

    const button = screen.getByRole('button', { name: /cambiar tema/i })
    expect(button).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<ThemeToggle />)

    const button = screen.getByRole('button', { name: /cambiar tema/i })
    expect(button).toHaveAttribute('aria-label', 'Cambiar tema')
  })

  it('tracks theme toggle when clicked', async () => {
    const { analytics } = await import('@/lib/analytics')

    render(<ThemeToggle />)

    const button = screen.getByRole('button', { name: /cambiar tema/i })
    await user.click(button)

    expect(analytics.trackThemeToggle).toHaveBeenCalledWith('dark')
  })

  it('shows sun icon in light mode', () => {
    render(<ThemeToggle />)

    const sunIcon = screen.getByRole('button').querySelector('[data-testid="sun-icon"]')
    expect(sunIcon).toBeInTheDocument()
  })
})

