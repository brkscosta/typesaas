import { AuthForm } from '@/components/login/AuthForm'
import { signIn } from 'next-auth/react'
import type { JSX } from 'react'

export const SignInForm = (): JSX.Element => {
  const onSubmit = async (email: string): Promise<void> => {
    const result = await signIn('email', {
      email,
      callbackUrl: `/verify-request`,
    })

    console.log('SignInForm', email)

    if (!result?.ok) {
      console.error('Failed to send email:', result?.error)
    }
  }

  const handleProviderLogin = async (provider: string): Promise<void> => {
    console.log('SignInForm::Provider:', provider)
    await signIn(provider, {
      redirect: true,
      callbackUrl: `/dashboard`,
    })
  }

  return <AuthForm handleProviderLogin={handleProviderLogin} handleSubmit={onSubmit} />
}
