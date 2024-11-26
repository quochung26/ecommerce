import Header from "@/components/header";
import AuthProvider from "@/app/authProvider";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider >
      <main className="container">
        <Header />
        <div>{children}</div>
      </main>
    </AuthProvider>
  );
}
