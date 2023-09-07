import Photo from '../photo'

type DashboardTopProps = {
  className?: string,
  firstName: string,
  lastName: string,
  title: string,
  photo: string,
  panelTitle: string,
}

function DashboardTop({ className, firstName, lastName, title, photo, panelTitle }: DashboardTopProps) {
  return (
    <div className={`bg-neutral-100 justify-between items-center h-24 grid grid-cols-6 ${className}`}>
      <h1 className="text-3xl text-turquoise-dark font-extrabold col-span-4">
        {panelTitle}
      </h1>
      <div className="flex col-span-2 justify-between">
        <div className="">
          <h2 className="text-3xl text-turquoise-dark font-extrabold">
            Hello, {firstName}
          </h2>
          <h2 className="text-3xl text-turquoise-dark font-extrabold">
            {lastName}
          </h2>
          <p className="text-sm text-gray">{title}</p>
        </div>
        <Photo photo={photo} width={92} height={92} alt={title} />
      </div>
    </div>
  )
}

export default DashboardTop
