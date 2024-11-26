export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative flex justify-center items-center pt-28">
      <div className="w-full flex items-center justify-center">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-sm">
          {children}
        </div>
      </div>
    </div>
  )
}
