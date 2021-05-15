import React, {FC} from 'react'
import {useSelector, shallowEqual, useDispatch} from 'react-redux'
import {styled} from '@linaria/react'

import {GlobalState} from '../../redux/reducers'
import actions from '../../redux/actions'
import {getImgUrl} from '../../utils'

const Container = styled.ul`
  margin-top: 30px;
  color: white;
  list-style: none;
  padding: 0 8px;

  li {
    margin: 8px 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    &:hover {
      background-color: rgba(0, 0, 0, 0.55);
    }
  }
`
const Image = styled.img`
  width: 30px;
  height: 30px;
  background: grey;
  border-radius: 50%;
  margin-right: 8px;
`
const Name = styled.span`
  flex-grow: 1;
`
const PriceValue = styled.span<{color: string}>`
  font-weight: bold;
  color: ${(props) => props.color};
  margin-left: 4px;
`
const LeftValue = styled.div<{exceeded: boolean}>`
  b {
    font-weight: bold;
    font-size: 20px;
    color: ${(props) => (props.exceeded ? 'red' : 'inital')};
  }
`

const Purchases: FC = () => {
  const dispatch = useDispatch()
  const {purchases, gas, minerals, initialGas, initialMinerals, workerAmount} = useSelector<
    GlobalState,
    Pick<GlobalState, 'purchases' | 'gas' | 'minerals' | 'initialMinerals' | 'initialGas' | 'workerAmount'>
  >(
    (s) => ({
      purchases: s.purchases,
      initialMinerals: s.initialMinerals,
      minerals: s.minerals,
      workerAmount: s.workerAmount,
      gas: s.gas,
      initialGas: s.initialGas,
    }),
    shallowEqual,
  )
  const {workersLeft, mineralsLeft, gasLeft} = Object.values(purchases).reduce<{
    gasLeft: number
    mineralsLeft: number
    workersLeft: number
  }>(
    (acc, item) => ({
      gasLeft: acc.gasLeft - item.gas,
      mineralsLeft: acc.mineralsLeft - item.minerals,
      workersLeft: acc.workersLeft - item.gas - item.minerals,
    }),
    {
      gasLeft: gas + initialGas,
      mineralsLeft: minerals + initialMinerals,
      workersLeft: workerAmount,
    },
  )
  return (
    <Container>
      <LeftValue exceeded={workersLeft < 0}>
        Workers left: <b>{workersLeft}</b>
      </LeftValue>
      <LeftValue exceeded={mineralsLeft < 0}>
        Minerals left: <b>{mineralsLeft}</b>
      </LeftValue>
      <LeftValue exceeded={gasLeft < 0}>
        Gas left: <b>{gasLeft}</b>
      </LeftValue>
      {Object.values(purchases).map((item) => (
        <li key={`purchase-${item.name}`} onClick={() => dispatch(actions.removePurchase(item.name))}>
          <Image alt={item.name} src={getImgUrl(item.img)} />
          <Name>{item.name}</Name>
          <PriceValue color="#7c7cd2">{item.minerals}</PriceValue>
          <PriceValue color="#37ce37">{item.gas}</PriceValue>
        </li>
      ))}
    </Container>
  )
}

export default Purchases
