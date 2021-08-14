import React, {FC} from 'react'
import {styled} from '@linaria/react'

import {BUILDING_SCALE} from 'data/buildings'
import {Unit as TUnit} from 'types/models'
import Unit from './Unit'
import {blockShadow, unitSize} from '../../styling/shared'
import {useRaceProvider} from '../../context'
import {bgBuildingImagePositionByColor, bgImageByColor, buildingByRace, FactionColor} from '../../models'
import minerals from 'components/TabletopImg/img/minerals.png'
import gas from '../../img/gas.png'
import palette from '../../styling/palette'

const getTransform = (amount: number) => {
  switch (amount) {
    case 6:
      return `scale(${BUILDING_SCALE[6]}) translateY(-9px)`
    case 5:
      return `scale(${BUILDING_SCALE[5]}) translateY(-8px)`
    default:
      return 'none'
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Level = styled.div`
  padding: 0 4px;
  box-shadow: 0 0 10px white;
  border-radius: 50%;
  text-align: center;
  background: white;
  font-weight: bold;
`
const BuildingBase = styled.div<{amount: number; color: FactionColor; gray: boolean; noTransform: boolean}>`
  display: flex;
  justify-content: center;
  width: 262px;
  height: 133px;
  padding-top: 10px;
  clip-path: polygon(0 100%, 24% 0, 75% 0, 100% 100%, 0 100%, 0 33%);
  transform: ${(p) => (p.noTransform ? 'none' : getTransform(p.amount))};
  background-image: ${(p) => `url("${bgImageByColor[p.color]}")`};
  background-position: ${(p) => bgBuildingImagePositionByColor[p.color]};
  filter: ${(p) => `grayscale(${Number(p.gray)})`};
  > div {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 70px;
    background: rgba(3, 30, 58, 0.8);
    ${blockShadow}
    ${Level} {
      position: absolute;
      display: ${(p) => (p.gray || !p.amount ? 'none' : 'block')};
      top: -4px;
      right: -4px;
    }
    img {
      max-width: 80%;
      max-height: 90%;
      filter: drop-shadow(0 0 4px white);
    }
  }
`
const UnitsContainer = styled.div<{amount: number}>`
  display: flex;
  justify-content: space-around;
  margin-top: -${unitSize}px;
  z-index: 1;
  padding: ${(p) => (p.amount <= 4 ? '0 24px' : '0 10px')};
`
const PriceContainer = styled.div`
  margin-top: -44px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1;
  img {
    height: 40px;
    filter: drop-shadow(0 0 10px white);
    z-index: 10;
  }
`
const PriceValue = styled.div<{color: string}>`
  filter: drop-shadow(0 0 10px white);
  font-weight: bold;
  font-size: 24px;
  box-shadow: 0 0 7px 3px white;
  background: white;
  border-radius: 50%;
  color: ${(p) => p.color};
  &:first-child {
    transform: translateX(30px);
  }
  &:last-child {
    transform: translateX(-30px);
  }
`

export interface BuildingProps {
  units: Array<TUnit>
  nth: number
  onFaction?: boolean
  level?: number
  drawnUnitAmount?: number
  img?: string
  price?: [number, number]
}
const Building: FC<BuildingProps> = ({units, nth, onFaction = true, level = 1, drawnUnitAmount = 10, img, price}) => {
  const {color, race} = useRaceProvider()
  return (
    <Container>
      <BuildingBase amount={units.length} color={color} gray={!!nth && onFaction} noTransform={!onFaction}>
        <div>
          <img src={img ?? buildingByRace[race][nth]} alt="building" />
          <Level>{level}</Level>
        </div>
      </BuildingBase>
      {!price ? (
        <UnitsContainer
          amount={units.length}
          style={
            onFaction || units.length < 5
              ? undefined
              : {
                  transform: `scale(${1 / BUILDING_SCALE[units.length === 6 ? 6 : 5]})`,
                  transformOrigin: 'bottom',
                }
          }
        >
          {units.map((u, ind) => (
            <Unit
              key={`building-unit-${u.name}`}
              unit={u}
              hideImg={(!!(nth || +u.build.split('')[1] > 1) && onFaction) || drawnUnitAmount < ind + 1}
              hideAttributes={!onFaction}
            />
          ))}
        </UnitsContainer>
      ) : (
        <PriceContainer>
          <PriceValue color={palette.mineral}>{price[0]}</PriceValue>
          <img src={minerals} alt="min" />
          <Level>{level}</Level>
          <img src={gas} alt="gas" />
          <PriceValue color={palette.gas}>{[price[1]]}</PriceValue>
        </PriceContainer>
      )}
    </Container>
  )
}

export default Building
