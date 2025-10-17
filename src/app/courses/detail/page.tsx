import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero1 } from "@/components/hero-1";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import React from "react";

const courseDetail = {
  description:
    "Foundations of User Experience (UX) Design adalah yang pertama dari rangkaian tujuh kursus yang akan membekali Anda dengan keterampilan yang dibutuhkan untuk melamar pekerjaan tingkat pemula dalam desain pengalaman pengguna. Desainer UX fokus pada interaksi yang dilakukan orang dengan produk seperti situs web, aplikasi seluler, dan objek fisik. Desainer UX membuat interaksi sehari-hari itu dapat digunakan, menyenangkan, dan dapat diakses. Peran seorang desainer UX tingkat pemula mungkin termasuk berempati dengan pengguna, menentukan poin rasa sakit mereka, memunculkan ide untuk solusi desain, membuat wireframe, prototipe, dan maket, dan menguji desain untuk mendapatkan umpan balik.",
  title:
    "Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product Manager.",
  instructors: [
    {
      id: "instructor-1",
      name: "Gregorius Edrik Lawanto",
      position: "Senior Talent Acquisition",
      company: "WingsGroup",
      description:
        "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
      profileUrl: "/img/instructor/8.png",
    },

    {
      id: "instructor-2",
      name: "Gregorius Edrik Lawanto",
      position: "Senior Talent Acquisition",
      company: "WingsGroup",
      description:
        "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
      profileUrl: "/img/instructor/8.png",
    },
  ],
  modules: [
    {
      title: "Introduction to Course 1: Foundations of User Experience Design",
      materials: [
        {
          title: "The basics of user experience design",
          type: "video",
          duration: "12 minutes",
        },
        {
          title: "Jobs in the field of user experience",
          type: "video",
          duration: "12 minutes",
        },
        {
          title: "The product development life cycle",
          type: "video",
          duration: "12 minutes",
        },
      ],
    },
    {
      title: "Universal design, inclusive design, and equity-focused design",
      materials: [
        {
          title: "The basics of user experience design",
          type: "video",
          duration: "12 minutes",
        },
        {
          title: "Jobs in the field of user experience",
          type: "video",
          duration: "12 minutes",
        },
        {
          title: "The product development life cycle",
          type: "video",
          duration: "12 minutes",
        },
      ],
    },
    {
      title: "Introduction to design sprints",
      materials: [
        {
          title: "The basics of user experience design",
          type: "video",
          duration: "12 minutes",
        },
        {
          title: "Jobs in the field of user experience",
          type: "video",
          duration: "12 minutes",
        },
        {
          title: "The product development life cycle",
          type: "video",
          duration: "12 minutes",
        },
      ],
    },
    {
      title: "Introduction to UX research",
      materials: [
        {
          title: "The basics of user experience design",
          type: "video",
          duration: "12 minutes",
        },
        {
          title: "Jobs in the field of user experience",
          type: "video",
          duration: "12 minutes",
        },
        {
          title: "The product development life cycle",
          type: "video",
          duration: "12 minutes",
        },
      ],
    },
  ],
  reviews: [
    {
      account: {
        name: "Gregorius Edrik Lawanto",
        status: "Alumni Batch 2",
        profileUrl: "./img/instructor/8.png",
      },
      text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
      rating: 3.5,
    },
    {
      account: {
        name: "Julious Edrik Lawanto",
        status: "Alumni Batch 4",
        profileUrl: "./img/instructor/8.png",
      },
      text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
      rating: 3.5,
    },
  ],
  price: {
    discounted: 250,
    original: 500,
    discount_percentage: 50,
  },
  features: [
    {
      title: "Kelas Ini Sudah Termasuk",
      items: [
        { iconUrl: "/img/icons/file-check.svg", text: "Ujian Akhir" },
        { iconUrl: "/img/icons/book-2.svg", text: "49 Video" },
        { iconUrl: "/img/icons/file-edit.svg", text: "7 Dokumen" },
        { iconUrl: "/img/icons/video.svg", text: "Sertifikat" },
        { iconUrl: "/img/icons/file-certificate.svg", text: "Pretest" },
      ],
    },
    {
      title: "Bahasa pengantar",
      items: [{ iconUrl: "/img/icons/world.svg", text: "Bahasa Indonesia" }],
    },
  ],
};

