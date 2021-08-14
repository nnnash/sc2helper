import React, {FC, useMemo} from 'react'
import {styled} from '@linaria/react'

import {Race, TBuilding, Unit} from 'types/models'
import {getDataByRace} from 'data/units'
import tips2 from '../img/tips2.png'
import palette from '../styling/palette'
import {BUILDING_LISTS} from '../../../data/buildings'
import {buildingByRace} from '../models'
import Building from './Building'

const SPACING = 16
const Container = styled.div`
  position: relative;
  width: 1920px;
  height: 1080px;
  padding: ${SPACING}px;
  > img {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100%;
  > * {
    padding: 8px;
    background-color: ${palette.tipsBg};
    width: 24%;
    margin-right: ${SPACING}px;
  }
`
const Title = styled.h1`
  margin: 0 0 ${SPACING}px;
  text-transform: capitalize;
  color: ${palette.tipsColor};
  text-align: center;
`

interface Props {
  race?: Race
}
const Tips2: FC<Props> = ({race}) => {
  if (!race) return null
  const units = getDataByRace(race)
  const buildings = useMemo(
    () =>
      units.reduce<
        Array<{
          buildings: Array<{
            building: TBuilding
            units: Array<Unit>
            mutant?: Unit
          }>
        }>
      >((acc, item, ind) => {
        if (item.build.length < 2) return acc
        if (item.mutationFrom && acc.length && acc[acc.length - 1].buildings.length) {
          const buildings = acc[acc.length - 1].buildings
          buildings[buildings.length - 1].mutant = item
          return acc
        }
        const buildingAbbr = item.build[0]
        const list = BUILDING_LISTS[race]
        const buildingData = list.find((b) => `${b.abbr}${b.level}` === item.build)
        if (!acc.length || buildingAbbr !== units[ind - 1].build[0]) {
          acc.push({
            buildings: [
              {
                building: buildingData || {
                  name: '',
                  gas: 0,
                  level: 1,
                  minerals: 0,
                  race,
                  abbr: item.build,
                  img: buildingByRace[race][0],
                },
                units: [item],
              },
            ],
          })
          return acc
        }
        const building = acc[acc.length - 1]
        const leveledBuilding = building?.buildings[building.buildings.length - 1]
        if (!leveledBuilding || +item.build[1] !== leveledBuilding.building.level) {
          building.buildings.push({
            building: buildingData as TBuilding,
            units: [item],
          })
          return acc
        }
        leveledBuilding.units.push(item)
        return acc
      }, []),
    [race],
  )

  return (
    <Container>
      <img src={tips2} alt="tips2" />
      <Content>
        <Title>{race ?? 'tips'}</Title>
        {buildings.map((b, ind) => (
          <React.Fragment key={`tips2-building-${race}-${ind}`}>
            {b.buildings.map((build) => (
              <Building
                key={`tips2-building-${race}-${ind}-${build.building.abbr}${build.building.level}`}
                {...build}
              />
            ))}
          </React.Fragment>
        ))}
      </Content>
    </Container>
  )
}

export default Tips2
