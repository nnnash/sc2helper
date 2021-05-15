import React from 'react'
import {styled} from '@linaria/react'

import {Unit as TUnit} from '../types/models'
import Unit from './Unit'

const Container = styled.div`
  padding: 10px;
  & > * {
    margin-bottom: 20px;
  }
`
interface UnitListProps {
  units: Array<TUnit>
}
const UnitList = ({units}: UnitListProps) => (
  <Container>
    {units.map((item) => (
      <Unit unit={item} key={`unit-${item.name}`} isClickable />
    ))}
  </Container>
)

export default React.memo(UnitList)
