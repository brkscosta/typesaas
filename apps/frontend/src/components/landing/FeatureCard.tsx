import { Card, CardContent } from '@/components/shadcn/card'
import type { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  iconColor: string
  iconBgColor: string
}

export function FeatureCard({ icon: Icon, title, description, iconColor, iconBgColor }: FeatureCardProps) {
  return (
    <Card className="border-2 border-border hover:border-indigo-100 dark:hover:border-indigo-900 transition-all duration-300">
      <CardContent className="pt-6">
        <div className={`rounded-full ${iconBgColor} w-12 h-12 flex items-center justify-center mb-4`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
