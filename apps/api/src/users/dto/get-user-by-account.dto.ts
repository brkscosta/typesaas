export class GetUserByAccountOrEmailDto {
  constructor(
    public provider?: string,
    public providerAccountId?: string,
    public email?: string | null,
  ) {
    this.provider_providerAccountId = { provider, providerAccountId }
  }

  provider_providerAccountId: {
    provider?: string
    providerAccountId?: string
  }
}
