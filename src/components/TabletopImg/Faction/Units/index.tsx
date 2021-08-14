import React, {FC, useMemo} from 'react'
import {styled} from '@linaria/react'

import Mutants from './Mutants'
import Building, {BuildingProps} from './Building'
import {useRaceProvider} from '../../context'
import {getDataByRace} from '../../../../data/units'

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  margin-top: 20px;
  height: 340px;
  padding: 0 10px;
`

const Units: FC = () => {
  const {race} = useRaceProvider()
  const buildings = useMemo(() => {
    const units = getDataByRace(race)
    return units.reduce<Array<BuildingProps>>((acc, item, ind) => {
      if (item.build.length < 2 || item.mutationFrom) return acc
      const building = item.build[0]
      if (!acc.length || building !== units[ind - 1].build[0]) {
        acc.push({nth: acc.length, units: [item]})
        return acc
      }
      const val = acc[acc.length - 1]
      acc[acc.length - 1] = {
        ...val,
        units: val.units.concat(item),
      }
      return acc
    }, [])
  }, [race])

  return (
    <Container>
      <Mutants />
      {buildings.map((b) => (
        <Building key={`${b.nth}-${race}`} {...b} />
      ))}
    </Container>
  )
}

export default Units
