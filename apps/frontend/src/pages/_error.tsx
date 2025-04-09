import { Ghost, Link } from 'lucide-react'
import type { NextPage, NextPageContext } from 'next'

interface Props {
  statusCode?: number
}

const ErrorPage: NextPage<Props> = ({ statusCode }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <Ghost className="w-24 h-24 text-gray-600 animate-bounce" />
      <h1 className="text-4xl font-bold mt-4">{statusCode ? `Erro ${statusCode}` : 'Algo deu errado!'}</h1>
      <p className="text-gray-600 mt-2">Parece que esta página desapareceu como um fantasma...</p>
      <Link onClick={() => window.open('/', '_self')} className="mt-6 hover:bg-zinc-300 transition rounded-2xl" />
    </div>
  )
}

ErrorPage.getInitialProps = async (ctx: NextPageContext) => {
  const statusCode = ctx.res?.statusCode || ctx.err?.statusCode || 500
  return { statusCode }
}

export default ErrorPage
