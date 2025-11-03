"use client";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/lib/auth/use-auth";
import { useOrder } from "@/services/order/use-order";
import { Course } from "@/types";
import { useRouter } from "next/navigation";

export function CourseDetailCTA({ courseDetail }: { courseDetail: Course }) {
  const { createOrder } = useOrder();
  const { user } = useAuth();
  const router = useRouter();

  const handleBuy = () => {
    if (!user) return;

    createOrder({
      courseId: courseDetail.id,
      userId: user.id,
      totalPayment: courseDetail.price.discounted,
    });

    router.push(ROUTES.paymentMethods.path);
  };

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
      {/* button */}
      <Button variant={"primary"} className="w-full" onClick={handleBuy}>
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
