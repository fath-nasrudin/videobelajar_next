import type { Course } from "@/types";

export function CourseCard({ course }: { course: Course }) {
  return (
    <div className="bg-card p-4 rounded-[10px] border border-border">
      {/* <!-- product item --> */}
      <div className="flex gap-3 sm:flex-col">
        {/* <!-- card image --> */}
        <img
          src={course.image.url}
          className="h-[82px] sm:h-auto sm:w-full aspect-square sm:aspect-video object-cover rounded-lg"
        />

        {/* <!-- card info --> */}
        <div className="flex flex-col gap-4 justify-between">
          <h6 className="text-heading-6 text-dark-primary">{course.title}</h6>
          <div className="hidden sm:block">
            <p className="text-body-base text-dark-secondary line-clamp-2">
              {course.description}
            </p>
          </div>
          {/* <!-- profile --> */}
          <div className="flex items-center gap-2">
            <img
              src={course.instructor.imageUrl}
              className="w-9 aspect-square rounded-[10px] object-cover"
            />
            <div>
              <div className="text-body-base text-dark-primary">
                {course.instructor.name}
              </div>
              <div className="text-body-sm text-dark-secondary">
                {course.instructor.title}
                <span className="hidden sm:inline">
                  di <strong>{course.instructor.company}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- product rating  --> */}
      <div className="flex gap-4 justify-between">
        {/* <!-- rating value --> */}
        <div className="text-body-sm text-dark-secondary flex gap-2 items-center">
          <div>⭐⭐⭐⭐⭐</div>
          <div className="underline underline-offset-0">{`${course.rating.average} ( ${course.rating.ratingCount} )`}</div>
        </div>
        {/* <!-- price --> */}
        <h5 className="text-heading-5 text-primary">Rp 300K</h5>
      </div>
    </div>
  );
}
