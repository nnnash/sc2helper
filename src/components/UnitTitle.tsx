import {styled} from '@linaria/react'

import {TOP_WIDTH} from '../constants'

const UnitTitle = styled.h5`
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
export default UnitTitle
