import React, {FC, useState} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import {PriceItemType, Race} from '../../types/models'
import actions from '../../redux/actions'
import {GlobalState} from '../../redux/reducers'
import SelectButton from '../SelectButton'
import {styled} from '@linaria/react'

export const RaceChooser: FC = () => {
  const dispatch = useDispatch()
  const selectedRace = useSelector<GlobalState, Race>((s) => s.race, shallowEqual)
  return (
    <SelectButton
      selected={selectedRace}
      items={Object.values(Race)}
      setSelected={(race) => dispatch(actions.setRace(race))}
    />
  )
}

const NAME_MAP = {
  [PriceItemType.unit]: 'units',
  [PriceItemType.tech]: 'techs',
  [PriceItemType.building]: 'other',
  null: 'all',
}
export const ItemTypeChooser: FC = () => {
  const dispatch = useDispatch()
  const selectedFilter = useSelector<GlobalState, PriceItemType | null>((s) => s.filter, shallowEqual)
  return (
    <SelectButton<PriceItemType | 'null'>
      selected={selectedFilter || 'null'}
      items={['null', ...Object.values(PriceItemType)]}
      setSelected={(filter) => dispatch(actions.setFilter(filter === 'null' ? null : (filter as PriceItemType)))}
      displayName={(key) => NAME_MAP[key]}
    />
  )
}

const SliderText = styled.h5`
  color: white;
  font-weight: bold;
  margin-top: 4px;
  margin-bottom: 2px;
`
interface SlidersProps {
  minerals: number
  gas: number
  text: string
  actionM: (val: number) => void
  actionG: (val: number) => void
  hasMin?: boolean
}
const handleStyle = {
  borderColor: 'white',
  backgroundColor: '#031e3a',
}
const trackStyle = {
  backgroundColor: 'grey',
}
const Sliders: FC<SlidersProps> = ({minerals: m, gas: g, text, actionM, actionG, hasMin = false}) => {
  const dispatch = useDispatch()
  const [minerals, setMinerals] = useState<number>(m)
  const [gas, setGas] = useState<number>(g)
  return (
    <div>
      <SliderText>
        {text} minerals: {minerals}
      </SliderText>
      <Slider
        max={30}
        value={minerals}
        onChange={(val) => (hasMin && val < 6 ? setMinerals(6) : setMinerals(val))}
        onAfterChange={(val) => dispatch(actionM(val))}
        handleStyle={handleStyle}
        trackStyle={trackStyle}
      />
      <SliderText>
        {text} gas: {gas}
      </SliderText>
      <Slider
        max={30}
        value={gas}
        onAfterChange={(val) => dispatch(actionG(val))}
        onChange={(val) => (hasMin && val < 3 ? setGas(3) : setGas(val))}
        handleStyle={handleStyle}
        trackStyle={trackStyle}
      />
    </div>
  )
}
export const InitialResources: FC = () => {
  const initMinerals = useSelector<GlobalState, number>((s) => s.initialMinerals, shallowEqual)
  const initGas = useSelector<GlobalState, number>((s) => s.initialGas, shallowEqual)
  return (
    <Sliders
      minerals={initMinerals}
      gas={initGas}
      text="Collected"
      actionM={actions.setInitialMineral}
      actionG={actions.setInitialGas}
    />
  )
}
export const AvailableResources: FC = () => {
  const initMinerals = useSelector<GlobalState, number>((s) => s.minerals, shallowEqual)
  const initGas = useSelector<GlobalState, number>((s) => s.gas, shallowEqual)
  return (
    <Sliders
      minerals={initMinerals}
      gas={initGas}
      text="Available"
      actionM={actions.setMinerals}
      actionG={actions.setGas}
      hasMin
    />
  )
}
export const AvailableWorkers: FC = () => {
  const dispatch = useDispatch()
  const initialWorkers = useSelector<GlobalState, number>((s) => s.workerAmount, shallowEqual)
  const [workers, setWorkers] = useState<number>(initialWorkers)
  return (
    <>
      <SliderText>Available workers: {workers}</SliderText>
      <Slider
        value={workers}
        onChange={setWorkers}
        max={30}
        onAfterChange={(val) => dispatch(actions.setWorkerAmount(val))}
        handleStyle={handleStyle}
        trackStyle={trackStyle}
      />
    </>
  )
}
