import React from 'react'
import {shallowEqual, useSelector, useDispatch} from 'react-redux'
import {styled} from '@linaria/react'

import {GlobalState} from '../redux/reducers'
import Unit from './Unit'
import Icon, {ComplexIcon, ValuedBonusIcons} from './Icon'
import {BONUS} from '../models/attributes'
import UnitCards from './UnitCards'
import {AttDefValue, useAttDef} from '../context'
import actions from '../redux/actions'
import {MIDDLE_WIDTH, MOBILE_WIDTH} from '../constants'
import {getAttributeInfo, getIcons} from '../utils'
import {brackets, colors, fonts, inset, panel} from '../styling/theme'

const Title = styled.h2<{isDefender?: boolean}>`
  color: ${(props) => (props.isDefender ? colors.health : colors.attack)};
  font-family: ${fonts.display};
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-align: center;
  margin: 0 0 12px;
  padding: 10px 0 8px;
  text-shadow: 0 0 12px currentColor, 0 1px 2px rgba(0, 0, 0, 0.9);
  border-bottom: 1px solid rgba(43, 127, 184, 0.45);
  @media (max-width: ${MIDDLE_WIDTH}px) {
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
  @media (max-width: ${MOBILE_WIDTH}px) {
    font-size: 13px;
    letter-spacing: 0.1em;
    margin: 4px;
    padding: 4px 0;
  }
`
const Container = styled.div`
  position: relative;
  margin: 20px;
  padding: 0 0 10px;
  width: 100%;
  ${panel}
  ${brackets(16)}
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
  margin-bottom: 10px;
  ${inset}
  border-left: none;
  border-right: none;
  @media (max-width: ${MOBILE_WIDTH}px) {
    min-height: 30px;
  }
`
const DescriptionBG = styled.div`
  min-height: 200px;
`
// The attribute glyph colours are shared with the printable tabletop cards and
// are tuned for a light background, so the row gets its own lit readout plate
// rather than sitting directly on the dark console panel. No clip-path here —
// it would cut off the icon tooltips that pop out above the row.
const Attributes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin: 0 12px 12px;
  padding: 8px 6px;
  background: linear-gradient(180deg, rgba(206, 227, 242, 0.94), rgba(163, 197, 220, 0.9));
  border: 1px solid ${colors.edgeBright};
  box-shadow: 0 0 14px ${colors.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.85);
  @media (max-width: ${MOBILE_WIDTH}px) {
    margin: 0 6px 8px;
    padding: 4px 2px;
  }
`
const FeatureText = styled.p`
  padding: 0 14px;
  font-size: 15px;
  line-height: 1.4;
  color: ${colors.text};
`

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
