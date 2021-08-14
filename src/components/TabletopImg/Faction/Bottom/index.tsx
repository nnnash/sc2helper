import React, {FC} from 'react'
import {styled} from '@linaria/react'
import Resources from './Resources'
import Modules from './Modules'

const Container = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  color: white;
`
const Deck = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  width: 200px;
  height: 229px;
  border-radius: 10px 10px 0 0;
  background: black;
  text-align: center;
`

const Bottom: FC = () => {
  return (
    <Container>
      <Deck>Technology deck</Deck>
      <Resources />
      <Modules />
      <Deck>Fight cards deck</Deck>
    </Container>
  )
}

export default Bottom
