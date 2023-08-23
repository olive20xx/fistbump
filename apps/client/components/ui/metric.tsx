'use client'
import React, { FunctionComponent, useState } from 'react'
import { Button } from './button'
import { Input } from './input'

interface IMetricProps {
  question: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClick: (n: number) => void
  name: string
  value: string
  maxRating: number
  placeholder?: string
}

const Metric: FunctionComponent<IMetricProps> = ({
  question,
  onChange,
  onClick,
  name,
  value,
  maxRating,
  placeholder = 'Comments'
}) => {
  const [selectedKey, setSelectedKey] = useState<number>(0)
  return (
    <div className="flex flex-col gap-6 mb-4 justify-center items-center">
      <h4 className="flex gap-2 justify-center items-center">{question}</h4>
      <div className="flex gap-2 justify-center items-center">
        {createArrayNumbers(maxRating).map((n) => (
          <Button
            key={n}
            onClick={() => {
              onClick(n)
              setSelectedKey(n)
            }}
            size="sm"
            variant={n === selectedKey ? 'default' : 'secondary'}
          >
            {n}
          </Button>
        ))}
      </div>
      <div>
        <Input
          className="w-64 h-20"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={(event) => onChange(event)}

        />
      </div>
    </div>
  )
}

export default Metric

function createArrayNumbers(maxNumber: number): number[] {
  return Array.from({ length: maxNumber }, (_, i) => i + 1)
}