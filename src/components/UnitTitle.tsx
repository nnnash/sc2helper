import {styled} from '@linaria/react'

import {TOP_WIDTH} from '../constants'
import {colors, fonts} from '../styling/theme'

const UnitTitle = styled.h5`
  min-width: 100px;
  margin: 0;
  display: block;
  font-family: ${fonts.display};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${colors.textBright};
  padding: 5px 10px;
  background: linear-gradient(180deg, ${colors.amber}, ${colors.amberMid} 55%, ${colors.amberDeep});
  position: absolute;
  top: -10px;
  left: -10px;
  clip-path: polygon(9px 0, 100% 0, 100% 70%, 93% 100%, 0 100%, 0 33%);
  box-shadow: inset 0 1px 0 rgba(255, 233, 175, 0.9), inset 0 -1px 0 rgba(0, 0, 0, 0.45);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  white-space: nowrap;
  z-index: 2;

  @media (max-width: ${TOP_WIDTH}px) {
    font-size: 10px;
    min-width: auto;
    max-width: 90px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
export default UnitTitle
