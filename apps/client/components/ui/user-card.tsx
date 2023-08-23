import { Card, CardContent, CardHeader, CardTitle } from './card'
import Photo from './photo'

function UserCard({ photo, fullName, title, team }) {
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="flex gap-4 items-center">
          <Photo width={80} height={90} photo={photo} alt={'Motorcycle'} />
          {fullName}
        </CardTitle>
      </CardHeader>
      <CardContent className="ml-24 flex gap-4">
        <div>
          <p>Title: {title}</p>
          <p>Team: {team}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserCard
