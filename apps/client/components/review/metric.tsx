'use client'
import React, { FunctionComponent, useState } from 'react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'





import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"



interface IMetricProps {
  question: string
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  onClick: (n: number, name: string) => void
  name: string
  value: string
  rating: number
  maxRating: number
  placeholder?: string
}

const Metric: FunctionComponent<IMetricProps> = ({
  question,
  onChange,
  onClick,
  name,
  value,
  rating,
  maxRating,
  placeholder = 'Write a comment...',
}) => {
  const [selectedKey, setSelectedKey] = useState(rating)

  const hover = 'hover:bg-turquoise/80 hover:text-gray-light'
  const hoverSelected = 'hover:bg-turquoise hover:text-white'

  return (
    <div className="py-2 px-4 border-2 border-gray-light rounded-lg shadow-sm w-11/12 mx-5 mb-5 flex-col">
      <p>{question}</p>
      <div className='p-4'>
        <div className='flex gap-[30px] justify-center'>
          {createArrayNumbers(maxRating).map((n) => (
            <Button
              key={n}
              onClick={() => {
                onClick(n, name)
                setSelectedKey(n)
              }}
              variant={n === selectedKey ? 'heavy' : 'gray'}
              size="metric"
              className={`my-[15px] p-5 ${n === selectedKey ? hoverSelected : hover}`}
            >
              {n}
            </Button>
          ))}
        </div>
        <Textarea
          className="text-start rounded-sm bg-gray-light border-0 resize-none pb-5"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default Metric

function createArrayNumbers(maxNumber: number): number[] {
  return Array.from({ length: maxNumber }, (_, i) => i + 1)
}
