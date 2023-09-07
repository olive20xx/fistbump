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
  placeholder = 'Comments',
}) => {
  const [selectedKey, setSelectedKey] = useState(rating)

  const hover = 'hover:bg-green-dark/80 hover:text-gray-light'
  const hoverSelected = 'hover:bg-green-dark hover:text-white'

  return (
    <Card className="w-11/12 h-[260px] mx-5  my-10 flex-col">
      <CardHeader>
        <CardTitle className='font-normal'>{question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex justify-center'>
          {createArrayNumbers(maxRating).map((n) => (
            <Button
              key={n}
              onClick={() => {
                onClick(n, name)
                setSelectedKey(n)
              }}
              variant={n === selectedKey ? 'heavy' : 'gray'}
              size="metric"
              className='m-[30px] p-5 {n === selectedKey ? hoverSelected : hover}'
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
      </CardContent>
    </Card>
  )
}

export default Metric

function createArrayNumbers(maxNumber: number): number[] {
  return Array.from({ length: maxNumber }, (_, i) => i + 1)
}
