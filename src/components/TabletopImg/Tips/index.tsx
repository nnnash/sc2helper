import React, {FC, useCallback, useRef} from 'react'
import {styled} from '@linaria/react'

import space from '../img/space.jpg'
import {Race} from '../../../types/models'
import {getDataByRace} from '../../../data/units'
import UnitView from './Unit'
import {download} from '../utils'

const Container = styled.div`
  position: relative;
  width: 1700px;
  height: 2200px;
  display: flex;
  justify-content: space-evenly;
`
const Bg = styled.img`
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`
const RaceColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  width: 31.5%;
`

const Tips: FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const onClick = useCallback(() => {
    download(ref, `tips`)
  }, [ref])
  return (
    <Container ref={ref} onClick={onClick}>
      <Bg src={space} alt="tips2" width={1700} height={2200} />
      {Object.values(Race).map((race) => {
        const units = getDataByRace(race)
        return (
          <RaceColumn key={`tips-race-${race}`}>
            {units.map((u) => (
              <UnitView key={`tips-unit-${u.name}`} unit={u} race={race} />
            ))}
          </RaceColumn>
        )
      })}
    </Container>
  )
}

export default Tips
