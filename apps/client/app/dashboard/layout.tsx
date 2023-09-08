import Navbar from '@/components/ui/Dashboard/Navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <div className="bg-neutral-100 ml-20 pt-10 p-20 h-screen">{children}</div>
    </>
  )
}
