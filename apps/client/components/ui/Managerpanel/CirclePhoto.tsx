import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cva } from 'class-variance-authority'
import Image, { StaticImageData } from 'next/image'
import { cn } from "@/lib/utils"


interface CirclePhotoProps {
  src: string | StaticImageData
  alt: string
  toolTipContent: string
  variant?: 'green' | 'red' | 'yellow' | 'gray'
}


const photoVariants = cva(
  'rounded-full mx-2 border-[3px] p-1',
  {
    variants: {
      variant: {
        green: "border-turquoise",
        red: "border-red",
        yellow: "border-yellow",
        gray: ""
      }
    }
  }
)




export function CirclePhoto({ src, alt, toolTipContent, variant }: CirclePhotoProps) {

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Image className={cn(photoVariants({ variant }))} src={src} width={50} height={50} alt={alt} />
        </TooltipTrigger>
        <TooltipContent>
          <p>{toolTipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}