"use client";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LuLogOut, LuMenu } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const isLoggedIn = true; // context or state
  const isAuthPath =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  const authButtons = (
    <div className="flex gap-4">
      <Button variant={"primary"}>Login</Button>
      <Button variant={"primaryOutlined"}>Register</Button>
    </div>
  );
  return (
    <header className="py-6 px-8 border-b border-border bg-base-100 sticky top-0 bg- z-10 shadow-xl sm:shadow-none">
      <div className="mx-auto w-full max-w-[1200px] px-4 flex items-center gap-4">
        <img src="/img/logo.png" className="h-7 mr-auto" />

        {!isAuthPath && <Menu />}

        {!isAuthPath && (isLoggedIn ? <HeaderDropdown /> : authButtons)}
      </div>
    </header>
  );
}

function Menu() {
  return (
    <>
      {/* <!-- desktop menu --> */}
      <button className="hidden sm:block text-dark-secondary font-body">
        Kategori
      </button>
    </>
  );
}

function Profile({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn("ml-6 w-11 h-11 rounded-[10px] overflow-hidden", className)}
    >
      <img
        src="/img/profile-user.png"
        className="block w-full h-full object-cover"
      />
    </div>
  );
}

const getHeaderNavLinks = () => {
  return [
    {
      title: "Kategori",
      url: "#",
      disabled: true,
      mobileOnly: true,
    },
    {
      title: "Profil Saya",
      url: "#",
      disabled: true,
    },
    {
      title: "Kelas Saya",
      url: "#",
      disabled: true,
    },
    {
      title: "Pesanan Saya",
      url: "#",
      disabled: true,
    },
    {
      title: "Keluar",
      url: "/login",
      Icon: LuLogOut,
      disabled: true,
      destructive: true,
    },
  ];
};

function HeaderDropdown() {
  const linkItems = getHeaderNavLinks();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <Profile className="hidden sm:block" />
          <LuMenu className="block sm:hidden" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full mt-6" align="end">
        {linkItems.map((item, index) => (
          <DropdownMenuItem
            key={index}
            className={cn(`${item.mobileOnly && "sm:hidden"}`)}
            variant={item.destructive ? "destructive" : "default"}
          >
            <Link href={item.url} className="flex gap-2 text-inherit">
              <span>{item.title}</span>{" "}
              {item.Icon && <item.Icon className="text-inherit" />}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
