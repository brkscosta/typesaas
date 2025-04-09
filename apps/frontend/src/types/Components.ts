import { type FormEvent } from 'react'

export type AuthFormProps = {
  handleSubmit: (data: string) => void | Promise<void>
  handleProviderLogin: (provider: string) => void
}

export type LoginFormProps = {
  onSubmit: (data: string, event: FormEvent) => void | Promise<void>
}

export type SocialLoginProps = {
  handleGoogleLogin: () => void
  handleFacebookLogin: () => void
  googleProviderEnabled?: boolean
  facebookProviderEnabled?: boolean
}
