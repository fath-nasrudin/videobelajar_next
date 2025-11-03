"use client";
import { SectionShell } from "@/components/section-shell";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/lib/auth/use-auth";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsCartFill } from "react-icons/bs";
import { LuUser } from "react-icons/lu";
import { RiBook2Fill } from "react-icons/ri";

const data = [
  { Icon: LuUser, text: "Profil Saya", url: ROUTES.me.myprofile.path },
  { Icon: RiBook2Fill, text: "Kelas Saya", url: ROUTES.me.myclasses.path },
  { Icon: BsCartFill, text: "Pesanan Saya", url: ROUTES.me.myorders.path },
];

export function MeNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  if (!user) return <p>Not authenticated</p>;
  return (
    <SectionShell className="w-full">
      <ul className="flex flex-col gap-4 text-body-lg font-bold text-dark-secondary">
        {data.map((item, index) => (
          <li key={index}>
            <Link
              href={item.url}
              className={cn(
                "p-4 flex gap-4 items-center rounded-card",

                //   active path
                pathname.startsWith(item.url) &&
                  " border border-secondary text-secondary bg-secondary/10"
              )}
            >
              <item.Icon />
              <span>{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
