import { Button } from '@/components/shadcn/button'
import { CheckCircle2, Shield } from 'lucide-react'

export function BenefitsSection() {
  const benefits = [
    'Integração simplificada com Typebot',
    'Interface intuitiva e fácil de usar',
    'Suporte técnico especializado',
    'Atualizações regulares de recursos',
    'Segurança e conformidade garantidas',
  ]

  return (
    <section className="flex items-center justify-center dark:bg-slate-950 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-8">Benefícios da nossa plataforma</h2>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <span className="text-lg text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
            <Button className="mt-8 bg-indigo-600 hover:bg-indigo-700">Saiba mais</Button>
          </div>
          <div className="mt-10 lg:mt-0">
            <div className="bg-card rounded-2xl shadow-xl p-8">
              <div className="dark:from-indigo-950 dark:to-cyan-950 rounded-lg flex items-center justify-center">
                <Shield className="h-24 w-24 text-indigo-600" />
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Segurança em primeiro lugar</h3>
                <p className="text-muted-foreground">
                  Sua gestão de usuários com a máxima segurança e proteção de dados, seguindo as melhores práticas do
                  mercado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
