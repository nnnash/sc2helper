import React, {FC, useCallback, useMemo, useRef} from 'react'
import {styled} from '@linaria/react'

import {Race, TBuilding, Unit} from 'types/models'
import {getDataByRace} from 'data/units'
import space from '../img/space.jpg'
import palette from '../styling/palette'
import {BUILDING_LISTS} from '../../../data/buildings'
import {buildingByRace} from '../models'
import Building from './Building'
import RaceTechs from './RaceTechs'
import {download} from '../utils'

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
    width: 24.4%;
    margin-right: ${SPACING}px;
    flex-grow: 1;
  }
`
const Title = styled.h1`
  margin: 0 0 ${SPACING}px;
  text-transform: capitalize;
  color: ${palette.tipsColor};
  text-align: center;
  flex-grow: 0;
`

interface Props {
  race?: Race
}
const Tips2: FC<Props> = ({race}) => {
  const ref = useRef<HTMLDivElement>(null)
  const onClick = useCallback(() => {
    download(ref, `faction-${race}`)
  }, [ref])
  if (!race) return null
  const units = getDataByRace(race)
  const buildings = useMemo(
    () =>
      units.reduce<
        Array<{
          buildings: Array<{
            building: TBuilding
            units: Array<Unit>
          }>
        }>
      >((acc, item, ind) => {
        if (item.build.length < 2) return acc
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
    <Container ref={ref} onClick={onClick}>
      <img src={space} alt="tips2" width={1920} height={1080} />
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
        <RaceTechs race={race} />
      </Content>
    </Container>
  )
}

export default Tips2
