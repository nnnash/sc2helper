import React, {FC} from 'react'
import {styled} from '@linaria/react'

import {Unit} from 'types/models'
import {getAttributeInfo, getIcons} from 'utils'
import {BONUS} from 'models/attributes'
import Icon, {ComplexIcon, ValuedBonusIcons} from '../../Icon'

const Special = styled.div`
  color: #031e3a;
  font-size: 10px;
`

const iconProps = {
  customStyle: {minWidth: '20px', width: '20px'},
  size: 20,
  noPadding: true,
  noTooltip: true,
}

interface Props {
  unit: Unit
}
const Attributes: FC<Props> = ({unit}) => {
  const attrs = getIcons(unit, true)

  return (
    <>
      {attrs.map((item, ind) => {
        return <Icon key={`${item.id}-${ind}`} attribute={item} {...iconProps} />
      })}
      {unit.otherBonus?.map((item, ind) => {
        return (
          <ComplexIcon
            mainIconAttribute={BONUS[item.bonusType]}
            key={`${item.bonusType}-${ind}`}
            subIconsAttributes={
              item.opponentType?.length
                ? item.opponentType.map(({type, negative}) => ({
                    attr: getAttributeInfo(type),
                    negative,
                  }))
                : undefined
            }
            iconProps={iconProps}
          />
        )
      })}
      {unit.specialAttributes?.map((attr) => (
        <Special key={attr}>{attr}</Special>
      ))}
      {unit.attackBonus?.map((item, ind) => (
        <ValuedBonusIcons
          key={`valued-icon-${ind}`}
          value={item.value}
          attributeInfo={item.type.map((t) => getAttributeInfo(t.type))}
          iconProps={iconProps}
        />
      ))}
    </>
  )
}

export default Attributes
