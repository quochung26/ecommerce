import Link from "next/link"

export default function CustomerLayout({
    children
  }: Readonly<{
    children: React.ReactNode
  }>) {
    return (
      <div className="flex py-10">
        <div className="w-1/4">
            <ul>
                <li className="text-center p-5">Dashboard</li>
                <li className="text-center p-5"><Link href={'/customer/info'}>Customer Info</Link></li>
            </ul>
        </div>
        <div className="grow">
            <div className="p-6">
                {children}
            </div>
        </div>
      </div>
    )
  }
  