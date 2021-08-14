import React, {FC} from 'react'
import {styled} from '@linaria/react'
import {useRaceProvider} from '../../context'
import {Race} from '../../../../types/models'
import {blockShadow} from '../../styling/shared'

const SIZE = '60px'
const SPACING = '24px'
const Container = styled.div`
  padding: ${SPACING} 0 ${SPACING} ${SPACING};
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  width: 280px;
  background: black;
  border-radius: 20px 20px 0 0;
`
const Block = styled.div`
  width: ${SIZE};
  height: ${SIZE};
  margin-right: ${SPACING};
  background: #031e3a;
  ${blockShadow}
`

const Modules: FC = () => {
  const {race} = useRaceProvider()
  return (
    <Container>
      {Array(race === Race.zerg ? 5 : 6)
        .fill('')
        .map((_, i) => (
          <Block key={`${race}-module-${i}`} />
        ))}
    </Container>
  )
}

export default Modules
