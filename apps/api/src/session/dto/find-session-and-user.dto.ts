import type { AdapterSession, AdapterUser } from '@typesaas/schemas'

export class FindSessionAndUserDto {
  public constructor(
    public adapterSession: AdapterSession,
    public adapterUser: AdapterUser,
  ) {}
}
