/// <reference types="vitest/globals" />
import '@testing-library/jest-dom'
import 'vitest-axe/extend-expect'
import * as vitestAxeMatchers from 'vitest-axe/matchers'
import { afterEach, expect } from 'vitest'

expect.extend(vitestAxeMatchers)

class IntersectionObserverMock implements IntersectionObserver {
  readonly root: Element | Document | null = null
  readonly rootMargin = ''
  readonly thresholds: ReadonlyArray<number> = []
  constructor(cb: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    void cb
    void options
  }
  disconnect() {}
  observe() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
  unobserve() {}
}

globalThis.IntersectionObserver = IntersectionObserverMock

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

// Node.js 22 exposes an experimental undefined `localStorage` global that
// overrides jsdom's. Replace it with a real in-memory implementation.
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string): string | null => store[key] ?? null,
    setItem: (key: string, value: string): void => {
      store[key] = value
    },
    removeItem: (key: string): void => {
      delete store[key]
    },
    clear: (): void => {
      store = {}
    },
    get length() {
      return Object.keys(store).length
    },
    key: (index: number): string | null => Object.keys(store)[index] ?? null,
  }
})()

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

afterEach(() => {
  localStorageMock.clear()
})

// axe-core attempts canvas color-contrast checks that jsdom doesn't support
HTMLCanvasElement.prototype.getContext = () => null
