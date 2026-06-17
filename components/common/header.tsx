// header.tsx (Server Component — no "use client")
import Link from "next/link";
import Image from "next/image";
import { checkUser } from "@/lib/checkUser";
import { HeaderActions } from "./header-actions";

export default async function Header() {
  const user = await checkUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/6 bg-white/7 backdrop-blur-md">
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 select-none">
      <Image
  src="/AURi.png"
  alt="AURi"
  width={100}
  height={100}
  className="h-9 w-auto rounded-md"
  priority
/>
        </Link>

        <HeaderActions credits={user?.credits ?? null} />
      </nav>
    </header>
  );
}