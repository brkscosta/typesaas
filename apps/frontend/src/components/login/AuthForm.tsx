import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/card'
import type { AuthFormProps } from '@/types/Components'
import type { BuiltInProviderType } from 'next-auth/providers/index'
import { type ClientSafeProvider, type LiteralUnion, getProviders } from 'next-auth/react'
import { type FC, useEffect, useState } from 'react'
import { AuthSeparator } from './AuthSeparator'
import { LoginForm } from './LoginForm'
import { SocialLogin } from './SocialLogin'

export const AuthForm: FC<AuthFormProps> = ({ handleSubmit, handleProviderLogin }) => {
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>>()

  useEffect(() => {
    ;(async () => {
      const providers = await getProviders()
      setProviders(providers ?? undefined)
    })()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-center">Bem-vindo de volta</CardTitle>
          <CardDescription className="text-center">Faça login na sua conta para continuar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {providers?.email && <LoginForm onSubmit={handleSubmit} />}
          <AuthSeparator />
          <SocialLogin
            googleProviderEnabled={!!providers?.google}
            facebookProviderEnabled={!!providers?.facebook}
            handleGoogleLogin={(): void => handleProviderLogin('google')}
            handleFacebookLogin={(): void => handleProviderLogin('facebook')}
          />
        </CardContent>
      </Card>
    </div>
  )
}
