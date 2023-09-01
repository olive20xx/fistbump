import { Card, CardContent, CardHeader, CardTitle } from './card'
import Photo from './photo'

function UserCard({ photo, fullName, title, team }) {
  return (
    <Card>
      <CardHeader className="pb-0">

      </CardHeader>
      <CardContent className="flex gap-4">
        <div>
          <Photo width={80} height={90} photo={photo} alt={'Motorcycle'} />
        </div>
        <div className='flex flex-col gap-2 justify-center'>
          <CardTitle>
            {fullName}
          </CardTitle>
          <p>{title}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserCard
