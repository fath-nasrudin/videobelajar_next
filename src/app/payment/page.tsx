"use client";
import { Footer } from "@/components/footer";
import { HeaderComposable } from "@/components/header";
import { StepIndicator } from "@/components/step-indicator";
import { useIsMobile } from "@/hooks/use-is-mobile";

export default function PaymentPage() {
  const steps = ["Pilih Metode", "Bayar", "Selesai"];
  const currentStep = 2;
  const isMobile = useIsMobile();

  return (
    <div className="space-y-10">
      <HeaderComposable>
        <HeaderComposable.Brand />
        {!isMobile && <StepIndicator steps={steps} currentStep={currentStep} />}
      </HeaderComposable>
      <Footer />
    </div>
  );
}
