import { BarChart3, Bot, Users } from 'lucide-react'
import { FeatureCard } from './FeatureCard'

export function FeaturesSection() {
  const features = [
    {
      icon: Users,
      title: 'Gestão Centralizada',
      description: 'Gerencie todos os seus usuários em um único painel intuitivo e organizado.',
      iconColor: 'text-indigo-600',
      iconBgColor: 'bg-indigo-50 dark:bg-indigo-950',
    },
    {
      icon: Bot,
      title: 'Automação Inteligente',
      description: 'Automatize processos de onboarding e gestão de permissões dos usuários.',
      iconColor: 'text-cyan-600',
      iconBgColor: 'bg-cyan-50 dark:bg-cyan-950',
    },
    {
      icon: BarChart3,
      title: 'Análise Detalhada',
      description: 'Acompanhe métricas e insights sobre o uso e engajamento dos usuários.',
      iconColor: 'text-purple-600',
      iconBgColor: 'bg-purple-50 dark:bg-purple-950',
    },
  ]

  return (
    <section className="flex items-center justify-center pt-4 w-full dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-foreground">Como funciona</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Uma solução completa para gerenciar seus usuários do Typebot
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
