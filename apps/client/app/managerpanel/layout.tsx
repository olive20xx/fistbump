import Navbar from '@/components/ui/Dashboard/Navbar'

export default function ManagerPanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='h-[100vh]'>
      <Navbar />
      <div className=" h-screen bg-neutral-100 ml-20 pt-10 p-20">{children}</div>
    </div>
  )
}
