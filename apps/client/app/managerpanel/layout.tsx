import NavBar from '@/components/ui/Dashboard/Navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavBar />
      <div className="bg-neutral-100 ml-20 pt-10 p-20 h-screen">{children}</div>
    </>
  )
}
