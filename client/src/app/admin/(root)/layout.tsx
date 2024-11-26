"use client";

import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/admin/sidebar";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Footer from "@/components/admin/footer";
import Header from "@/components/admin/header";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sidebar = useAppSelector((state) => state.admin)?.sidebar;

  return (
    <>
      <header
        className={cn(
          "transition-[margin-left] ease-in-out duration-300",
          sidebar.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        <Header />
      </header>
      <Sidebar isOpen={sidebar.isOpen} />
      <main
        className={cn(
          "min-h-[calc(100vh_-_112px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          sidebar.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        <div className="p-5">{children}</div>
      </main>
      <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300",
          sidebar.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        <Footer />
      </footer>
    </>
  );
}
