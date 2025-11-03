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
import { useAuth } from "@/lib/auth/use-auth";
import { useProfile } from "@/lib/data/profile/use-profile";
import { cn } from "@/lib/utils";
import { CreateUserInput, UpdateUserInput, User } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsCartFill } from "react-icons/bs";
import { LuEye, LuUser } from "react-icons/lu";
import { RiBook2Fill } from "react-icons/ri";
import { MeNav } from "../me-nav";

const data = [
  { Icon: LuUser, text: "Profil Saya", url: "/me/profile" },
  { Icon: RiBook2Fill, text: "Kelas Saya", url: "/me/classes" },
  { Icon: BsCartFill, text: "Pesanan Saya", url: "/me/orders" },
];

const fields: {
  name: keyof CreateUserInput;
  label: string;
  type: string;
  required?: boolean;
  Icon?: typeof LuEye;
}[] = [
  {
    name: "email",
    label: "E-Mail",
    type: "email",
    required: true,
  },
  {
    name: "fullname",
    label: "Full Name",
    type: "text",
  },
  // {
  //   name: "phoneNumber",
  //   label: "Phone Number",
  //   type: "tel",
  // },
  // {
  //   name: "phoneCountry",
  //   label: "Phone Code",
  //   type: "text",
  // },
];

function InputPhone({
  phoneCountry,
  phoneNumber,
  onChange,
}: Pick<User, "phoneCountry" | "phoneNumber"> & {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement> | string,
    name?: keyof UpdateUserInput
  ) => void;
}) {
  return (
    <div className="flex gap-2">
      <Select
        name="phoneCountry"
        value={phoneCountry || ""}
        onValueChange={(value) => onChange(value, "phoneCountry")}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="+62">🇮🇩 +62</SelectItem>
          <SelectItem value="+1">🇺🇸 +1</SelectItem>
          <SelectItem value="+44">🇬🇧 +44</SelectItem>
          <SelectItem value="+81">🇯🇵 +81</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative w-full">
        <Input
          id="phonenumber"
          name="phoneNumber"
          type="tel"
          required
          className="peer"
          value={phoneNumber || ""}
          onChange={onChange}
        />
        <Label
          htmlFor="phonenumber"
          className="absolute px-2 -top-1/3 left-3 bg-card peer-focus:text-primary"
        >
          Phone Number
        </Label>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { updateProfile } = useProfile();
  if (!user) return <p>Not authenticated</p>;

  const [profile, setProfile] = useState<CreateUserInput>({
    fullname: user?.fullname,
    email: user.email,
    phoneCountry: user.phoneCountry || "",
    phoneNumber: user.phoneNumber || "",
    confirmPassword: user.password,
    password: user.password,
  });

  const [draftProfile, setDraftProfile] = useState(profile);
  // function handleDraftChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   const { name, value } = e.target;
  //   setDraftProfile((prev) => ({ ...prev, [name]: value }));
  // }

  function handleDraftChange(
    e: React.ChangeEvent<HTMLInputElement> | string,
    name?: keyof UpdateUserInput
  ) {
    if (typeof e === "string" && name) {
      // untuk Select
      setDraftProfile((prev) => ({ ...prev, [name]: e }));
    } else if (typeof e !== "string") {
      // untuk Input
      const { name: fieldName, value } = e.target;
      setDraftProfile((prev) => ({ ...prev, [fieldName]: value }));
    }
  }

  function handleUpdateProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!user?.id) return;
    setProfile(draftProfile);
    updateProfile(user?.id, draftProfile);
  }

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
          <MeNav />
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
              <h5 className="text-heading-5">{profile.fullname}</h5>
              <p className="text-body-lg">{profile.email}</p>
              <button className="text-accent">Ganti Foto Profil</button>
            </div>
          </div>

          {/* line */}
          <hr className="h-[1px] w-full bg-light-secondary" />

          {/* form */}
          <form className="flex flex-col gap-4">
            <div className="flex gap-4 flex-col lg:flex-row">
              {fields.map((f) => (
                <div className="relative" key={f.name}>
                  <Input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    required={f.required}
                    className="peer"
                    value={draftProfile[f.name] || ""}
                    onChange={handleDraftChange}
                  />
                  <Label
                    htmlFor={f.name}
                    className="absolute px-2 -top-1/3 left-3 bg-card peer-focus:text-primary"
                  >
                    {f.label}
                  </Label>
                </div>
              ))}
              <InputPhone
                onChange={handleDraftChange}
                phoneCountry={draftProfile.phoneCountry}
                phoneNumber={draftProfile.phoneNumber}
              />
            </div>

            <Button
              className="sm:self-end"
              variant={"primary"}
              onClick={handleUpdateProfile}
            >
              Simpan
            </Button>
          </form>
        </SectionShell>
      </Container>

      <Footer />
    </div>
  );
}
