async function DashboardContent() {
  return (
    <div className="mt-10 grid grid-cols-6 max-w-screen h-[34rem] gap-10">
      <div className="col-span-4 h-full grid grid-col-2 gap-10 max-w-screen">
        <div className="border-2 grid-rows-1 border-black">
          Nomination Phase
        </div>
        <div className="border-2 grid-rows-1 border-black">Review Phase</div>
      </div>
      <div className="col-span-2 grid grid-col-2 h-full max-w-screen gap-10">
        <div className="border-black border-2">ACTIVITTY</div>
        <div className="border-black border-2">REPORTS</div>
      </div>
    </div>
  )
}

export default DashboardContent
