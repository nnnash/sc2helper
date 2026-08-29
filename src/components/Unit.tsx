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
import UnitTitle from './UnitTitle'
import {getUnitImage} from './UnitImage'
import {colors, panel} from '../styling/theme'

// No clip-path here: the UnitTitle plaque deliberately overhangs the top-left
// corner and clipping the container would cut it off.
const container = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 10px 10px;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  ${panel}

  @media (max-width: ${TOP_WIDTH}px) {
    padding: 20px 4px 4px;
  }
`
const clickable = css`
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
    border-color: ${colors.edgeBright};
    box-shadow: 0 0 24px ${colors.glowStrong}, inset 0 1px 0 rgba(120, 200, 255, 0.4);
    z-index: 3;
  }
`

const Img = styled.img<{isBig?: boolean}>`
  height: ${(props) => (props.isBig ? 90 : 50)}px;
  width: ${(props) => (props.isBig ? 90 : 50)}px;
  filter: drop-shadow(0 0 6px rgba(89, 200, 245, 0.55));

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
      <UnitTitle>{unit.name}</UnitTitle>
      <Img isBig={!isClickable} src={getUnitImage(unit.name)} alt="no image" />
    </div>
  )
}

export default Unit
