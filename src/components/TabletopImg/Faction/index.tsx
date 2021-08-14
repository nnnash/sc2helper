import React, {FC, useCallback, useRef} from 'react'
import {styled} from '@linaria/react'

import {bgImageByColor, FactionColor} from '../models'
import {download} from '../utils'

import {RaceContextProvider} from '../context'
import TopBar from './TopBar'
import Units from './Units'
import Bottom from './Bottom'

const Container = styled.div`
  height: 1024px;
  width: 1024px;
  position: relative;
`
const Img = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
`
const HtmlContainer = styled.div`
  padding-top: 255px;
`

interface Props {
  color: FactionColor
}
const Faction: FC<Props> = ({color}) => {
  const ref = useRef<HTMLDivElement>(null)
  const onClick = useCallback(() => {
    download(ref, `faction-${color}`)
  }, [ref])
  return (
    <RaceContextProvider color={color}>
      <Container ref={ref} onClick={onClick}>
        <Img src={bgImageByColor[color]} alt="factionZerg" />
        <HtmlContainer>
          <TopBar />
          <Units />
          <Bottom />
        </HtmlContainer>
      </Container>
    </RaceContextProvider>
  )
}

export default Faction
