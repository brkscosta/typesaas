import { Button } from '@/components/shadcn/button'
import { Input } from '@/components/shadcn/input'
import type { LoginFormProps } from '@/types/Components'
import { type ChangeEvent, type FC, type FormEvent, useState } from 'react'

export const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
  const [emailValue, setEmailValue] = useState('')

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    console.log(event)
    setEmailValue(event.target.value)
  }

  const handleFormSubmit = (event: FormEvent): void => {
    event.preventDefault()
    onSubmit(emailValue, event)
  }

  return (
    <form className="space-y-4" onSubmit={handleFormSubmit} noValidate>
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Seu email"
          className="w-full"
          required
          value={emailValue}
          onChange={handleEmailChange}
        />
      </div>
      <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
        Entrar com Email
      </Button>
    </form>
  )
}
