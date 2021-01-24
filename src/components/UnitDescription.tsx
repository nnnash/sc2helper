import React from 'react'
import {shallowEqual, useSelector, useDispatch} from 'react-redux'
import {styled} from '@linaria/react'

import {Attribute, AttributeInfo, Unit as TUnit, UnitDescriptions, UnitType} from '../types/models'
import {GlobalState} from '../redux/reducers'
import Unit from './Unit'
import Icon, {ComplexIcon, ValuedBonusIcons} from './Icon'
import {ATTACK_LIMIT, ATTRIBUTES, BONUS, UNIT_DESCRIPTION, UNIT_TYPE} from '../models/attributes'
import UnitCards from './UnitCards'
import {AttDefValue, useAttDef} from '../context'
import actions from '../redux/actions'
import {MIDDLE_WIDTH, MOBILE_WIDTH} from '../constants'

const Title = styled.h2<{isDefender?: boolean}>`
  color: ${(props) => (props.isDefender ? '#126312' : '#8e2929')};
  text-align: center;
  @media (max-width: ${MIDDLE_WIDTH}px) {
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
  @media (max-width: ${MOBILE_WIDTH}px) {
    font-size: 14px;
    margin: 4px;
  }
`
const Container = styled.div`
  margin: 20px;
  background: rgba(255, 255, 255, 0.7);
  width: 100%;
  @media (max-width: ${MOBILE_WIDTH}px) {
    margin: 4px;
  }
`
const UnitBG = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 80px;
  padding: 20px 10px 10px;
  background: rgba(0, 0, 0, 0.5);
  @media (max-width: ${MOBILE_WIDTH}px) {
    min-height: 30px;
  }
`
const DescriptionBG = styled.div`
  min-height: 200px;
`
const Attributes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`
const FeatureText = styled.p`
  padding: 0 10px;
  font-size: 14px;
  color: #031e3a;
`

const getAttributeInfo = (name: Attribute | UnitType | UnitDescriptions): AttributeInfo =>
  UNIT_TYPE[name as UnitType] || ATTRIBUTES[name as Attribute] || UNIT_DESCRIPTION[name as UnitDescriptions]

const getIcons = (unit: TUnit) => [
  UNIT_TYPE[unit.type],
  ...unit.attributes.map((attr) => ATTRIBUTES[attr]),
  ...(unit.description ? [UNIT_DESCRIPTION[unit.description]] : []),
  ...(unit.attackLimit ? [ATTACK_LIMIT[unit.attackLimit]] : []),
  ...(unit.support2 ? [BONUS.support] : []),
]

const UnitDescription = () => {
  const isDefender = useAttDef() === AttDefValue.defend
  const dispatch = useDispatch()
  const unit = useSelector((state: GlobalState) => (isDefender ? state.defender : state.attacker), shallowEqual)

  return (
    <Container>
      <Title
        isDefender={isDefender}
        onClick={() => {
          dispatch(isDefender ? actions.setOpenDefendList(true) : actions.setOpenAttackList(true))
          if (window.innerWidth < MIDDLE_WIDTH)
            dispatch(dispatch(!isDefender ? actions.setOpenDefendList(false) : actions.setOpenAttackList(false)))
        }}
      >
        {isDefender ? 'Defender' : 'Attacker'}
      </Title>
      <UnitBG>{!!unit && <Unit unit={unit} />}</UnitBG>
      <DescriptionBG>
        {!!unit && (
          <>
            <Attributes>
              {getIcons(unit).map((item, ind) => {
                return <Icon key={`${item.id}-${ind}-${Number(isDefender)}`} attribute={item} />
              })}
              {unit.otherBonus?.map((item, ind) => {
                return (
                  <ComplexIcon
                    mainIconAttribute={BONUS[item.bonusType]}
                    key={`${item.bonusType}-${ind}-${Number(isDefender)}`}
                    subIconsAttributes={
                      item.opponentType?.length
                        ? item.opponentType.map(({type, negative}) => ({
                            attr: getAttributeInfo(type),
                            negative,
                          }))
                        : undefined
                    }
                  />
                )
              })}
              {unit.attackBonus?.map((item, ind) => (
                <ValuedBonusIcons
                  key={`valued-icon-${ind}`}
                  value={item.value}
                  attributeInfo={item.type.map((t) => getAttributeInfo(t.type))}
                />
              ))}
            </Attributes>
            {!!unit.feature && <FeatureText>{unit.feature}</FeatureText>}
            <UnitCards unit={unit} />
          </>
        )}
      </DescriptionBG>
    </Container>
  )
}

export default UnitDescription
