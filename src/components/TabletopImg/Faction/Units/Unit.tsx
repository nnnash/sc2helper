import React, {CSSProperties, FC} from 'react'
import {styled} from '@linaria/react'

import {Unit as TUnit} from 'types/models'
import {getIcons} from 'utils'
import {blockShadow, unitSize} from 'components/TabletopImg/styling/shared'
import palette from 'components/TabletopImg/styling/palette'
import UnitTitle from '../../../UnitTitle'
import {getUnitImage} from '../../../UnitImage'
import Attributes from '../../common/Attributes'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${unitSize}px;
`
const ImgBlock = styled.div`
  background: #63667f;
  height: ${unitSize}px;
  ${blockShadow}

  img {
    height: 100%;
    width: 100%;
  }
`
const AttributesWrapper = styled.div<{isOverflown: boolean}>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  height: 190px;
  background: #b7b7b7;
  border: 2px solid #207967;
  text-align: center;
  > div {
    height: ${(p) => (p.isOverflown ? 0 : 'auto')};
    flex-grow: ${(p) => (p.isOverflown ? 1 : 0)};
  }
`
const Resource = styled.div<{color: string}>`
  color: ${(p) => p.color};
  font-weight: bold;
  font-size: 24px;
`
const Title = styled(UnitTitle)`
  position: absolute;
  transform: rotate(-91deg) translateY(-51px);
  width: 120px;
  max-width: unset;
  top: 49px;
  box-shadow: none;
  border: 1px solid white;
  padding: 2px 8px;
  text-align: left;
`

interface Props {
  unit: TUnit
  hideImg?: boolean
  hideAttributes?: boolean
  style?: CSSProperties
}
const Unit: FC<Props> = ({unit, hideImg, hideAttributes, style}) => {
  const attrs = getIcons(unit, true)
  const isOverflown =
    attrs.length +
      (unit.otherBonus?.length || 0) +
      (unit.specialAttributes?.length || 0) +
      (unit.attackBonus?.length || 0) >
    5
  return (
    <Container>
      <ImgBlock style={style}>{!hideImg && <img src={getUnitImage(unit.name)} alt={unit.name} />}</ImgBlock>
      {!hideAttributes && (
        <AttributesWrapper isOverflown={isOverflown}>
          <Resource color={palette.mineral}>{unit.minerals}</Resource>
          <Resource color={palette.gas}>{unit.gas}</Resource>
          <Attributes unit={unit} />
          <Title>{unit.name}</Title>
        </AttributesWrapper>
      )}
    </Container>
  )
}

export default Unit
