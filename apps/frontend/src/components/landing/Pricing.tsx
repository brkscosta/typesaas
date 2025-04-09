import { Button } from '@/components/shadcn/button'
import { Card, CardContent } from '@/components/shadcn/card'
import { CheckCircle2, Zap } from 'lucide-react'

export function PricingSection() {
  const features = [
    'Acesso a todas as funcionalidades premium do Typebot',
    'Gestão ilimitada de usuários',
    'Automações personalizadas',
    'Relatórios avançados',
    'Suporte prioritário 24/7',
    'Atualizações premium antecipadas',
    'API de integração completa',
    'Backup automático de dados',
  ]

  return (
    <section className="flex items-center justify-center w-full dark:bg-slate-950">
      <div className="sm:py-24 dark:from-indigo-950 dark:to-cyan-950 opacity-70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Plano Premium</h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              Acesso completo a todas as funcionalidades premium do Typebot
            </p>
          </div>

          <div className="max-w-md sm:max-w-lg mx-auto">
            <Card className="border-2 border-indigo-100 dark:border-indigo-900 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="rounded-full bg-indigo-600 dark:bg-indigo-950 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-6">
                    <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
                  </div>
                  <div className="mb-6">
                    <p className="text-base sm:text-lg text-muted-foreground">Assinatura Mensal</p>
                    <div className="mt-2 flex items-baseline justify-center gap-2">
                      <span className="text-4xl sm:text-5xl font-bold text-foreground">R$197</span>
                      <span className="text-muted-foreground">/mês</span>
                    </div>
                  </div>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 mb-8">Começar Agora</Button>
                  <div className="space-y-4 text-left">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
