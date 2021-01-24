import React from 'react'
import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import cn from 'classnames'
import {css} from '@linaria/core'
import {styled} from '@linaria/react'

import {Unit as TUnit} from '../types/models'
import actions from '../redux/actions'
import {AttDefValue, useAttDef} from '../context'
import {BOTTOM_WIDTH, MOBILE_WIDTH, TOP_WIDTH} from '../constants'
import {GlobalState} from '../redux/reducers'

const Title = styled.h5`
  min-width: 100px;
  margin: 0;
  display: block;
  color: white;
  padding: 4px 10px;
  background: linear-gradient(90deg, #813f01, #b46b0a, #ad650b);
  position: absolute;
  top: -10px;
  left: -10px;
  clip-path: polygon(9px 0, 100% 0, 100% 70%, 93% 100%, 0 100%, 0 33%);
  box-shadow: inset 0 0 2px 3px white;
  white-space: nowrap;

  @media (max-width: ${TOP_WIDTH}px) {
    font-size: 12px;
    min-width: auto;
    max-width: 90px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const container = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 10px 10px;
  background: rgba(255, 255, 255, 0.7);
  transition: transform 0.2s;

  @media (max-width: ${TOP_WIDTH}px) {
    padding: 20px 4px 4px;
  }
`
const clickable = css`
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`

const Img = styled.img<{isBig?: boolean}>`
  height: ${(props) => (props.isBig ? 90 : 50)}px;
  width: ${(props) => (props.isBig ? 90 : 50)}px;

  @media (max-width: ${MOBILE_WIDTH}px) {
    height: 40px;
    width: 40px;
  }
`

interface UnitProps {
  unit: TUnit
  isClickable?: boolean
}
const Unit = ({unit, isClickable}: UnitProps) => {
  const dispatch = useDispatch()
  const defender = useSelector<GlobalState, TUnit | undefined>((state) => state.defender, shallowEqual)
  const isDefender = useAttDef() === AttDefValue.defend
  return (
    <div
      className={cn(container, isClickable && clickable)}
      onClick={() => {
        if (isClickable) {
          if (isDefender) {
            dispatch(actions.setDefender(unit))
            if (window.innerWidth <= BOTTOM_WIDTH) dispatch(actions.setOpenDefendList(false))
          } else {
            dispatch(actions.setAttacker(unit))
            if (!defender) dispatch(actions.toggleLists())
            else dispatch(actions.setOpenAttackList(false))
          }
        } else {
          dispatch(isDefender ? actions.setOpenDefendList(true) : actions.setOpenAttackList(true))
        }
      }}
    >
      <Title>{unit.name}</Title>
      <Img isBig={!isClickable} src={unit.img} alt="no image" />
    </div>
  )
}

export default Unit
