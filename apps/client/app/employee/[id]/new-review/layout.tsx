import Navbar from '@/components/ui/Dashboard/Navbar'

export default function NewReviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <div className="ml-20 h-screen">{children}</div>

    </>
  )
}


