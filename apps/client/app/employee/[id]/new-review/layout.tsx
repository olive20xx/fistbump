import Navbar from '@/components/ui/Dashboard/Navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {/* <div className="min-h-scren h-full">{children}</div> */}
      <div className="ml-20 h-screen">{children}</div>

    </>
  )
}


