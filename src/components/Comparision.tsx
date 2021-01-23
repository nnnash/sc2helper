import React from 'react'
import {styled} from '@linaria/react'

import UnitDescription from './UnitDescription'

const Wrapper = styled.section`
  height: 100%;
  position: relative;
`

const TOP_MARGIN = 40
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - ${TOP_MARGIN * 2}px);
  position: sticky;
  top: ${TOP_MARGIN}px;
`

const Comparision = () => (
  <Wrapper>
    <Container>
      <UnitDescription />
      <UnitDescription isDefender />
    </Container>
  </Wrapper>
)

export default Comparision
