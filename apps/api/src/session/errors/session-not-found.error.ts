export class SessionNotFoundError extends Error {
  constructor(message?: string) {
    super(message ?? 'Session not found')
    this.name = 'SessionNotFoundError'
  }
}
