import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeName(name: string) {
  const split = name.split(' ')
  const capitalized = split.map((word) => {
    return word[0].toUpperCase() + word.slice(1)
  })
  return capitalized.join(' ')
}
