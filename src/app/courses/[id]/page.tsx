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
import { getCourseDetail } from "@/data/courses";
import { Course } from "@/types";
import React from "react";
import { CourseDetailCTA } from "./cta";

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

function Hero({ courseDetail }: { courseDetail: Course }) {
  return (
    <Hero1>
      <div className="max-w-[920px] p-4 space-y-4 text-light-primary text-left">
        <h2 className="text-heading-2">{courseDetail.title}</h2>
        <p className="text-body-base">
          Belajar bersama tutor profesional di Video Course.{" "}
          <span className="block">Kapanpun, di manapun.</span>
        </p>
        <Rating rating={{ average: 3.5, count: 86 }} />
      </div>
    </Hero1>
  );
}

function Description({ courseDetail }: { courseDetail: Course }) {
  return (
    <SectionShell>
      <h5 className="text-heading-5">Deskripsi</h5>
      <p className="text-body-base text-dark-secondary">
        {courseDetail.description}
      </p>
    </SectionShell>
  );
}

function Instructors({ courseDetail }: { courseDetail: Course }) {
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

function Modules({ courseDetail }: { courseDetail: Course }) {
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

function Reviews({ courseDetail }: { courseDetail: Course }) {
  const reviews = courseDetail.reviews;
  return (
    <SectionShell>
      <h5 className="text-heading-5">Rating dan Review</h5>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* sub box */}
        {reviews.map((review) => (
          <div
            key={review.account.id}
            className="bg-card border-border border rounded-card p-5 space-y-4"
          >
            {/* profile */}
            <div className="flex items-center gap-2">
              <img
                src={review.account.profileUrl}
                className="w-9 aspect-square rounded-[10px] object-cover"
              />
              <div>
                <div className="text-body-base text-dark-primary">
                  {review.account.name}
                </div>
                <div className="text-body-sm text-dark-secondary">
                  {review.account.status}
                </div>
              </div>
            </div>
            {/* review text */}
            <p className="text-body-base">{review.text}</p>
            {/* rating */}
            <Rating rating={{ average: 3.6 }} />
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const courseDetail = getCourseDetail(id);
  if (!courseDetail) return <p>Course not found</p>;
  return (
    <>
      <Header />
      <main className="space-y-6 py-7 sm:py-16">
        <Hero courseDetail={courseDetail} />

        {/* main content */}
        <Container className="flex flex-col-reverse lg:flex-row gap-6">
          {/* left part */}
          <div className="lg:flex-1 space-y-6">
            <Description courseDetail={courseDetail} />
            <Instructors courseDetail={courseDetail} />
            <Modules courseDetail={courseDetail} />
            <Reviews courseDetail={courseDetail} />
          </div>

          {/* right part */}
          <div className="lg:max-w-[366px]">
            <CourseDetailCTA courseDetail={courseDetail} />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
