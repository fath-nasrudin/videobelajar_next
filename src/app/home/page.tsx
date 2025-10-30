"use client";

import { Container } from "@/components/container";
import { CourseCard } from "@/components/courses";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero1 } from "@/components/hero-1";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { getCourses } from "@/data/courses";
import { withAuth } from "@/lib/auth/dummy-auth";
import { Course } from "@/types";
import Link from "next/link";

const pageData = {
  hero: {
    title:
      "Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video Interaktif!",
    description:
      "Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi. Tidak hanya itu, Anda juga dapat berpartisipasi dalam latihan interaktif yang akan meningkatkan pemahaman Anda.",
    action: "Temukan Video Course untuk Dipelajari!",
  },
};

function Hero() {
  return (
    <Hero1>
      <div className="max-w-[920px] p-4 space-y-4 text-light-primary text-center">
        <h1 className="text-heading-1">{pageData.hero.title}</h1>
        <p className="text-body-base">{pageData.hero.description}</p>
        <Button variant={"primary"}>{pageData.hero.action}</Button>
      </div>
    </Hero1>
  );
}

function Courses() {
  const courses = getCourses();
  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 relative flex flex-col gap-6">
      {/* <!-- title --> */}
      <div className="space-y-2.5">
        <h2 className="text-heading-3">Koleksi Video Pembelajaran Unggulan</h2>
        <p className="text-body-base text-dark-secondary tracking-[0.2px]">
          Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
        </p>
      </div>

      {/* <!-- tabs --> */}
      <div className="text-body-base flex text-dark-secondary text-sm tracking-wide">
        <div className="py-3 pr-9 whitespace-nowrap text-tertiary relative">
          Semua Kelas
          <div className="w-[52px] h-[6px] rounded-[10px] bg-tertiary absolute left-0 bottom-[-6px]"></div>
        </div>
        <div className="py-3 pr-9 whitespace-nowrap">Pemasaran</div>
        <div className="py-3 pr-9 whitespace-nowrap">Desain</div>
        <div className="py-3 pr-9 whitespace-nowrap">Pengembangan Diri</div>
        <div className="py-3 pr-9 whitespace-nowrap">Semua Kelas</div>
      </div>

      {/* <!-- course grid --> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course, i) => (
          <Link href={ROUTES.courses.detail(course.id)} key={i}>
            <CourseCard course={course} />
          </Link>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <Container>
      <div className="h-[400px] relative rounded-[10px] overflow-hidden">
        <img
          src="./img/newsletter-bg.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 w-full h-full p-4 bg-dark-primary/80 text-light-primary flex flex-col justify-center items-center">
          <div className="max-w-[525px] space-y-10">
            <div className="text-center">
              <p className="text-body-lg text-light-secondary">NEWSLETTER</p>
              <h2 className="text-heading-3">Mau Belajar Lebih Banyak?</h2>
              <p className="text-body-base">
                Daftarkan dirimu untuk mendapatkan informasi terbaru dan
                penawaran spesial dari program-program terbaik hariesok.id
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-6 sm:bg-light-primary p-2 rounded-[10px]">
              <input
                className="sm:flex-1 bg-light-primary px-4 py-2 rounded-lg placeholder:text-dark-secondary text-center sm:text-left text-dark-primary"
                type="text"
                placeholder="Masukkan Emailmu"
              />
              <Button variant={"secondary"}>Subscribe</Button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default function Homepage() {
  return (
    <>
      <Header />
      <main className="py-7 sm:py-16 flex flex-col gap-6 sm:gap-16 overflow-hidden">
        <Hero />
        <Courses />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
