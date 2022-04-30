import React, {FC} from 'react'
import {styled} from '@linaria/react'

import {TBuilding, Unit} from 'types/models'
import palette from '../styling/palette'
import {TECHS} from '../../../data/techs'
import PricedItem from './PricedItem'
import {getUnitImage} from '../../UnitImage'

const Container = styled.div`
  clear: left;
`
const ImgWrapper = styled.div`
  float: left;
`
const BuildImg = styled.img`
  width: 90px;
`
const Resource = styled.div`
  font-size: 20px;
  font-weight: bold;
`
const Mineral = styled(Resource)`
  color: ${palette.mineral};
`
const Gas = styled(Resource)`
  color: ${palette.gas};
`
const BuildPrice = styled.div`
  display: flex;
  justify-content: space-around;
`

interface Props {
  building: TBuilding
  units: Array<Unit>
}
const Building: FC<Props> = ({building, units}) => {
  const techs = TECHS[building.race]
  return (
    <Container>
      <ImgWrapper>
        <BuildImg src={building.img} alt="building" />
        {!!building.name && (
          <BuildPrice>
            <Mineral>{building.minerals}</Mineral>
            <Gas>{building.gas}</Gas>
          </BuildPrice>
        )}
      </ImgWrapper>
      <div>
        {units.map((unit) => (
          <PricedItem key={`building-unit-${unit.name}`} item={unit} techs={techs} img={getUnitImage(unit.name)} />
        ))}
      </div>
    </Container>
  )
}

export default Building
