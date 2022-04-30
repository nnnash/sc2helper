import React, {FC, useCallback, useRef} from 'react'
import {styled} from '@linaria/react'

import {Attribute, BaseUnitType, Bonus, UnitDescriptions} from 'types/models'
import space from '../img/space.jpg'
import palette from '../styling/palette'
import {download} from '../utils'
import d from '../../../data/data.json'
import {Raw} from '../../../types/raw'
import {ATTACK_LIMIT, ATTRIBUTES, BONUS, UNIT_DESCRIPTION} from '../../../models/attributes'
import Icon, {ComplexIcon, ValuedBonusIcons} from '../../Icon'
import {getAbbrValue, getBonusValue} from '../../../data/units'

const SPACING = 16
const Container = styled.div`
  position: relative;
  width: 1920px;
  height: 1080px;
  padding: ${SPACING}px;
  display: flex;
  > img {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100%;
  > * {
    padding: 0 8px;
    background-color: ${palette.tipsBg};
    width: 48.8%;
    margin-right: ${SPACING}px;
    flex-grow: 1;
  }
`
const Title = styled.h1`
  margin: 0 0 ${SPACING}px;
  text-transform: capitalize;
  color: ${palette.tipsColor};
  text-align: center;
  flex-grow: 0;
  &:not(:first-child) {
    margin-top: ${SPACING}px;
  }
`
const AttributeDescr = styled.div`
  display: flex;
  align-items: center;
`
const AttributeDescrText = styled.div`
  padding: 8px;
`

const data = d as Raw

const getAttributeInfo = (name: string) =>
  ATTRIBUTES[name as Attribute] ||
  UNIT_DESCRIPTION[name as UnitDescriptions] ||
  BONUS[name as Bonus] ||
  ATTACK_LIMIT[name as BaseUnitType]

const Attributes: FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const onClick = useCallback(() => {
    download(ref, `tip-attributes`)
  }, [ref])

  return (
    <Container ref={ref} onClick={onClick}>
      <img src={space} alt="tips2" width={1920} height={1080} />
      <Content>
        <Title>attributes</Title>
        {data.attributes.map((attr) => {
          if (attr.name && !attr.descr) {
            const attrInfo = getAttributeInfo(attr.name)
            return (
              <AttributeDescr>
                <Icon attribute={attrInfo} />
                <AttributeDescrText>Just marks unit as {attr.name}</AttributeDescrText>
              </AttributeDescr>
            )
          }
          if (attr.name && attr.descr) {
            const attrInfo = getAttributeInfo(attr.name)
            return (
              <AttributeDescr>
                <Icon attribute={attrInfo} />
                <AttributeDescrText>{attr.descr}</AttributeDescrText>
              </AttributeDescr>
            )
          }
          if (attr.abbr) {
            const attrs = attr.abbr.split(',').reduce<{icons: Array<React.ReactNode>; texts: Array<string>}>(
              (acc, item) => {
                if (parseInt(item.split(' ')[0])) {
                  const bonus = getBonusValue(item)
                  const attribute = getAttributeInfo(bonus.type[0].type)
                  return {
                    icons: acc.icons.concat(<ValuedBonusIcons value={bonus.value} attributeInfo={[attribute]} />),
                    texts: acc.texts.concat(`+${bonus.value} attack vs ${attribute.id}`),
                  }
                }
                const attributes = item
                  .split(' ')
                  .map(getAbbrValue)
                  .map(({type}) => getAttributeInfo(type))
                return {
                  icons: acc.icons.concat(
                    <ComplexIcon mainIconAttribute={attributes[0]} subIconsAttributes={[{attr: attributes[1]}]} />,
                  ),
                  texts: acc.texts.concat(`${attributes[0].id} vs ${attributes[1].id} units`),
                }
              },
              {icons: [], texts: []},
            )
            return (
              <AttributeDescr>
                <AttributeDescr>{attrs.icons}</AttributeDescr>
                <AttributeDescrText>{attrs.texts.join(', ')}</AttributeDescrText>
              </AttributeDescr>
            )
          }
        })}
        <Title>Regrouping phase</Title>
        <div>
          <ol>
            <li>Destroy bases, installations and transports</li>
            <li>Lose Resource cards</li>
            <li>Gain Resource cards</li>
            <li>Retrieve workers</li>
            <li>Gain conquest points</li>
            <li>Check for normal victory</li>
            <li>Play Event cards</li>
            <li>Discard Combat cards</li>
            <li>Optionally discard up to half of your hand and take as many cards from the deck</li>
            <li>Pass the first player token</li>
          </ol>
        </div>
      </Content>
    </Container>
  )
}

export default Attributes
