import React from 'react'
import {styled} from '@linaria/react'

import UnitDescription from './UnitDescription'
import {AttDefProvider, AttDefValue} from '../context'
import {MOBILE_WIDTH} from '../constants'
import {useDispatch} from 'react-redux'
import actions from '../redux/actions'

const Wrapper = styled.section`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TOP_MARGIN = 40
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - ${TOP_MARGIN * 2}px);
  position: sticky;
  top: ${TOP_MARGIN}px;
  width: 100%;

  @media (max-width: ${MOBILE_WIDTH}px) {
    flex-direction: column;
  }
`
const Button = styled.button`
  font-size: 20px;
  margin-top: 50px;
  padding: 8px 16px;
  background-color: transparent;
  border: 2px solid white;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.13);
  }
  @media (max-width: ${MOBILE_WIDTH}px) {
    top: 10px;
    left: 10px;
    padding: 2px 4px;
    font-size: 1em;
    border-color: #031e3a;
    color: #031e3a;
    background-color: white;
  }
`

const Comparision = () => {
  const dispatch = useDispatch()
  return (
    <Wrapper>
      <Button onClick={() => dispatch(actions.togglePriceModal(true))}>Purchase helper</Button>
      <Container>
        <AttDefProvider attDef={AttDefValue.attack}>
          <UnitDescription />
        </AttDefProvider>
        <AttDefProvider attDef={AttDefValue.defend}>
          <UnitDescription />
        </AttDefProvider>
      </Container>
    </Wrapper>
  )
}

export default Comparision
