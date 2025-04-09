import '@/assets/styles/globals.css'
import { ThemeProvider } from '@/features/app/ThemeProvider'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Toaster } from 'sonner'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Toaster offset={24} position="top-right" />
      <SessionProvider session={pageProps.session}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </>
  )
}

export default App
