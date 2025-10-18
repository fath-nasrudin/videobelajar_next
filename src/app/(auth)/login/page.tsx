import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const FIELD_IDS = {
  EMAIL: "login-email",
  PASSWORD: "login-password",
};

export default function LoginPage() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1 flex justify-center items-center min-h-full pb-8 bg-mbg-base">
        <div className="mx-auto w-full max-w-md bg-white rounded-xl border border-border p-8">
          {/* <!-- Card Login --> */}
          <h2 className="text-center text-lg font-semibold mb-1">
            Masuk ke Akun
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Yuk lanjut belajar di videobelajar.
          </p>

          {/* <!-- Form --> */}
          <form className="space-y-4">
            <div>
              <Label htmlFor={FIELD_IDS.EMAIL}>E-Mail</Label>
              {/* <!-- 
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            
            -->
             */}
              <Input
                id={FIELD_IDS.EMAIL}
                type="email"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <Label htmlFor={FIELD_IDS.PASSWORD}>Kata Sandi</Label>
              <div className="relative">
                <Input
                  id={FIELD_IDS.PASSWORD}
                  type="password"
                  placeholder="••••••••"
                />
                <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer text-sm">
                  👁
                </span>
              </div>
              <a
                href="#"
                className="block text-right text-xs text-gray-500 hover:underline mt-1"
              >
                Lupa Password?
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <Link href={"/home"}>
                <Button variant={"primary"} type="submit" className="w-full">
                  Masuk
                </Button>
              </Link>

              <Link href={"/register"}>
                <Button
                  variant={"primaryShadowed"}
                  type="button"
                  className="w-full"
                >
                  Daftar
                </Button>
              </Link>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-gray-500">atau</span>
                </div>
              </div>

              <Button type="button" variant={"outline"} className="w-full">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Masuk dengan Google
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
