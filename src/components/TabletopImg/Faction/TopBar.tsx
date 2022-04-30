import React, {FC} from 'react'
import {styled} from '@linaria/react'

import {blockShadow} from '../styling/shared'
import {useRaceProvider} from '../context'
import {logoMap} from '../../../data/race'
import palette from '../styling/palette'

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
  display: flex;
  flex-direction: column;
  flex: 1;
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
const TopLine = styled.div`
  display: flex;
  flex: 1;
`
const Name = styled(Block)`
  width: 280px;
  margin-right: ${SPACING};
  ${blockShadow}
  h1 {
    text-transform: capitalize;
    margin: 0;
  }
`
const Description = styled(Block)`
  width: 250px;
  margin-right: ${SPACING};
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
const Resources = styled.div`
  display: flex;
  margin-top: ${SPACING};
  justify-content: space-around;
`
const Resource = styled(Block)<{color: string}>`
  margin-right: ${SPACING};
  width: 35px;
  height: 35px;
  background: ${(p) => p.color};
  color: white;
  font-weight: bold;
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
        <TopLine>
          <Name>
            <h1>{race}</h1>
          </Name>
          <Unavailable>Unavailable workers</Unavailable>
          <Pool>Worker pool</Pool>
        </TopLine>
        {[palette.mineral, palette.gas].map((res) => (
          <Resources key={res}>
            {Array(13)
              .fill('')
              .map((_, ind) => (
                <Resource color={res} key={`${res}-${ind}`}>
                  {ind}
                </Resource>
              ))}
          </Resources>
        ))}
      </Main>
    </Container>
  )
}

export default TopBar
