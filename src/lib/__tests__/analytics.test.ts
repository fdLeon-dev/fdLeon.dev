import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { analytics, trackEvent, trackPageView } from '../analytics'

// Mock window.gtag
const mockGtag = vi.fn()
const mockDataLayer: any[] = []

describe('Analytics', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    Object.defineProperty(window, 'gtag', {
      writable: true,
      value: mockGtag,
    })
    Object.defineProperty(window, 'dataLayer', {
      writable: true,
      value: mockDataLayer,
    })
  })

  afterEach(() => {
    mockDataLayer.length = 0
  })

  describe('trackEvent', () => {
    it('should call gtag with correct parameters', () => {
      trackEvent('test_action', 'test_category', 'test_label', 1)

      expect(mockGtag).toHaveBeenCalledWith('event', 'test_action', {
        event_category: 'test_category',
        event_label: 'test_label',
        value: 1,
      })
    })

    it('should handle optional parameters', () => {
      trackEvent('test_action', 'test_category')

      expect(mockGtag).toHaveBeenCalledWith('event', 'test_action', {
        event_category: 'test_category',
        event_label: undefined,
        value: undefined,
      })
    })

    it('should not call gtag when window is undefined', () => {
      // Mock window as undefined
      const originalWindow = global.window
      // @ts-ignore
      delete global.window

      trackEvent('test_action', 'test_category')

      expect(mockGtag).not.toHaveBeenCalled()

      // Restore window
      global.window = originalWindow
    })
  })

  describe('trackPageView', () => {
    it('should call gtag with page view parameters', () => {
      trackPageView('/test-page', 'Test Page')

      expect(mockGtag).toHaveBeenCalledWith('config', undefined, {
        page_location: '/test-page',
        page_title: 'Test Page',
      })
    })
  })

  describe('analytics object', () => {
    describe('trackNavigation', () => {
      it('should track navigation events', () => {
        analytics.trackNavigation('portfolio')

        expect(mockGtag).toHaveBeenCalledWith('event', 'navigation', {
          event_category: 'user_interaction',
          event_label: 'portfolio',
          value: undefined,
        })
      })
    })

    describe('trackFormSubmit', () => {
      it('should track successful form submission', () => {
        analytics.trackFormSubmit('contact_form', true)

        expect(mockGtag).toHaveBeenCalledWith('event', 'form_submit', {
          event_category: 'engagement',
          event_label: 'contact_form',
          value: 1,
        })
      })

      it('should track failed form submission', () => {
        analytics.trackFormSubmit('contact_form', false)

        expect(mockGtag).toHaveBeenCalledWith('event', 'form_error', {
          event_category: 'engagement',
          event_label: 'contact_form',
          value: 0,
        })
      })
    })

    describe('trackProjectClick', () => {
      it('should track project clicks', () => {
        analytics.trackProjectClick('Test Project', 'live')

        expect(mockGtag).toHaveBeenCalledWith('event', 'project_click', {
          event_category: 'portfolio',
          event_label: 'Test Project_live',
          value: undefined,
        })
      })
    })

    describe('trackContactClick', () => {
      it('should track contact method clicks', () => {
        analytics.trackContactClick('email')

        expect(mockGtag).toHaveBeenCalledWith('event', 'contact_click', {
          event_category: 'engagement',
          event_label: 'email',
          value: undefined,
        })
      })
    })

    describe('trackThemeToggle', () => {
      it('should track theme changes', () => {
        analytics.trackThemeToggle('dark')

        expect(mockGtag).toHaveBeenCalledWith('event', 'theme_toggle', {
          event_category: 'user_preference',
          event_label: 'dark',
          value: undefined,
        })
      })
    })

    describe('trackConversion', () => {
      it('should track conversions', () => {
        analytics.trackConversion('contact_form', 100)

        expect(mockGtag).toHaveBeenCalledWith('event', 'conversion', {
          event_category: 'business',
          event_label: 'contact_form',
          value: 100,
        })
      })
    })

    describe('trackError', () => {
      it('should track errors', () => {
        analytics.trackError('form_error', 'EmailJS failed')

        expect(mockGtag).toHaveBeenCalledWith('event', 'error', {
          event_category: 'technical',
          event_label: 'form_error_EmailJS failed',
          value: undefined,
        })
      })
    })
  })
})

