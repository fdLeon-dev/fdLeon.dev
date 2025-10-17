import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@/test/utils'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '../contact-form'

// Mock EmailJS
vi.mock('@/lib/emailjs', () => ({
  initEmailJS: vi.fn(),
  sendEmail: vi.fn(),
}))

describe('ContactForm', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders form fields correctly', () => {
    render(<ContactForm />)

    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/asunto/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    render(<ContactForm />)

    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i })
    await user.click(submitButton)

    expect(screen.getByText(/el nombre es requerido/i)).toBeInTheDocument()
    expect(screen.getByText(/el email es requerido/i)).toBeInTheDocument()
    expect(screen.getByText(/el asunto es requerido/i)).toBeInTheDocument()
    expect(screen.getByText(/el mensaje es requerido/i)).toBeInTheDocument()
  })

  it('validates email format', async () => {
    render(<ContactForm />)

    const emailInput = screen.getByLabelText(/email/i)
    await user.type(emailInput, 'invalid-email')

    fireEvent.blur(emailInput)

    await waitFor(() => {
      expect(screen.getByText(/por favor ingresa un email válido/i)).toBeInTheDocument()
    })
  })

  it('validates minimum length for name', async () => {
    render(<ContactForm />)

    const nameInput = screen.getByLabelText(/nombre completo/i)
    await user.type(nameInput, 'A')

    fireEvent.blur(nameInput)

    await waitFor(() => {
      expect(screen.getByText(/el nombre debe tener al menos 2 caracteres/i)).toBeInTheDocument()
    })
  })

  it('validates minimum length for message', async () => {
    render(<ContactForm />)

    const messageInput = screen.getByLabelText(/mensaje/i)
    await user.type(messageInput, 'Short')

    fireEvent.blur(messageInput)

    await waitFor(() => {
      expect(screen.getByText(/el mensaje debe tener al menos 10 caracteres/i)).toBeInTheDocument()
    })
  })

  it('shows character count for message', async () => {
    render(<ContactForm />)

    const messageInput = screen.getByLabelText(/mensaje/i)
    await user.type(messageInput, 'This is a test message')

    expect(screen.getByText(/23\/1000/)).toBeInTheDocument()
  })

  it('disables submit button when form has errors', async () => {
    render(<ContactForm />)

    const nameInput = screen.getByLabelText(/nombre completo/i)
    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i })

    // Initially disabled due to empty fields
    expect(submitButton).toBeDisabled()

    // Type invalid name
    await user.type(nameInput, 'A')
    fireEvent.blur(nameInput)

    await waitFor(() => {
      expect(submitButton).toBeDisabled()
    })
  })

  it('enables submit button when form is valid', async () => {
    render(<ContactForm />)

    const nameInput = screen.getByLabelText(/nombre completo/i)
    const emailInput = screen.getByLabelText(/email/i)
    const subjectInput = screen.getByLabelText(/asunto/i)
    const messageInput = screen.getByLabelText(/mensaje/i)
    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(subjectInput, 'Test Subject')
    await user.type(messageInput, 'This is a test message with enough characters')

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled()
    })
  })

  it('calls onSuccess callback when form is submitted successfully', async () => {
    const { sendEmail } = await import('@/lib/emailjs')
    vi.mocked(sendEmail).mockResolvedValue({ success: true, result: {} })

    const onSuccess = vi.fn()
    render(<ContactForm onSuccess={onSuccess} />)

    const nameInput = screen.getByLabelText(/nombre completo/i)
    const emailInput = screen.getByLabelText(/email/i)
    const subjectInput = screen.getByLabelText(/asunto/i)
    const messageInput = screen.getByLabelText(/mensaje/i)
    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(subjectInput, 'Test Subject')
    await user.type(messageInput, 'This is a test message with enough characters')

    await user.click(submitButton)

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled()
    })
  })

  it('calls onError callback when form submission fails', async () => {
    const { sendEmail } = await import('@/lib/emailjs')
    vi.mocked(sendEmail).mockResolvedValue({ success: false, error: 'Test error' })

    const onError = vi.fn()
    render(<ContactForm onError={onError} />)

    const nameInput = screen.getByLabelText(/nombre completo/i)
    const emailInput = screen.getByLabelText(/email/i)
    const subjectInput = screen.getByLabelText(/asunto/i)
    const messageInput = screen.getByLabelText(/mensaje/i)
    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(subjectInput, 'Test Subject')
    await user.type(messageInput, 'This is a test message with enough characters')

    await user.click(submitButton)

    await waitFor(() => {
      expect(onError).toHaveBeenCalled()
    })
  })

  it('shows loading state during submission', async () => {
    const { sendEmail } = await import('@/lib/emailjs')
    vi.mocked(sendEmail).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ success: true, result: {} }), 100))
    )

    render(<ContactForm />)

    const nameInput = screen.getByLabelText(/nombre completo/i)
    const emailInput = screen.getByLabelText(/email/i)
    const subjectInput = screen.getByLabelText(/asunto/i)
    const messageInput = screen.getByLabelText(/mensaje/i)
    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(subjectInput, 'Test Subject')
    await user.type(messageInput, 'This is a test message with enough characters')

    await user.click(submitButton)

    expect(screen.getByText(/enviando mensaje/i)).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
  })

  it('has proper accessibility attributes', () => {
    render(<ContactForm />)

    const nameInput = screen.getByLabelText(/nombre completo/i)
    const emailInput = screen.getByLabelText(/email/i)
    const subjectInput = screen.getByLabelText(/asunto/i)
    const messageInput = screen.getByLabelText(/mensaje/i)

    expect(nameInput).toHaveAttribute('required')
    expect(emailInput).toHaveAttribute('required')
    expect(subjectInput).toHaveAttribute('required')
    expect(messageInput).toHaveAttribute('required')

    expect(nameInput).toHaveAttribute('aria-invalid', 'false')
    expect(emailInput).toHaveAttribute('aria-invalid', 'false')
    expect(subjectInput).toHaveAttribute('aria-invalid', 'false')
    expect(messageInput).toHaveAttribute('aria-invalid', 'false')
  })
})

