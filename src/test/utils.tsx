import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from 'next-themes'

// Mock theme provider for testing
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// Test utilities
export const createMockProject = (overrides = {}) => ({
  id: 'test-project',
  title: 'Test Project',
  description: 'A test project description',
  image: '/test-image.jpg',
  images: ['/test-image.jpg'],
  technologies: ['React', 'TypeScript'],
  category: 'web' as const,
  liveUrl: 'https://test.com',
  githubUrl: 'https://github.com/test',
  featured: true,
  completed: '2024-01-01',
  client: 'Test Client',
  ...overrides,
})

export const createMockContactForm = (overrides = {}) => ({
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Test Subject',
  message: 'This is a test message',
  ...overrides,
})

