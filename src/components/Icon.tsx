import React, {CSSProperties} from 'react'
import {styled} from '@linaria/react'

import {AttributeInfo} from '../types/models'

const SIZE = 30

const Tooltip = styled.div`
  position: absolute;
  bottom: 110%;
  right: 0;
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
const Container = styled.div<{color: string; size?: number; noPadding?: boolean}>`
  position: relative;
  padding: ${(props) => (props.noPadding ? 0 : (props.size || SIZE) / 3)}px;
  & svg {
    width: ${(props) => props.size || SIZE}px;
    height: ${(props) => props.size || SIZE}px;
    filter: drop-shadow(0 0 4px white);
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
const ComplexIconContainer = styled.div<{noMinWidth?: boolean}>`
  min-width: ${(p) => (p.noMinWidth ? 'none' : '50px')};
  display: flex;
  align-items: flex-end;
`
const SubIconsContainer = styled.div<{ml?: number}>`
  margin-left: ${(p) => p.ml || -20}px;
  display: flex;
`
const SubText = styled.div`
  transform: translateY(6px);
  z-index: 1;
`
const ValueBonusText = styled.div<{size: number}>`
  color: #031e3a;
  margin-left: ${(p) => -p.size + 'px'};
  font-size: ${(p) => p.size + 'px'};
  font-weight: bold;
  transform: ${(p) => `translateY(-${p.size >= 20 ? 10 : 0}px)`};
  text-shadow: 0 0 17px white;
`

interface IconProps {
  attribute: AttributeInfo
  size?: number
  customTooltip?: string
  noTooltip?: boolean
  noPadding?: boolean
  customStyle?: CSSProperties
  noMinWidth?: boolean
}
const Icon = ({attribute, size, customTooltip, noTooltip, customStyle, noPadding, noMinWidth}: IconProps) => (
  <ComplexIconContainer style={customStyle} noMinWidth={noMinWidth}>
    <Container color={attribute.color} size={size} noPadding={noPadding}>
      {!noTooltip && <Tooltip>{customTooltip || attribute.tooltip}</Tooltip>}
      {attribute.svg}
    </Container>
  </ComplexIconContainer>
)

interface ComplexIconProps {
  mainIconAttribute: AttributeInfo
  subIconsAttributes?: Array<{attr: AttributeInfo; negative?: boolean}>
  iconProps?: Partial<IconProps>
}
export const ComplexIcon = ({mainIconAttribute, subIconsAttributes, iconProps}: ComplexIconProps) => (
  <ComplexIconContainer noMinWidth={!!iconProps}>
    <Icon
      attribute={mainIconAttribute}
      customTooltip={
        subIconsAttributes &&
        `${mainIconAttribute.tooltip} vs ${subIconsAttributes
          .map(({attr, negative}) => `${negative ? 'non ' : ''}${attr.tooltip}`)
          .join(' ')}`
      }
      {...iconProps}
    />
    {!!subIconsAttributes && (
      <SubIconsContainer ml={iconProps?.size ? -iconProps.size / 2 : undefined}>
        {subIconsAttributes.map((item, ind) => (
          <React.Fragment key={item.attr.id}>
            {!!item.negative && <SubText>non</SubText>}
            <Icon
              attribute={item.attr}
              key={`${ind}-${item.attr}`}
              size={(iconProps?.size || 30) / 1.5}
              noTooltip
              noPadding={iconProps?.noPadding}
              noMinWidth={!!iconProps}
            />
          </React.Fragment>
        ))}
      </SubIconsContainer>
    )}
  </ComplexIconContainer>
)

interface ValuedBonusIconsProps {
  value: number
  attributeInfo: Array<AttributeInfo>
  isHealth?: boolean
  iconProps?: Partial<IconProps>
}
export const ValuedBonusIcons = ({value, attributeInfo, isHealth, iconProps}: ValuedBonusIconsProps) => (
  <ComplexIconContainer>
    <Icon
      attribute={attributeInfo[0]}
      customTooltip={`+${value} ${isHealth ? 'health' : 'attack'} vs ${attributeInfo
        .map((attr) => attr.tooltip)
        .join(' ')}`}
      {...iconProps}
    />
    {attributeInfo.slice(1).map((item, ind) => (
      <Icon attribute={item} customStyle={{marginLeft: -20}} key={`complex-valued-icon-${ind}-${item.id}`} noTooltip />
    ))}
    <ValueBonusText size={(iconProps?.size || 30) / 1.5}>+{value}</ValueBonusText>
  </ComplexIconContainer>
)

export default Icon
