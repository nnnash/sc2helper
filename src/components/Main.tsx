import React from 'react'
import {styled} from '@linaria/react'

import UnitList from './UnitList'
import Comparision from './Comparision'
import {PROTOSS_DATA, TERRAN_DATA, ZERG_DATA} from '../data/units'

const Container = styled.div`
  display: flex;
  min-width: 100%;
  min-height: 100%;
`

const List = styled.div`
  flex-grow: 0;
  min-width: 120px;
  & + & {
    margin-left: 20px;
  }
`

const Results = styled.div`
  flex-grow: 1;
  min-width: 500px;
  z-index: 100;
`

const Main = () => (
  <Container>
    <List>
      <UnitList units={ZERG_DATA} />
    </List>
    <List>
      <UnitList units={TERRAN_DATA} />
    </List>
    <List>
      <UnitList units={PROTOSS_DATA} />
    </List>
    <Results>
      <Comparision />
    </Results>
    <List>
      <UnitList units={PROTOSS_DATA} isDefender />
    </List>
    <List>
      <UnitList units={TERRAN_DATA} isDefender />
    </List>
    <List>
      <UnitList units={ZERG_DATA} isDefender />
    </List>
  </Container>
)

export default Main
