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
import { getCourseDetail } from "@/data/courses";
import { paymentOptionList } from "@/data/payment";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { formatPrice } from "@/lib/utils";

const courseDetail = getCourseDetail();
const currentPayment = paymentOptionList.find((p) => p.code === "bca");
const tatacaraPembayaran = [
  {
    title: "ATM BCA",
    steps: [
      "Masukkan kartu ATM dan PIN BCA Anda",
      'Di menu utama, pilih "Transaksi Lainnya". Pilih "Transfer". Pilih "Ke BCA Virtual Account"',
      "Masukkan nomor Virtual Account",
      'Pastikan data Virtual Account Anda benar, kemudian masukkan angka yang perlu Anda bayarkan, kemudian pilih "Benar"',
      'Cek dan perhatikan konfirmasi pembayaran dari layar ATM, jika sudah benar pilih "Ya", atau pilih "Tidak" jika data di layar masih salah',
      'Transaksi Anda sudah selesai. Pilih "Tidak" untuk tidak melanjutkan transaksi lain',
    ],
  },
  {
    title: "Mobiie Banking BCA",
    steps: [
      "Buka Aplikasi BCA Mobile",
      'Pilih "m-BCA", kemudian pilih "m-Transfer"',
      'Pilih "BCA Virtual Account"',
      'Masukkan nomor Virtual Account, lalu pilih "OK"',
      'Klik tombol "Send" yang berada di sudut kanan atas aplikasi untuk melakukan transfer',
      'Klik "OK" untuk melanjutkan pembayaran',
      "Masukkan PIN Anda untuk meng-otorisasi transaksi",
      "Transaksi Anda telah selesai",
    ],
  },
  {
    title: "Internet Banking BCA",
    steps: [
      "Login ke KlikBCA Individual",
      'Pilih "Transfer", kemudian pilih "Transfer ke BCA Virtual Account"',
      "Masukkan nomor Virtual Account",
      'Pilih "Lanjutkan" untuk melanjutkan pembayaran',
      'Masukkan "RESPON KEYBCA APPLI 1" yang muncul pada Token BCA Anda, lalu klik tombol "Kirim"',
      "Pembayaran telah selesai",
    ],
  },
];

function CTA() {
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
      <div className="flex flex-col items-center gap-2 text-body-base text-dark-primary font-bold py-4 px-5 border-border border-[1px] rounded-card mb-2">
        <img className="max-w-40" src={currentPayment?.image.url} />
        <div className="text-body-lg font-medium text-dark-primary">
          Bayar Melalui Virtual Account BCA
        </div>
        <div className="flex gap-2">
          <span className="text-body-lg font-bold text-dark-secondary">
            11739 081234567890
          </span>
          <button className="text-accent cursor-pointer">Salin</button>
        </div>
      </div>
      <RingkasanPesanan />
    </SectionShell>
  );
}

function RingkasanPesanan() {
  const biayaAdmin = 7000;
  const coursePrice = courseDetail.price.discounted * 1000;
  return (
    <div className=" flex flex-col gap-4 text-body-lg text-dark-secondary">
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
      <div className="flex gap-4">
        <Button className="flex-1" variant={"primaryOutlined"}>
          Ganti Metode Pembayaran
        </Button>
        <Button className="flex-1" variant={"primary"}>
          Beli Sekarang
        </Button>
      </div>
    </div>
  );
}

function TatacaraPembayaran() {
  return (
    <SectionShell>
      <h5 className="text-heading-5 font-semibold text-dark-primary">
        Tata Cara Pembayaran
      </h5>
      <div className="flex flex-col gap-2">
        {tatacaraPembayaran.map((item) => (
          <Accordion key={item.title} type="single" collapsible>
            <AccordionItem value={item.title}>
              <AccordionTrigger className="text-body-base text-dark-primary font-bold py-4 px-5 border-border border-[1px] rounded-card mb-2">
                {item.title}
              </AccordionTrigger>
              <AccordionContent>
                <ol className="list-decimal text-dark-secondary">
                  {item.steps.map((step, i) => (
                    <li
                      key={i}
                      className="text-body-sm px-4 py-1 flex items-center"
                    >
                      {step}
                    </li>
                  ))}
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </SectionShell>
  );
}

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

      {isMobile && <StepIndicator steps={steps} currentStep={currentStep} />}

      {/* main content */}
      <Container className="flex flex-col-reverse lg:flex-row gap-6">
        {/* left part */}
        <div className="lg:flex-1 space-y-6">
          <PaymentMethods />
          <TatacaraPembayaran />
        </div>

        {/* right part */}
        <div className="lg:max-w-[366px]">
          <CTA />
        </div>
      </Container>
      <Footer />
    </div>
  );
}
