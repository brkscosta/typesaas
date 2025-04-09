import { Button } from '@/components/shadcn/button'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="flex items-center justify-center w-full h-[50vh] bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-indigo-950 dark:to-cyan-950 opacity-70">
      <div className="flex flex-col max-w-7xl px-6 text-center">
        <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight font-extrabold text-zinc-900 dark:text-slate-50">
          Gerencie seus usuários do Typebot com simplicidade
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl sm:mt-4 font-extrabold text-zinc-800 dark:text-slate-50">
          Automatize, organize e potencialize sua gestão de usuários do Typebot em uma única plataforma intuitiva.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 font-extrabold text-slate-50">
            Começar Agora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button className="dark:text-slate-50 font-extrabold bg-primary-foreground" size="lg" variant="outline">
            Ver Demonstração
          </Button>
        </div>
      </div>
    </section>
  )
}
