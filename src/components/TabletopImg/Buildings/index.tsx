import React, {FC, useCallback, useMemo, useRef} from 'react'
import {styled} from '@linaria/react'

import {getDataByRace} from 'data/units'
import {TBuilding, Unit} from 'types/models'
import {BUILDING_LISTS} from 'data/buildings'
import {FactionColor, raceByColor} from '../models'
import {RaceContextProvider} from '../context'
import Building from '../Faction/Units/Building'
import {download} from '../utils'

const Container = styled.div`
  > div {
    display: flex;
  }
`
const BuildingImgContainer = styled.div<{sc?: number}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
  height: 300px;
  width: 300px;
  padding-top: 20px;
  > div {
    transform: ${(p) => `scale(${p.sc})`};
    > *:last-child {
      transform: translateY(2px);
    }
  }
`
const BuildingDownloadable: FC<{name: string}> = ({children, name}) => {
  const ref = useRef<HTMLDivElement>(null)
  const onClick = useCallback(() => {
    download(ref, name, {pixelRatio: 3.5})
  }, [ref, name])
  return (
    <div ref={ref} onClick={onClick}>
      {children}
    </div>
  )
}

interface Props {
  color: FactionColor
}
const Buildings: FC<Props> = ({color}) => {
  const race = raceByColor[color]
  const units = getDataByRace(race)
  const buildings = useMemo(
    () =>
      units.reduce<Array<{buildings: Array<{building: TBuilding; unitAmount: number}>; units: Array<Unit>}>>(
        (acc, item, ind) => {
          if (item.build.length < 2 || item.mutationFrom) return acc
          const buildingAbbr = item.build[0]
          const list = BUILDING_LISTS[race]
          if (!acc.length || buildingAbbr !== units[ind - 1].build[0]) {
            acc.push({
              buildings: [],
              units: [],
            })
          }
          if (acc.length === 1 && item.build[1] === '1') {
            acc[0].units.push(item)
            return acc
          }
          const building = acc[acc.length - 1]
          const leveledBuilding = building?.buildings[building.buildings.length - 1]
          if (!leveledBuilding || +item.build[1] !== leveledBuilding.building.level) {
            building.buildings.push({
              building: list.find((b) => `${b.abbr}${b.level}` === item.build) as TBuilding,
              unitAmount: building.units.length + 1,
            })
            building.units.push(item)
            return acc
          }
          building.buildings[building.buildings.length - 1] = {
            ...leveledBuilding,
            unitAmount: building.units.length + 1,
          }
          building.units.push(item)
          return acc
        },
        [],
      ),
    [race],
  )

  return (
    <RaceContextProvider color={color}>
      <Container>
        {buildings.map((b, ind) => (
          <div key={`buildings-${ind}`}>
            {b.buildings.map((lvl, i) => (
              <BuildingDownloadable name={lvl.building.name + color} key={`building-lvl-${i + 1}`}>
                <BuildingImgContainer>
                  <div>
                    <Building
                      units={b.units}
                      nth={ind}
                      onFaction={false}
                      level={lvl.building.level}
                      drawnUnitAmount={lvl.unitAmount}
                      img={lvl.building.img}
                    />
                    <Building
                      units={[]}
                      nth={ind}
                      onFaction={false}
                      level={lvl.building.level}
                      img={lvl.building.img}
                      price={[lvl.building.minerals, lvl.building.gas]}
                    />
                  </div>
                </BuildingImgContainer>
              </BuildingDownloadable>
            ))}
          </div>
        ))}
      </Container>
    </RaceContextProvider>
  )
}

export default Buildings
