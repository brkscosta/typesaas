export class UserAlreadExistsError extends Error {
  constructor() {
    super('User already exists')
  }
}
