export class ProviderAccountIdOrEmailMissingError extends Error {
  constructor() {
    super('ProviderAccountId or Email missing')
    this.name = 'ProviderAccountIdOrEmailMissingError'
  }
}
