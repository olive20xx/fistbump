import { Header2 } from '@/components/typography/header2'
import Photo from '@/components/ui/photo'
import { getUserById } from '@/lib/get-data-api'

async function Reviewers({ reviewerIds }: { reviewerIds: string[] }) {
  return (
    <div className='p-4'>
      <Header2>Reviewers</Header2>
      {reviewerIds.map(async (id, i) => <Reviewer id={id} key={i} />)}
    </div>
  )
}

async function Reviewer({ id }) {
  const { fullName, photo } = await getUserById(id)

  return (
    <div className='flex'>
      <Photo photo={photo} alt={`Picture of ${fullName}`} />
      <div>{fullName}</div>
    </div>
  )
}

export default Reviewers