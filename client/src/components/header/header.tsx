import Link from "next/link";
import { Input } from "@/components/ui/input";
import { User2, ShoppingCart, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="flex w-full p-5 items-center">
      <h1 className="px-10">
        <Link href="/" className="text-3xl font-bold ">
          MQH
        </Link>
      </h1>
      <div className="relative grow">
        <Input name="search" className="rounded-md" />
        <Search className="absolute top-[50%] translate-y-[-50%] right-3" />
      </div>
      <div className="flex gap-6 px-10">
        <Link href="/login">
          <User2 />
        </Link>
        <ShoppingCart />
      </div>
    </header>
  );
}
