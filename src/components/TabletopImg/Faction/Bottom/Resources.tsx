import React, {FC} from 'react'
import {styled} from '@linaria/react'

import {AttributeInfo, Race} from 'types/models'
import {PROTOSS_PRICES, TERRAN_PRICES, ZERG_PRICES} from 'data/prices'
import {useRaceProvider} from '../../context'
import {getIcons, getImgUrl} from '../../../../utils'
import palette from '../../styling/palette'
import {ZERG_DATA} from '../../../../data/units'
import Icon from '../../../Icon'
import minerals from '../../img/minerals.png'
import gas from '../../img/gas.png'
import {getUnitImage} from '../../../UnitImage'

const LISTS = {
  [Race.zerg]: ZERG_PRICES,
  [Race.terran]: TERRAN_PRICES,
  [Race.protoss]: PROTOSS_PRICES,
}

const Container = styled.div`
  width: 260px;
  display: flex;
  flex-direction: column;
`
const Units = styled.div`
  display: flex;
  justify-content: space-around;
`
const UnitContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`
const bg = `
  background: black;
  border-radius: 50%;
  box-shadow: 0 0 8px 4px black; ;
`
const UnitName = styled.div`
  color: white;
  font-weight: bold;
  padding: 2px 8px;
  ${bg}
`
const UnitImg = styled.img`
  height: 50px;
  margin-top: -4px;
  ${bg}
`
const UnitPrice = styled.div`
  margin-top: -6px;
  color: ${palette.mineral};
  font-size: 24px;
  font-weight: bold;
  > span:last-child {
    color: ${palette.gas};
    margin-left: 16px;
  }
  ${bg}
`
const UnitAttributes = styled.div`
  position: absolute;
  right: -6px;
  top: 20px;
  display: flex;
  flex-direction: column;
  width: 20px;
  ${bg}
`

interface UnitProps {
  imgSrc: string
  name: string
  price: [number, number]
  attributes?: Array<AttributeInfo>
}
const Unit: FC<UnitProps> = ({name, attributes, imgSrc, price}) => (
  <UnitContainer>
    <UnitName>{name}</UnitName>
    <UnitImg src={imgSrc} alt={name} />
    <UnitPrice>
      <span>{price[0]}</span>
      <span>{price[1]}</span>
    </UnitPrice>
    {attributes && (
      <UnitAttributes>
        {attributes.map((item) => (
          <Icon key={`${item.id}-attr-queen`} attribute={item} noPadding noTooltip size={20} />
        ))}
      </UnitAttributes>
    )}
  </UnitContainer>
)

const getPricedItem = (name: string, race: Race): UnitProps => {
  const item = LISTS[race].find((pr) => pr.name.toLowerCase().includes(name))
  return {
    imgSrc: item?.img ? getImgUrl(item.img) : '',
    name: item?.name.split(' ')[0] || '',
    price: [item?.minerals || 0, item?.gas || 0],
  }
}
const raceMap: Record<Race, Array<UnitProps>> = {
  [Race.protoss]: [getPricedItem('probe', Race.protoss), getPricedItem('warp prism', Race.protoss)],
  [Race.terran]: [getPricedItem('scv', Race.terran), getPricedItem('medivac', Race.terran)],
  [Race.zerg]: [
    getPricedItem('drone', Race.zerg),
    getPricedItem('overlord', Race.zerg),
    ((): UnitProps => {
      const queenData = ZERG_DATA.find((d) => d.name === 'Queen')
      if (!queenData) return getPricedItem('-', Race.zerg)
      const attrs = getIcons(queenData, true)
      return {
        imgSrc: getUnitImage(queenData.name),
        name: queenData.name,
        price: [queenData.minerals, queenData.gas],
        attributes: attrs,
      }
    })(),
  ],
}

const ResourceWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: black;
  border-radius: 10px 10px 0 0;
  padding: 10px;
`
const Resource = styled.div<{color: string}>`
  display: flex;
  justify-content: space-between;
  flex: 1;
  padding: 0 20px;
  text-align: right;
  font-weight: bold;
  font-size: 40px;
  background: ${(p) => `linear-gradient(90deg, ${p.color}, transparent)`};
  &:first-child {
    border-radius: 5px 5px 0 0;
    margin-bottom: 10px;
  }
  img {
    height: 50px;
  }
`

const Resources: FC = () => {
  const {race} = useRaceProvider()
  const items = raceMap[race]
  return (
    <Container>
      <Units>
        {items.map((item) => (
          <Unit key={`priced-item-${item.name}`} {...item} />
        ))}
      </Units>
      <ResourceWrapper>
        <Resource color={palette.mineral}>
          <img src={minerals} alt="min" />
          <span>6</span>
        </Resource>
        <Resource color={palette.gas}>
          <img src={gas} alt="gas" />
          <span>3</span>
        </Resource>
      </ResourceWrapper>
    </Container>
  )
}

export default Resources
