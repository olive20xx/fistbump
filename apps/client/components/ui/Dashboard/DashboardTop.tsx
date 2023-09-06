import Photo from '../photo'

function DashboardTop({ firstName, lastName, title, photo }) {
  return (
    <div className="bg-neutral-100 justify-between items-center h-24 grid grid-cols-6">
      <h1 className="text-3xl text-green-mediumgreen font-extrabold col-span-4">
        Team member Panel
      </h1>
      <div className="flex col-span-2 justify-around">
        <div className="">
          <h2 className="text-3xl text-darkturqouise font-extrabold">
            Hello {firstName}
          </h2>
          <h2 className="text-3xl text-darkturqouise font-extrabold">
            {lastName}
          </h2>
          <p className="text-sm text-gray-300">{title}</p>
        </div>
        <Photo photo={photo} alt={title} />
      </div>
    </div>
  )
}

export default DashboardTop
