import Image, { StaticImageData } from 'next/image'
import React, { FunctionComponent } from 'react'

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
  return <Image width={width} height={height} src={photo} alt={alt} />
}

export default Photo
