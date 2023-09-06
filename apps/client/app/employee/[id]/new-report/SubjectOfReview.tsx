import { Header2 } from '@/components/typography/header2'
import UserCard from '@/components/ui/UserCard'
import { UserData } from '@/types/models'

function SubjectOfReview({ targetUser }: { targetUser: UserData }) {
  return (
    <div className={`w-[300px] p-4`}>
      <Header2>Subject of review</Header2>
      <UserCard
        photo={targetUser.photo}
        fullName={`${targetUser.fullName}`}
        title={targetUser.title}
        team={targetUser.teamName}
      />
    </div>
  )
}

export default SubjectOfReview
