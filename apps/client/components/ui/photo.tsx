import Image, { StaticImageData } from 'next/image'
import React, { FunctionComponent } from 'react'
import PlaceholderUser from '../../../assets_to_test/placeholder-user.png'

interface IPhoto {
  photo: string | StaticImageData
  alt: string
  width?: number
  height?: number
}

const Photo: FunctionComponent<IPhoto> = ({
  photo,
  alt,
  width = 50,
  height = 50,
}) => {
  //TODO replace this with the real image
  if (!photo) photo = PlaceholderUser

  return <Image width={width} height={height} src={photo} alt={alt} />
}

export default Photo
