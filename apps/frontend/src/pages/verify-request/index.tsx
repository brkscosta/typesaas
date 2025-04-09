import type { FC } from 'react'

const VerifyEmailPage: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-semibold">Verifique seu e-mail</h1>
      <p>Enviamos um link para o seu e-mail. Clique nele para continuar.</p>
    </div>
  )
}

export default VerifyEmailPage
