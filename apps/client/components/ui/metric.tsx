import React, { FunctionComponent } from 'react'
import { Button } from './button'
import { Input } from './input'

interface IMetricProps {
  question: string
  placeholder?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClick: (n: number) => void
  name: string
  value: string
}

const Metric: FunctionComponent<IMetricProps> = ({
  question,
  placeholder = 'Comments',
  onChange,
  onClick,
  name,
  value,
}) => {
  return (
    <div className="flex flex-col gap-6 mb-4 justify-center items-center">
      <h4 className="flex gap-2 justify-center items-center">{question}</h4>
      <div className="flex gap-2 justify-center items-center">
        {[1, 2, 3, 4, 5].map((n) => (
          <Button
            key={n}
            onClick={() => onClick(n)}
            size="sm"
            style={{ background: 'whitesmoke', color: 'black' }}
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
