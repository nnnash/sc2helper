import React, {FC, useMemo} from 'react'
import {styled} from '@linaria/react'

import {Unit as TUnit} from 'types/models'
import {getDataByRace} from 'data/units'
import {useRaceProvider} from '../../context'
import {unitSize} from '../../styling/shared'
import Unit from './Unit'
import {getUnitImage} from 'components/UnitImage'

const UnitContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: ${unitSize}px;
`
const FromImg = styled.img`
  border-radius: 50%;
  box-shadow: 0px -1px 8px 5px white;
  background: white;
`
const Comb = styled.div`
  > div {
    display: flex;
    justify-content: center;
    > img {
      width: ${unitSize / 1.2}px;
    }
    > span {
      font-size: 22px;
      font-weight: bold;
      color: black;
      margin-left: -40px;
    }
  }
`
const Spacer = styled.div`
  height: 10px;
`
const Prerequisites = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: white;
  text-align: center;
  margin-bottom: 4px;
  text-shadow: 0 0 5px black;
`

interface Props {
  unit: TUnit
}
const Mutant: FC<Props> = ({unit}) => {
  const {race} = useRaceProvider()
  const mutatedFrom = useMemo(() => {
    const units = getDataByRace(race)
    return units.filter((u) => unit.mutationFrom?.includes(u.name))
  }, [unit])
  return (
    <UnitContainer>
      {!!unit.mutationPrerequisites && (
        <Prerequisites>
          <div>Needs</div>
          <div>{unit.mutationPrerequisites}</div>
        </Prerequisites>
      )}
      {mutatedFrom?.length === 1 && <FromImg src={getUnitImage(mutatedFrom[0].name)} alt={mutatedFrom[0].name} />}
      {mutatedFrom?.length === 2 && (
        <Comb>
          {['00', '01', '11'].map((comb) => {
            const [ind1, ind2] = comb.split('').map(Number)
            return (
              <div key={comb}>
                <FromImg src={getUnitImage(mutatedFrom[ind1].name)} alt={mutatedFrom[ind1].name} />
                <FromImg src={getUnitImage(mutatedFrom[ind2].name)} alt={mutatedFrom[ind2].name} />
                <span>+</span>
              </div>
            )
          })}
        </Comb>
      )}
      <Spacer />
      <Unit unit={unit} />
    </UnitContainer>
  )
}

const Mutants = () => {
  const {race} = useRaceProvider()
  const mutants = useMemo(() => {
    const units = getDataByRace(race)
    return units.filter((u) => !!u.mutationFrom)
  }, [race])
  if (!mutants.length) return null

  return (
    <>
      {mutants.map((m) => (
        <Mutant unit={m} key={m.name} />
      ))}
    </>
  )
}

export default Mutants
