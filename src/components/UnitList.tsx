import React from 'react'
import {styled} from '@linaria/react'

import {Unit as TUnit} from '../types/models'
import Unit from './Unit'

const Container = styled.div`
  padding: 10px;
`
interface UnitListProps {
  units: Array<TUnit>
  isDefender?: boolean
}
const UnitList = ({units, isDefender}: UnitListProps) => (
  <Container>
    {units.map((item) => (
      <Unit unit={item} key={`unit-${item.name}`} isDefender={isDefender} isClickable />
    ))}
  </Container>
)

export default UnitList
