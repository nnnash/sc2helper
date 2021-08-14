import React, {FC, useState} from 'react'
import {styled} from '@linaria/react'

const Trigger = styled.div`
  color: white;
  font-weight: bold;
  font-size: 30px;
  margin: 20px;
  cursor: pointer;
`

interface Props {
  name: string
}
const Collapse: FC<Props> = ({children, name}) => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Trigger onClick={() => setOpen(!open)}>
        <span>{name}</span>
        <span>{open ? '/\\' : '\\/'}</span>
      </Trigger>
      {open && children}
    </div>
  )
}

export default Collapse
