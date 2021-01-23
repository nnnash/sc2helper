import React from 'react'
import {useDispatch} from 'react-redux'
import cn from 'classnames'

import {Unit as TUnit} from '../types/models'
import {styled} from '@linaria/react'
import {css} from '@linaria/core'
import actions from '../redux/actions'

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
`

const container = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  padding: 20px 10px 10px;
  background: rgba(255, 255, 255, 0.7);
  transition: transform 0.2s;
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
`

interface UnitProps {
  unit: TUnit
  isDefender?: boolean
  isClickable?: boolean
}
const Unit = ({unit, isDefender, isClickable}: UnitProps) => {
  const dispatch = useDispatch()
  return (
    <div
      className={cn(container, isClickable && clickable)}
      onClick={() => dispatch(isDefender ? actions.setDefender(unit) : actions.setAttacker(unit))}
    >
      <Title>{unit.name}</Title>
      <Img isBig={!isClickable} src={unit.img} alt="no image" />
    </div>
  )
}

export default Unit
