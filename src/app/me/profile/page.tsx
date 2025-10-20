"use client";

import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SectionShell } from "@/components/section-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsCartFill } from "react-icons/bs";
import { LuUser } from "react-icons/lu";
import { RiBook2Fill } from "react-icons/ri";

const data = [
  { Icon: LuUser, text: "Profil Saya", url: "/me/profile" },
  { Icon: RiBook2Fill, text: "Kelas Saya", url: "/me/classes" },
  { Icon: BsCartFill, text: "Pesanan Saya", url: "/me/orders" },
];

export default function ProfilePage() {
  const pathname = usePathname();
  return (
    <div className="space-y-10">
      <Header />
      <Container className="flex flex-col sm:flex-row gap-5 items-start">
        {/* left side */}
        <div className="sm:w-[292px] w-full space-y-5">
          <div>
            <h5 className="text-heading-5">Ubah Profil</h5>
            <p className="text-body-base text-dark-secondary">
              Ubah data diri Anda
            </p>
          </div>
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
        </div>
        {/* right side */}

        <SectionShell className="flex-1 flex flex-col gap-4">
          {/* profile */}
          <div className="flex gap-4 items-start">
            {/* profile photo */}
            <div className="relative aspect-square h-[60px] sm:h-[92px] overflow-hidden rounded-lg">
              <img
                src="/img/profile-user.png"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            {/* text */}
            <div>
              <h5 className="text-heading-5">Jennie Ruby Jane</h5>
              <p className="text-body-lg">rubyjane@gmail.com</p>
              <button className="text-accent">Ganti Foto Profil</button>
            </div>
          </div>

          {/* line */}
          <hr className="h-[1px] w-full bg-light-secondary" />

          {/* form */}
          <form className="flex flex-col gap-4">
            <div className="flex gap-4 flex-col lg:flex-row">
              <div className="relative">
                <Input id="namalengkap" type="text" required className="peer" />
                <Label
                  htmlFor="namalengkap"
                  className="absolute px-2 -top-1/3 left-3 bg-card peer-focus:text-primary"
                >
                  Nama Lengkap
                </Label>
              </div>
              <div className="relative">
                <Input id="email" type="email" required className="peer" />
                <Label
                  htmlFor="email"
                  className="absolute px-2 -top-1/3 left-3 bg-card peer-focus:text-primary"
                >
                  Email
                </Label>
              </div>
              <div className="flex gap-2">
                <Select defaultValue="+62">
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+62">🇮🇩 +62</SelectItem>
                    <SelectItem value="+1">🇺🇸 +1</SelectItem>
                    <SelectItem value="+44">🇬🇧 +44</SelectItem>
                    <SelectItem value="+81">🇯🇵 +81</SelectItem>
                    {/* tambahin sesuai kebutuhan */}
                  </SelectContent>
                </Select>

                <div className="relative w-full">
                  <Input
                    id="phonenumber"
                    type="tel"
                    required
                    className="peer"
                  />
                  <Label
                    htmlFor="phonenumber"
                    className="absolute px-2 -top-1/3 left-3 bg-card peer-focus:text-primary"
                  >
                    Phone Number
                  </Label>
                </div>
              </div>
            </div>

            <Button className="sm:self-end" variant={"primary"}>
              Simpan
            </Button>
          </form>
        </SectionShell>
      </Container>

      <Footer />
    </div>
  );
}
