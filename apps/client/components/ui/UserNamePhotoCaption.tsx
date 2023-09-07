import Photo from './photo'

type UNPCProps = {
  photo: string,
  fullName: string,
  caption: string
}

function UserNamePhotoCaption({ photo, fullName, caption }: UNPCProps) {
  return (
    <div className='flex'>
      <Photo photo={photo} alt={`Picture of ${fullName}`} />
      <div className='ml-3 justify-center flex-col flex'>
        <h4 className='text-[16px]'>{fullName}</h4>
        <p className='text-gray text-[12px]'>{caption}</p>
      </div>
    </div>
  )
}

export default UserNamePhotoCaption