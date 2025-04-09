import { BenefitsSection } from '@/components/landing/BenefitsSection'
import { CTASection } from '@/components/landing/CTASection'
import { FeaturesSection } from '@/components/landing/Features'
import { PricingSection } from '@/components/landing/Pricing'
import { Header } from '../components/landing/Header'
import { HeroSection } from '../components/landing/HeroSection'

export default function LandingPage() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center pt-16 w-full h-full">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <BenefitsSection />
        <CTASection />
      </div>
    </>
  )
}
