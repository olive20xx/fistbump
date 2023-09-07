import Photo from '../photo'

function DashboardTop({ firstName, lastName, title, photo, panel }) {
  return (
    <div className="bg-neutral-100 justify-between items-center h-24 grid grid-cols-6">
      <h1 className="text-3xl text-green-medium font-extrabold col-span-4">
        {panel}
      </h1>
      <div className="flex col-span-2 justify-between">
        <div className="">
          <h2 className="text-3xl text-darkturqouise font-extrabold">
            Hello {firstName}
          </h2>
          <h2 className="text-3xl text-darkturqouise font-extrabold">
            {lastName}
          </h2>
          <p className="text-sm text-gray-300">{title}</p>
        </div>
        <Photo photo={photo} width={92} height={92} alt={title} />
      </div>
    </div>
  )
}

export default DashboardTop
