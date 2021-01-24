import React from 'react'
import {styled} from '@linaria/react'

import UnitDescription from './UnitDescription'
import {AttDefProvider, AttDefValue} from '../context'
import {MOBILE_WIDTH} from '../constants'

const Wrapper = styled.section`
  height: 100%;
  position: relative;
`

const TOP_MARGIN = 40
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - ${TOP_MARGIN * 2}px);
  position: sticky;
  top: ${TOP_MARGIN}px;

  @media (max-width: ${MOBILE_WIDTH}px) {
    flex-direction: column;
  }
`

const Comparision = () => (
  <Wrapper>
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

export default Comparision
