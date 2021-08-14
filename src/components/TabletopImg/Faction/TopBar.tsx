import React, {FC} from 'react'
import {styled} from '@linaria/react'

import {blockShadow} from '../styling/shared'
import {Race} from '../../../types/models'
import minerals from '../img/minerals.png'
import gas from '../img/gas.png'
import zergLogo from '../img/zergLogo.png'
import protossLogo from '../img/protossLogo.png'
import terranLogo from '../img/terranLogo.png'
import {useRaceProvider} from '../context'

const logoMap = {
  [Race.zerg]: zergLogo,
  [Race.protoss]: protossLogo,
  [Race.terran]: terranLogo,
}

const SPACING = '10px'

const Container = styled.div`
  color: white;
  height: 175px;
  overflow: hidden;
  position: relative;
  display: flex;
  padding: ${SPACING} 0 ${SPACING} 155px;
`
const Hole = styled.div`
  position: absolute;
  left: 15px;
  top: ${SPACING};
  width: 130px;
  height: 130px;
  border-radius: 50%;
  box-shadow: 0 0 0 99999px black, 0 0 10px inset white;
  z-index: -1;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 80%;
    filter: drop-shadow(0 0 white);
  }
`
const Main = styled.div`
  width: 385px;
  display: flex;
  flex-direction: column;
`
const Block = styled.div<{fontSize?: number}>`
  text-align: center;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: ${(p) => `${p.fontSize || 20}px`};
  ${blockShadow}
`
const Name = styled(Block)`
  width: 100%;
  ${blockShadow}
  h1 {
    text-transform: capitalize;
    margin: 0;
  }
`
const SubName = styled.div`
  display: flex;
  flex: 1;
  margin-top: ${SPACING};
`
const Description = styled(Block)`
  width: 250px;
  margin-right: ${SPACING};
`
const Resource = styled(Block)`
  width: 100px;
  margin-right: ${SPACING};
  img {
    width: 70px;
    height: 70px;
  }
`
const Unavailable = styled(Block)`
  width: 0;
  flex-grow: 1;
`
const Pool = styled(Block)`
  width: 0;
  flex-grow: 1;
  margin: 0 ${SPACING};
`

const TopBar: FC = () => {
  const {race} = useRaceProvider()
  return (
    <Container>
      <Hole>
        <img src={logoMap[race]} alt="logo" />
      </Hole>
      <Description>
        Start with 10 workers and 10 resources to spend on start units, transports, or additional workers
      </Description>
      <Main>
        <Name>
          <h1>{race}</h1>
        </Name>
        <SubName>
          <Resource>
            <img src={minerals} alt="min" />
          </Resource>
          <Resource>
            <img src={gas} alt="gas" />
          </Resource>
          <Unavailable>Unavailable workers</Unavailable>
        </SubName>
      </Main>
      <Pool fontSize={40}>Worker pool</Pool>
    </Container>
  )
}

export default TopBar
