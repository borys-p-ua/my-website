import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useScrollSpy } from './useScrollSpy'

describe('useScrollSpy', () => {
  let triggerIntersection: IntersectionObserverCallback

  beforeEach(() => {
    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn().mockImplementation((cb: IntersectionObserverCallback) => {
        triggerIntersection = cb
        return { observe: vi.fn(), disconnect: vi.fn(), unobserve: vi.fn() }
      })
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should return null initially', () => {
    const { result } = renderHook(() => useScrollSpy(['about', 'skills']))
    expect(result.current).toBeNull()
  })

  it('should return the id of an intersecting element', () => {
    const el = document.createElement('section')
    el.id = 'about'
    document.body.appendChild(el)

    const { result } = renderHook(() => useScrollSpy(['about']))

    act(() => {
      triggerIntersection(
        [{ target: el, isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })

    expect(result.current).toBe('about')
    document.body.removeChild(el)
  })

  it('should not update activeId when element is not intersecting', () => {
    const el = document.createElement('section')
    el.id = 'skills'
    document.body.appendChild(el)

    const { result } = renderHook(() => useScrollSpy(['skills']))

    act(() => {
      triggerIntersection(
        [{ target: el, isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })

    expect(result.current).toBeNull()
    document.body.removeChild(el)
  })

  it('should disconnect the observer on unmount', () => {
    const disconnect = vi.fn()
    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn().mockImplementation((cb: IntersectionObserverCallback) => {
        triggerIntersection = cb
        return { observe: vi.fn(), disconnect, unobserve: vi.fn() }
      })
    )

    const { unmount } = renderHook(() => useScrollSpy(['about']))
    unmount()

    expect(disconnect).toHaveBeenCalledOnce()
  })
})