function Rating({ rating }: { rating: { average: number; count?: number } }) {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex gap-1 items-center">
        <img src="/img/icons/star-yellow.svg" />
        <img src="/img/icons/star-yellow.svg" />
        <img src="/img/icons/star-half.svg" />
        <img src="/img/icons/star-gray.svg" />
        <img src="/img/icons/star-gray.svg" />
      </div>
      <div className="underline underline-offset-2 text-light-secondary text-body-sm flex items-center justify-center">
        {rating.average}
        {rating.count && ` (${rating.count})`}
      </div>
    </div>
  );
}

function SectionShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-card border-border border rounded-card p-6 space-y-6">
      {children}
    </section>
  );
}

function Hero() {
  return (
    <Hero1>
      <div className="max-w-[920px] p-4 space-y-4 text-light-primary text-left">
        <h2 className="text-heading-2">
          Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product
          Manager.
        </h2>
        <p className="text-body-base">
          Belajar bersama tutor profesional di Video Course.{" "}
          <span className="block">Kapanpun, di manapun.</span>
        </p>
        <Rating rating={{ average: 3.5, count: 86 }} />
      </div>
    </Hero1>
  );
}

function Description() {
  return (
    <SectionShell>
      <h5 className="text-heading-5">Deskripsi</h5>
      <p className="text-body-base text-dark-secondary">
        {courseDetail.description}
      </p>
    </SectionShell>
  );
}

function Instructors() {
  const instructors = courseDetail.instructors;
  return (
    <SectionShell>
      <h5 className="text-heading-5">Belajar bersama Tutor Profesional</h5>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* sub box */}
        {instructors.map((instructor) => (
          <div
            key={instructor.id}
            className="bg-card border-border border rounded-card p-5 space-y-4"
          >
            {/* profile */}
            <div className="flex items-center gap-2">
              <img
                src={instructor.profileUrl}
                className="w-9 aspect-square rounded-[10px] object-cover"
              />
              <div>
                <div className="body-medium text-dark-primary">
                  {instructor.name}
                </div>
                <div className="body-small text-dark-secondary">
                  {instructor.position}
                  <span className="hidden sm:inline">
                    di <strong>{instructor.company}</strong>
                  </span>
                </div>
              </div>
            </div>
            <p className="text-body-base">{instructor.description}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function Modules() {
  const modules = courseDetail.modules;
  return (
    <SectionShell>
      <h5 className="text-heading-5">Kamu akan Mempelajari</h5>
      {modules.map((module, index) => (
        <div key={module.title}>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-0"
          >
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger>
                <h6 className="text-heading-6 text-primary line-clamp-1">
                  {module.title}
                </h6>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-body-base">
                {module.materials?.map((material) => (
                  <div
                    key={`${module.title} ${material.title}`}
                    className=" bg-card border-border border rounded-card p-5 flex items-center justify-between gap-4"
                  >
                    <div className="font-medium">{material.title}</div>{" "}
                    {/* detail */}
                    <div className="hidden sm:flex text-dark-secondary gap-4">
                      <span className="ml-auto flex items-center gap-2 ">
                        <img src="/img/icons/play.svg" className="h-[18px]" />{" "}
                        {material.type}
                      </span>
                      <span className="ml-auto flex  items-center gap-2">
                        <img className="h-[18px]" src="/img/icons/clock.svg" />{" "}
                        {material.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
      {/* dropdownlist */}
    </SectionShell>
  );
}

function CTA() {
  return (
    <div className="bg-card border-border border rounded-card p-6 space-y-6">
      <h6 className="text-heading-6">
        Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product Manager.
      </h6>
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
      {/* button */}
      <Button variant={"primary"} className="w-full">
        Beli Sekarang
      </Button>
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

export default function CourseDetailPage() {
  return (
    <>
      <Header />
      <main className="space-y-6 py-7 sm:py-16">
        <Hero />

        {/* main content */}
        <Container className="flex flex-col-reverse lg:flex-row gap-6">
          {/* left part */}
          <div className="lg:flex-1 space-y-6">
            <Description />
            <Instructors />
            <Modules />
          </div>

          {/* right part */}
          <div className="lg:max-w-[366px]">
            <CTA />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
