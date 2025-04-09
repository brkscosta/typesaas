import { env } from '@typesaas/env'
import type { Adapter, AdapterAccount, AdapterSession, AdapterUser, VerificationToken } from 'next-auth/adapters'

export const createAuthPrismaAdapter = (): Adapter => ({
  createUser: async (data: AdapterUser): Promise<AdapterUser> => {
    const response = await fetch(`${env.BACKEND_URL}/api/v1/users/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return await response.json()
  },
  getUser: async (id): Promise<AdapterUser | null> => {
    const response = await fetch(`${env.BACKEND_URL}/api/v1/users/${id}`, {
      next: {
        revalidate: 10,
      },
    })

    if (!response.ok) {
      return null
    }
    console.log('createAuthPrismaAdapter::getUser', id)
    return await response.json()
  },
  getUserByEmail: async (email): Promise<AdapterUser | null> => {
    const response = await fetch(`${env.BACKEND_URL}/api/v1/users/filter?email=${email}`)

    if (!response.ok) {
      return null
    }
    return await response.json()
  },
  getUserByAccount: async (provider_providerAccountId): Promise<AdapterUser | null> => {
    const { provider, providerAccountId } = provider_providerAccountId

    const response = await fetch(
      `${env.BACKEND_URL}/api/v1/users/filter?provider=${provider}&providerAccountId=${providerAccountId}`,
    )

    if (!response.ok) {
      return null
    }

    const data = await response.json()

    console.log('createAuthPrismaAdapter::getUserByAccount', data)

    return data
  },
  updateUser: async ({ id, ...data }): Promise<AdapterUser> => {
    const response = await fetch(`${env.BACKEND_URL}/api/v1/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    console.log('createAuthPrismaAdapter::getUserByAccount', id, data)

    return await response.json()
  },
  deleteUser: async (id): Promise<AdapterUser | null> => {
    const response = await fetch(`${env.BACKEND_URL}/api/v1/users/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      return null
    }
    console.log('createAuthPrismaAdapter::deleteUser', id)
    return await response.json()
  },
  linkAccount: async (data: AdapterAccount): Promise<AdapterAccount | null> => {
    const response = await fetch(`${env.BACKEND_URL}/api/v1/users/link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      return null
    }

    console.log('createAuthPrismaAdapter::linkAccount', data)
    return await response.json()
  },
  unlinkAccount: async ({
    provider,
    providerAccountId,
  }: Pick<AdapterAccount, 'provider' | 'providerAccountId'>): Promise<AdapterAccount | undefined> => {
    console.log('unlinkAccount', provider, providerAccountId)
    const response = await fetch(`${env.BACKEND_URL}/api/v1/users/unlink`, {
      method: 'PATCH',
      body: JSON.stringify({ provider, providerAccountId }),
    })

    if (!response.ok) {
      return undefined
    }
    console.log('createAuthPrismaAdapter::unlinkAccount', provider, providerAccountId)
    return await response.json()
  },
  getSessionAndUser: async (
    sessionToken,
  ): Promise<{
    session: AdapterSession
    user: AdapterUser
  } | null> => {
    const response = await fetch(`${env.BACKEND_URL}/api/v1/sessions/${sessionToken}`)

    if (!response.ok) return null

    const data = await response.json()

    return {
      session: {
        ...data.session,
        expires: new Date(data.session.expires),
      },
      user: data.user,
    }
  },
  createSession: async (data): Promise<AdapterSession> => {
    const response = await fetch(`${env.BACKEND_URL}/api/v1/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      return null as unknown as AdapterSession
    }

    const session = (await response.json()) as AdapterSession

    const sessionCopy = {
      ...session,
      expires: new Date(session.expires),
    }

    return sessionCopy
  },
  updateSession: async (data): Promise<AdapterSession | null> => {
    const { ok, json } = await fetch(`${env.BACKEND_URL}/api/v1/sessions/${data.sessionToken}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!ok) return null

    return await json()
  },
  deleteSession: async (sessionToken): Promise<AdapterSession | null> => {
    const { ok, json } = await fetch(`${env.BACKEND_URL}/api/v1/sessions/${sessionToken}`, {
      method: 'DELETE',
      next: {
        revalidate: 10,
      },
    })

    if (!ok) return null

    return await json()
  },
  createVerificationToken: async (
    data,
  ): Promise<{
    identifier: string
    token: string
    expires: Date
  } | null> => {
    const response = await fetch(`${env.BACKEND_URL}/api/v1/verificationTokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      next: {
        revalidate: 10,
      },
    })

    if (!response.ok) {
      return null
    }

    return await response.json()
  },
  useVerificationToken: async (identifier_token): Promise<VerificationToken | null> => {
    const { ok, json } = await fetch(`${env.BACKEND_URL}/api/v1/verificationTokens/${identifier_token}`, {
      method: 'DELETE',
      next: {
        revalidate: 10,
      },
    })

    if (!ok) return null

    return await json()
  },
})
