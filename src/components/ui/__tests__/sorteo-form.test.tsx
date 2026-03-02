import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@/test/utils'
import userEvent from '@testing-library/user-event'
import { SorteoForm } from '../sorteo-form'

describe('SorteoForm', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
    // stub global fetch
    vi.stubGlobal('fetch', vi.fn())
  })

  it('renders inputs and submit button', () => {
    render(<SorteoForm />)

    expect(screen.getByLabelText(/nombre \*/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email \*/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/nombre del negocio \*/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/teléfono \(opcional\)/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /participar en el sorteo/i })).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    render(<SorteoForm />)
    const submitBtn = screen.getByRole('button', { name: /participar/i })
    await user.click(submitBtn)

    expect(screen.getByText(/el nombre es requerido/i)).toBeInTheDocument()
    expect(screen.getByText(/el email es requerido/i)).toBeInTheDocument()
    expect(screen.getByText(/el nombre del negocio es requerido/i)).toBeInTheDocument()
  })

  it('validates phone format when provided', async () => {
    render(<SorteoForm />)
    const phoneInput = screen.getByLabelText(/teléfono \(opcional\)/i)
    await user.type(phoneInput, 'abc123')
    fireEvent.blur(phoneInput)

    await waitFor(() => {
      expect(screen.getByText(/teléfono contiene caracteres inválidos/i)).toBeInTheDocument()
    })
  })

  it('shows email format error', async () => {
    render(<SorteoForm />)
    const emailInput = screen.getByLabelText(/email \*/i)
    await user.type(emailInput, 'not-an-email')
    fireEvent.blur(emailInput)

    await waitFor(() => {
      expect(screen.getByText(/el email no es válido/i)).toBeInTheDocument()
    })
  })

  it('submits form and calls onSuccess when api returns success', async () => {
    const mockFetch = vi.mocked(global.fetch as any)
    mockFetch.mockResolvedValue({
      status: 200,
      json: async () => ({ success: true }),
    } as any)

    const onSuccess = vi.fn()
    render(<SorteoForm onSuccess={onSuccess} />)

    await user.type(screen.getByLabelText(/nombre \*/i), 'Juan')
    await user.type(screen.getByLabelText(/email \*/i), 'juan@example.com')
    await user.type(screen.getByLabelText(/nombre del negocio \*/i), 'MiNegocio')

    await user.click(screen.getByRole('button', { name: /participar/i }))

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled()
    })
  })

  it('handles duplicate email error', async () => {
    const mockFetch = vi.mocked(global.fetch as any)
    mockFetch.mockResolvedValue({
      status: 409,
      json: async () => ({ error: 'El email ya está registrado' }),
    } as any)

    render(<SorteoForm />)
    await user.type(screen.getByLabelText(/nombre \*/i), 'Juan')
    await user.type(screen.getByLabelText(/email \*/i), 'juan@example.com')
    await user.type(screen.getByLabelText(/nombre del negocio \*/i), 'MiNegocio')
    await user.click(screen.getByRole('button', { name: /participar/i }))

    await waitFor(() => {
      expect(screen.getByText(/ya está registrado/i)).toBeInTheDocument()
    })
  })
})
