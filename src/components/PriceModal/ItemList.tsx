import React, {FC} from 'react'
import {useSelector, shallowEqual, useDispatch} from 'react-redux'
import {styled} from '@linaria/react'

import {GlobalState} from '../../redux/reducers'
import {PricedItem, PriceItemType, Race} from '../../types/models'
import {ZERG_PRICES, TERRAN_PRICES, PROTOSS_PRICES} from '../../data/prices'
import UnitTitle from '../UnitTitle'
import actions from '../../redux/actions'
import {getImgUrl} from '../../utils'
import {BOTTOM_WIDTH, MOBILE_WIDTH} from '../../constants'
import {colors, fonts, panel} from '../../styling/theme'

const LISTS = {
  [Race.zerg]: ZERG_PRICES,
  [Race.terran]: TERRAN_PRICES,
  [Race.protoss]: PROTOSS_PRICES,
}

const ItemContainer = styled.div`
  position: relative;
  flex-basis: 120px;
  padding-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s;
  ${panel}
  &:hover {
    transform: scale(1.1);
    border-color: ${colors.edgeBright};
    box-shadow: 0 0 24px ${colors.glowStrong};
    z-index: 2;
  }
  @media (max-width: ${BOTTOM_WIDTH}px) {
    flex-basis: 80px;
  }
  h4 {
    margin-top: 0;
    padding: 5px 4px;
    font-size: 12px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${colors.textBright};
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
    background: linear-gradient(180deg, rgba(43, 127, 184, 0.75), transparent);
    @media (max-width: ${BOTTOM_WIDTH}px) {
      font-size: 10px;
    }
  }
  img {
    height: 80px;
    filter: drop-shadow(0 0 6px rgba(89, 200, 245, 0.5));
    @media (max-width: ${BOTTOM_WIDTH}px) {
      height: 50px;
    }
    @media (max-width: ${MOBILE_WIDTH}px) {
      height: 30px;
    }
  }
`
const Price = styled.div`
  background: linear-gradient(0deg, rgba(3, 12, 24, 0.9), transparent);
  margin-top: -20px;
  padding-top: 12px;
  width: 100%;
  display: flex;
  justify-content: space-around;
`
const PriceValue = styled.span<{color: string}>`
  font-family: ${fonts.display};
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.color};
  text-shadow: 0 0 10px currentColor, 0 1px 3px rgba(0, 0, 0, 0.9);
  @media (max-width: ${BOTTOM_WIDTH}px) {
    font-size: 17px;
  }
`

interface Props {
  item: PricedItem
}
const Item: FC<Props> = ({item}) => {
  const dispatch = useDispatch()
  return (
    <ItemContainer onClick={() => dispatch(actions.addPurchase(item))}>
      {item.type === PriceItemType.unit ? <UnitTitle>{item.name}</UnitTitle> : <h4>{item.name}</h4>}
      <ImgWrapper>
        <img src={getImgUrl(item.img)} alt={item.name} />
      </ImgWrapper>
      <Price>
        <PriceValue color={colors.mineral}>{item.minerals}</PriceValue>
        <PriceValue color={colors.gas}>{item.gas}</PriceValue>
      </Price>
    </ItemContainer>
  )
}

const Container = styled.div`
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: auto;
`

const ItemList: FC = () => {
  const {race, filter} = useSelector<GlobalState, {race: Race; filter: PriceItemType | null}>(
    (s) => ({race: s.race, filter: s.filter}),
    shallowEqual,
  )
  const list = LISTS[race]
  return (
    <Container>
      {list.map((item) => (!filter || filter === item.type) && <Item key={item.name} item={item} />)}
    </Container>
  )
}

const ImgWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
`

export default ItemList
