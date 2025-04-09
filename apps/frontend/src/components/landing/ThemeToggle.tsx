import { Button } from '@/components/shadcn/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const handleOnClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button className="hover:border-indigo-700" variant="ghost" size="icon" onClick={handleOnClick}>
      {theme === 'dark' ? (
        <Sun className="transition-all dark:-rotate-90" />
      ) : (
        <Moon className="h-5 w-5 transition-all dark:rotate-0" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
