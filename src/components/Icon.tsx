import React, {CSSProperties} from 'react'
import {styled} from '@linaria/react'

import {AttributeInfo} from '../types/models'

const SIZE = 30

const Tooltip = styled.div`
  position: absolute;
  bottom: 110%;
  left: 0;
  visibility: hidden;
  color: white;
  background: #031e3a;
  border: 2px solid white;
  padding: 4px;
  white-space: nowrap;
  transform: scale(0.6);
  opacity: 0;
  transition: all 0.1s;
`
const Container = styled.div<{color: string; size?: number}>`
  position: relative;
  padding: ${(props) => (props.size || SIZE) / 3}px;
  & svg {
    width: ${(props) => props.size || SIZE}px;
    height: ${(props) => props.size || SIZE}px;
  }
  & path {
    stroke: ${(props) => props.color};
    fill: ${(props) => props.color};
  }
  &:hover ${Tooltip} {
    visibility: visible;
    opacity: 1;
    transform: scale(1);
  }
`
const ComplexIconContainer = styled.div`
  min-width: 50px;
  display: flex;
  align-items: flex-end;
`
const SubIconsContainer = styled.div`
  margin-left: -20px;
  display: flex;
`
const SubText = styled.div`
  transform: translateY(6px);
  z-index: 1;
`
const ValueBonusText = styled.div`
  color: #031e3a;
  margin-left: -20px;
  font-size: 20px;
  font-weight: bold;
  transform: translateY(-10px);
`

interface IconProps {
  attribute: AttributeInfo
  size?: number
  customTooltip?: string
  noTooltip?: boolean
  customStyle?: CSSProperties
}
const Icon = ({attribute, size, customTooltip, noTooltip, customStyle}: IconProps) => (
  <ComplexIconContainer style={customStyle}>
    <Container color={attribute.color} size={size}>
      {!noTooltip && <Tooltip>{customTooltip || attribute.tooltip}</Tooltip>}
      {attribute.svg}
    </Container>
  </ComplexIconContainer>
)

interface ComplexIconProps {
  mainIconAttribute: AttributeInfo
  subIconsAttributes?: Array<{attr: AttributeInfo; negative?: boolean}>
}
export const ComplexIcon = ({mainIconAttribute, subIconsAttributes}: ComplexIconProps) => (
  <ComplexIconContainer>
    <Icon
      attribute={mainIconAttribute}
      customTooltip={
        subIconsAttributes &&
        `${mainIconAttribute.tooltip} vs ${subIconsAttributes
          .map(({attr, negative}) => `${negative ? 'non ' : ''}${attr.tooltip}`)
          .join(' ')}`
      }
    />
    {!!subIconsAttributes && (
      <SubIconsContainer>
        {subIconsAttributes.map((item, ind) => (
          <>
            {!!item.negative && <SubText>non</SubText>}
            <Icon attribute={item.attr} key={`${ind}-${item.attr}`} size={20} noTooltip />
          </>
        ))}
      </SubIconsContainer>
    )}
  </ComplexIconContainer>
)

interface ValuedBonusIconsProps {
  value: number
  attributeInfo: Array<AttributeInfo>
  isHealth?: boolean
}
export const ValuedBonusIcons = ({value, attributeInfo, isHealth}: ValuedBonusIconsProps) => (
  <ComplexIconContainer>
    <Icon
      attribute={attributeInfo[0]}
      customTooltip={`+${value} ${isHealth ? 'health' : 'attack'} vs ${attributeInfo
        .map((attr) => attr.tooltip)
        .join(' ')}`}
    />
    {attributeInfo.slice(1).map((item, ind) => (
      <Icon attribute={item} customStyle={{marginLeft: -20}} key={`complex-valued-icon-${ind}-${item.id}`} noTooltip />
    ))}
    <ValueBonusText>+{value}</ValueBonusText>
  </ComplexIconContainer>
)

export default Icon
