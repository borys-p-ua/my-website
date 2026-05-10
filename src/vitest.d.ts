declare module '@vitest/expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Assertion<T = unknown> {
    toHaveNoViolations(): void
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void
  }
}
