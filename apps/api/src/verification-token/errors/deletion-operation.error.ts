export class DeletionOperationError extends Error {
  constructor() {
    super('An error occurred while deleting the verification token.')
  }
}
