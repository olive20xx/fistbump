import Image, { StaticImageData } from 'next/image'
import React, { FunctionComponent } from 'react'
import ProfilePicture from '../../../assets_to_test/profile-picture.png'

interface IPhoto {
  photo: string | StaticImageData
  alt: string
  width?: number
  height?: number
  className?: string
}

const Photo: FunctionComponent<IPhoto> = ({
  photo,
  alt,
  className,
  width = 50,
  height = 50,
}) => {
  if (!photo) photo = ProfilePicture

  return <Image className={className} width={width} height={height} src={photo} alt={alt} />
}

export default Photo
