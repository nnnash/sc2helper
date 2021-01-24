import React from 'react'
import {useSelector, shallowEqual} from 'react-redux'
import {styled} from '@linaria/react'

import UnitList from './UnitList'
import Comparision from './Comparision'
import {PROTOSS_DATA, TERRAN_DATA, ZERG_DATA} from '../data/units'
import {AttDefProvider, AttDefValue} from '../context'
import Footer from './Footer'
import {BOTTOM_WIDTH, MIDDLE_WIDTH, MOBILE_WIDTH, TOP_WIDTH} from '../constants'
import {GlobalState} from '../redux/reducers'

const Container = styled.div`
  display: flex;
  padding: 30px;
  min-width: 100%;
  min-height: 100%;
  @media (max-width: ${BOTTOM_WIDTH}px) {
    padding: 0;
  }
`
const List = styled.div`
  flex-grow: 0;
  min-width: 120px;
  & + & {
    margin-left: 20px;
  }
  @media (max-width: ${TOP_WIDTH}px) {
    min-width: auto;
  }
`
const Results = styled.div`
  flex-grow: 1;
  min-width: 500px;
  z-index: 100;

  @media (max-width: ${MOBILE_WIDTH}px) {
    min-width: auto;
  }
`
const LIST_PANE_WIDTH_MOBILE = 264
const Lists = styled.section<{isRight?: boolean; open: boolean}>`
  display: flex;
  position: relative;

  @media (max-width: ${MIDDLE_WIDTH}px) {
    display: ${(props) => (props.open ? 'flex' : 'none')};
  }
  @media (max-width: ${BOTTOM_WIDTH}px) {
    overflow: hidden;
    z-index: 1000;
    margin-left: ${({isRight}) => (isRight ? 0 : `-${LIST_PANE_WIDTH_MOBILE}px`)};
    margin-right: ${({isRight}) => (isRight ? `-${LIST_PANE_WIDTH_MOBILE}px` : 0)};
    transform: translateX(
      ${({isRight, open}) => {
        if (!open) return 0
        return (isRight ? -1 : 1) * LIST_PANE_WIDTH_MOBILE
      }}px
    );
    background: #031e3a;
    padding: 10px;
  }
`

const Main = () => {
  const {attackListOpen, defendListOpen} = useSelector(
    ({defendListOpen, attackListOpen}: GlobalState) => ({attackListOpen, defendListOpen}),
    shallowEqual,
  )
  return (
    <>
      <Container>
        <AttDefProvider attDef={AttDefValue.attack}>
          <Lists open={attackListOpen}>
            <List>
              <UnitList units={ZERG_DATA} />
            </List>
            <List>
              <UnitList units={TERRAN_DATA} />
            </List>
            <List>
              <UnitList units={PROTOSS_DATA} />
            </List>
          </Lists>
        </AttDefProvider>
        <Results>
          <Comparision />
        </Results>
        <AttDefProvider attDef={AttDefValue.defend}>
          <Lists isRight open={defendListOpen}>
            <List>
              <UnitList units={PROTOSS_DATA} />
            </List>
            <List>
              <UnitList units={TERRAN_DATA} />
            </List>
            <List>
              <UnitList units={ZERG_DATA} />
            </List>
          </Lists>
        </AttDefProvider>
      </Container>
      <Footer />
    </>
  )
}

export default Main
