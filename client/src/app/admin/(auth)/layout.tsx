export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex justify-center items-center ">
      <div className="w-1/3 bg-black min-h-screen"></div>
      <div className="w-2/3 flex justify-center min-h-screen">{children}</div>
    </div>
  );
}
