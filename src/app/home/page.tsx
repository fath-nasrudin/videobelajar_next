import { CourseCard } from "@/components/courses";
import { Header } from "@/components/header";
import { Hero1 } from "@/components/hero-1";
import { Button } from "@/components/ui/button";
import { Course } from "@/types";

const pageData = {
  hero: {
    title:
      "Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video Interaktif!",
    description:
      "Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi. Tidak hanya itu, Anda juga dapat berpartisipasi dalam latihan interaktif yang akan meningkatkan pemahaman Anda.",
    action: "Temukan Video Course untuk Dipelajari!",
  },
};

function getCourses() {
  const courses: Course[] = [];
  for (let i = 1; i <= 9; i++) {
    courses.push({
      title: "Big 4 Auditor Financial Analyst",
      description:
        "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan kurikulum terbaik",
      image: {
        url: `./img/card/${i}.jpg`,
        alt: "img",
      },
      instructor: {
        company: "Gojek",
        name: "Jenna Ortega",
        imageUrl: `./img/instructor/${i}.png`,
        title: "Senior Accountant",
      },
      rating: {
        average: 3.6,
        ratingCount: 86,
      },
      price: {
        discounted: 100,
        original: 300,
      },
    });
  }
  return courses;
}

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
      <div className="body-medium flex text-dark-secondary text-sm tracking-wide">
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
          <CourseCard course={course} key={i} />
        ))}
      </div>
    </section>
  );
}

export default function Homepage() {
  return (
    <>
      <Header />
      <main className="bg-mbg-base py-7 px-5 sm:py-16 flex flex-col gap-6 sm:gap-16 overflow-hidden">
        <Hero />
        <Courses />
      </main>
    </>
  );
}
