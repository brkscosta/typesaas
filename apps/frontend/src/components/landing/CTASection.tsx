import { Button } from '@/components/shadcn/button'

export function CTASection() {
  return (
    <section className="flex items-center justify-center bg-indigo-600 dark:bg-slate-950 w-full">
      <div className="py-12">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
            Pronto para simplificar sua gestão de usuários?
          </h2>
          <p className="text-lg text-indigo-100">
            Comece agora e transforme a maneira como você gerencia seus usuários do Typebot.
          </p>
          <div className="flex flex-row items-center justify-center pl-1 pr-1 gap-3">
            <Button size="lg" variant="secondary" className="bg-white max-w-40 text-indigo-600 hover:bg-gray-100">
              Criar Conta Grátis
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-indigo-700 bg-indigo-600">
              Falar com Especialista
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
