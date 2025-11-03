"use client";

import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { HeaderComposable } from "@/components/header";
import { SectionShell } from "@/components/section-shell";
import { StepIndicator } from "@/components/step-indicator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ROUTES } from "@/constants/routes";
import { getCourseDetail } from "@/data/courses";
import { getPaymentOptions, getPaymentSteps } from "@/data/payment";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { formatPrice } from "@/lib/utils";
import { useOrder } from "@/services/order/use-order";
import { Course } from "@/types";
import Link from "next/link";
import { use } from "react";

const paymentOptions = getPaymentOptions();

function CTA({ courseDetail }: { courseDetail: Course }) {
  return (
    <div className="bg-card border-border border rounded-card p-6 space-y-6">
      <img
        src={courseDetail.image.url}
        className="h-[82px] hidden sm:block sm:h-auto sm:w-full sm:aspect-video object-cover rounded-lg"
      />
      <h6 className="text-heading-6">{courseDetail.title}</h6>
      {/* pricing */}
      <div className="flex items-center justify-between">
        {/* discounted price */}
        <span className="flex gap-2 items-center">
          <span className="text-heading-6 text-primary">{`Rp ${courseDetail.price.discounted}K`}</span>
          <span className="text-body-base text-dark-disabled line-through">{`Rp ${courseDetail.price.original}K`}</span>
        </span>
        <span className="text-xs py-1 px-2.5 rounded-[10px] bg-secondary text-light-primary">{`Diskon ${courseDetail.price.discount_percentage}%`}</span>
        {/* original price */}
        {/* discount percentage */}
      </div>

      {/* info */}
      <p className="text-sm font-body text-info">
        Penawaran spesial tersisa 2 hari lagi!
      </p>

      {/* features */}
      {courseDetail.features.map((list) => (
        <div key={list.title} className="space-y-2">
          {/* feature section */}
          <h6 className="text-heading-6">{list.title}</h6>
          <div className="text-sm font-body text-dark-secondary grid grid-cols-2 gap-4">
            {/* feature item */}
            {list.items.map((feat) => (
              <div key={feat.text} className="flex items-center gap-4">
                <img className="h-4.5" src={feat.iconUrl} />
                <span>{feat.text}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function PaymentMethods() {
  return (
    <SectionShell>
      <h5 className="text-heading-5 font-semibold text-dark-primary">
        Metode Pembayaran
      </h5>
      <RadioGroup>
        {paymentOptions.map((item) => (
          <Accordion key={item.category} type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-body-base text-dark-primary font-bold py-4 px-5 border-border border-[1px] rounded-card mb-2">
                {item.category}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {item.methods.map((method) => (
                    <li
                      key={method.code}
                      className="text-body-sm py-4 px-5 border-border border-[1px] rounded-card flex gap-2 items-center"
                    >
                      <img src={method.image.url} className="w-10 h-full" />
                      <Label htmlFor={method.code} className="w-full">
                        {method.name}
                      </Label>
                      <RadioGroupItem
                        className="ml-auto"
                        value={method.code}
                        id={method.code}
                      />
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </RadioGroup>
    </SectionShell>
  );
}

type ComponenProps = { courseDetail: Course; orderId: string };

function RingkasanPesanan({ courseDetail, orderId }: ComponenProps) {
  const biayaAdmin = 7000;
  const coursePrice = courseDetail.price.discounted * 1000;
  return (
    <SectionShell className="text-body-lg text-dark-secondary">
      <h5 className="text-heading-5 font-semibold text-dark-primary">
        Ringkasan Pesanan
      </h5>
      <div className="flex">
        <div className="flex-1">{courseDetail.title}</div>
        <div className="font-bold w-40 text-right">
          {formatPrice(coursePrice, true)}
        </div>
      </div>
      <div className="flex">
        <div className="flex-1">Biaya Admin</div>
        <div className="font-bold w-40 text-right">
          {formatPrice(biayaAdmin, true)}
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 text-dark-primary font-bold">
          Total Pembayaran
        </div>
        <div className="font-bold w-40 text-right text-primary">
          {formatPrice(coursePrice + biayaAdmin, true)}
        </div>
      </div>
      <Link href={ROUTES.payment.confirmation.getPath(orderId)}>
        <Button variant={"primary"} className="w-full">
          Beli Sekarang
        </Button>
      </Link>
    </SectionShell>
  );
}

type PaymentPageProps = {
  params: Promise<{ orderId: string }>;
};
export default function PaymentPage({ params }: PaymentPageProps) {
  const { orderId } = use(params);
  const { getOrderById } = useOrder();
  const order = getOrderById(orderId);
  if (!order) return <p>Order Not Found</p>;
  const steps = getPaymentSteps(orderId);
  const currentStep = 1;
  const isMobile = useIsMobile();
  const courseDetail = getCourseDetail(order.courseId);
  if (!courseDetail) return <p>Course not found</p>;

  return (
    <div className="space-y-10">
      <HeaderComposable>
        <HeaderComposable.Brand />
        {!isMobile && <StepIndicator steps={steps} currentStep={currentStep} />}
      </HeaderComposable>

      {isMobile && <StepIndicator steps={steps} currentStep={currentStep} />}

      {/* main content */}
      <Container className="flex flex-col-reverse lg:flex-row gap-6">
        {/* left part */}
        <div className="lg:flex-1 space-y-6">
          <PaymentMethods />
          <RingkasanPesanan courseDetail={courseDetail} orderId={orderId} />
        </div>

        {/* right part */}
        <div className="lg:max-w-[366px]">
          <CTA courseDetail={courseDetail} />
        </div>
      </Container>
      <Footer />
    </div>
  );
}
