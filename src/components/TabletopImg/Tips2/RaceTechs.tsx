import React, {FC} from 'react'
import {styled} from '@linaria/react'

import {Race} from '../../../types/models'
import palette from '../styling/palette'
import PricedItem from './PricedItem'
import {RACE_TIPS} from '../../../data/raceTips'
import {TECHS} from '../../../data/techs'
import {getImgUrl} from '../../../utils'
import {getUnitImage} from '../../UnitImage'
import Tech from './Tech'

const Container = styled.div``
const Title = styled.h2`
  text-transform: capitalize;
  color: ${palette.tipsColor};
  margin: 4px 0;
`

interface Props {
  race: Race
}
const RaceTechs: FC<Props> = ({race}) => {
  const {baseImprovements, baseUnits, raceTechs} = RACE_TIPS[race]
  const techs = TECHS[race]
  return (
    <Container>
      <Title>Base improvements</Title>
      {baseUnits.map((unit) => (
        <PricedItem key={`base-unit-${unit.name}`} item={unit} techs={TECHS[race]} img={getUnitImage(unit.name)} />
      ))}
      {baseImprovements.map((item) => (
        <PricedItem
          key={item.name}
          item={{
            name: item.name.split('(')[0],
            minerals: item.m,
            gas: item.vg,
            feature: item.baseimprovement,
          }}
          img={getImgUrl(item.img)}
          techs={techs}
        />
      ))}
      <Title>Faction techs</Title>
      {raceTechs.map((tech) => (
        <div key={`${tech.name}-tech-${tech.name}`}>
          <Tech tech={tech} />
        </div>
      ))}
    </Container>
  )
}

export default RaceTechs
