import Image, { StaticImageData } from "next/image"
import React, { FunctionComponent } from 'react';


interface IPhoto {
  width: number
  height: number
  photo: StaticImageData
  alt: string
}

const Photo: FunctionComponent<IPhoto> = ({ width = 90, height = 100, photo, alt }) => {
  return (
    <Image
      width={width}
      height={height}
      src={photo}
      alt={alt}
      style={{ borderRadius: '80px', border: '0.5px solid blue' }}
    />
  );
}


export default Photo