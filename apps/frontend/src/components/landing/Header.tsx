import { Button } from '@/components/shadcn/button'
import { Bot, LayoutDashboard } from 'lucide-react'
import { useRouter } from 'next/router'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const router = useRouter()

  const handleDashboardClick = () => {
    console.log('Dashboard clicked')
    router.push('/dashboard')
  }

  return (
    <header className="fixed top-0 bg-background/80 border-b backdrop-blur-md w-full h-16 flex items-center justify-center">
      <div className="flex items-center justify-between w-full max-w-7xl px-4">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-indigo-600" />
          <span className="text-xl font-semibold text-foreground">TypeBot Manager</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button
            className="cursor-pointer text-md bg-indigo-600 hover:bg-indigo-700 dark:text-slate-50"
            size="sm"
            variant={'default'}
            onClick={handleDashboardClick}
          >
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Acessar Dashboard
          </Button>
        </div>
      </div>
    </header>
  )
}
