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
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px;
  @media (max-width: ${BOTTOM_WIDTH}px) {
    flex-basis: 80px;
  }
  h4 {
    margin-top: 0;
    padding: 4px;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    text-shadow: 0 1px 4px white;
    background: linear-gradient(180deg, white, transparent);
    @media (max-width: ${BOTTOM_WIDTH}px) {
      font-size: 12px;
    }
  }
  img {
    height: 80px;
    @media (max-width: ${BOTTOM_WIDTH}px) {
      height: 50px;
    }
    @media (max-width: ${MOBILE_WIDTH}px) {
      height: 30px;
    }
  }
`
const Price = styled.div`
  text-shadow: 0 1px 4px white;
  background: linear-gradient(0, white, transparent);
  margin-top: -20px;
  width: 100%;
  display: flex;
  justify-content: space-around;
`
const PriceValue = styled.span<{color: string}>`
  font-size: 30px;
  font-weight: bold;
  color: ${(props) => props.color};
  @media (max-width: ${BOTTOM_WIDTH}px) {
    font-size: 20px;
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
      <img src={getImgUrl(item.img)} alt={item.name} />
      <Price>
        <PriceValue color="#4e4ee4">{item.minerals}</PriceValue>
        <PriceValue color="#0e880e">{item.gas}</PriceValue>
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

export default ItemList
