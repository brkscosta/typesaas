import { Separator } from '@/components/shadcn/separator'
import type { FC } from 'react'

export const AuthSeparator: FC = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <Separator className="w-full" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">Ou continue com</span>
      </div>
    </div>
  )
}
