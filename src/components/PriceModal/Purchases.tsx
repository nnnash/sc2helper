import React, {FC} from 'react'
import {useSelector, shallowEqual, useDispatch} from 'react-redux'
import {styled} from '@linaria/react'

import {GlobalState} from '../../redux/reducers'
import actions from '../../redux/actions'
import {getImgUrl} from '../../utils'

const M_COLOR = '#7c7cd2'
const G_COLOR = '#37ce37'

const Container = styled.ul`
  margin-top: 10px;
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
const SpentValue = styled.div<{color: string}>`
  b {
    font-weight: bold;
    font-size: 20px;
    color: ${(props) => props.color};
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
  const {workersLeft, mineralsLeft, gasLeft, spent} = Object.values(purchases).reduce<{
    gasLeft: number
    mineralsLeft: number
    workersLeft: number
    initial: [number, number]
    spent: [number, number]
  }>(
    (acc, item) => {
      const workerSavedM = acc.initial[0] && Math.min(acc.initial[0], item.minerals)
      const workerSavedG = acc.initial[1] && Math.min(acc.initial[1], item.gas)
      return {
        gasLeft: acc.gasLeft - item.gas,
        mineralsLeft: acc.mineralsLeft - item.minerals,
        workersLeft: acc.workersLeft - item.gas - item.minerals + workerSavedG + workerSavedM,
        initial: [
          acc.initial[0] - Math.min(acc.initial[0], item.minerals),
          acc.initial[1] - Math.min(acc.initial[1], item.gas),
        ],
        spent: [acc.spent[0] + item.minerals, acc.spent[1] + item.gas],
      }
    },
    {
      gasLeft: gas + initialGas,
      mineralsLeft: minerals + initialMinerals,
      workersLeft: workerAmount,
      initial: [initialMinerals, initialGas],
      spent: [0, 0],
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
      <SpentValue color={M_COLOR}>
        Minerals spent: <b>{spent[0]}</b> ({Math.max(spent[0] - initialMinerals, 0)})
      </SpentValue>
      <SpentValue color={G_COLOR}>
        Gas spent: <b>{spent[1]}</b> ({Math.max(spent[1] - initialGas, 0)})
      </SpentValue>
      {purchases.map((item, ind) => (
        <li key={`purchase-${item.name}-${ind}`} onClick={() => dispatch(actions.removePurchase(ind))}>
          <Image alt={item.name} src={getImgUrl(item.img)} />
          <Name>{item.name}</Name>
          <PriceValue color={M_COLOR}>{item.minerals}</PriceValue>
          <PriceValue color={G_COLOR}>{item.gas}</PriceValue>
        </li>
      ))}
    </Container>
  )
}

export default Purchases
