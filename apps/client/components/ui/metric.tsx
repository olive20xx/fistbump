import React, { FunctionComponent, useState } from 'react';
import { Button } from "./button"
import { Input } from "./input"


interface IProps {
  question: string
  placeholder?: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  onClick: (n: number) => void
  name: string
  value: string
}

const Metric: FunctionComponent<IProps> = ({ question, placeholder = "Comments", onChange, onClick, name, value }) => {
  const [state, setState] = useState({})
  return <>
    <h4>{question}</h4>
    <div style={{ display: "flex", gap: "18px" }}>
      {[1, 2, 3, 4, 5].map(n => <Button key={n} onClick={() => onClick(n)} size="sm" style={{ background: "whitesmoke", color: "black" }}>{n}</Button>)}
    </div>
    <Input placeholder={placeholder} name={name} value={value} onChange={() => onChange} />
  </>

}

export default Metric