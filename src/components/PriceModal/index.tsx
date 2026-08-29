import React, {FC} from 'react'
import {styled} from '@linaria/react'
import {RaceChooser, ItemTypeChooser, InitialResources, AvailableResources, AvailableWorkers} from './Controls'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {GlobalState} from '../../redux/reducers'
import actions from '../../redux/actions'
import ItemList from './ItemList'
import Purchases from './Purchases'
import {MIDDLE_WIDTH} from '../../constants'
import {brackets, colors} from '../../styling/theme'

interface Props {
  open: boolean
}
const Container = styled.div<Props>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(2, 8, 16, 0.82);
  backdrop-filter: blur(3px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${(props) => (props.open ? 'visible' : 'hidden')};
`
const Content = styled.section`
  position: relative;
  width: 80%;
  height: 80%;
  background: linear-gradient(160deg, rgba(12, 36, 62, 0.98), rgba(4, 16, 31, 0.99));
  border: 2px solid ${colors.edge};
  box-shadow: 0 0 40px ${colors.glow}, inset 0 1px 0 rgba(120, 200, 255, 0.3);
  display: flex;
  ${brackets(20)}
  @media (max-width: ${MIDDLE_WIDTH}px) {
    width: 100%;
  }
`
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgba(43, 127, 184, 0.4);
  background: rgba(3, 12, 24, 0.5);
`
const Scrollable = styled.div`
  overflow: auto;
`
const Field = styled.div`
  padding: 8px;
`

export const PriceModal: FC = () => {
  const dispatch = useDispatch()
  const open = useSelector<GlobalState, boolean>((s) => s.modalOpen, shallowEqual)
  return (
    <Container open={open} onClick={() => dispatch(actions.togglePriceModal(false))}>
      <Content onClick={(e) => e.stopPropagation()}>
        <ItemList />
        <FormWrapper>
          <Field>
            <RaceChooser />
          </Field>
          <Field>
            <ItemTypeChooser />
          </Field>
          <Scrollable>
            <Field>
              <InitialResources />
            </Field>
            <Field>
              <AvailableResources />
            </Field>
            <Field>
              <AvailableWorkers />
            </Field>
            <Purchases />
          </Scrollable>
        </FormWrapper>
      </Content>
    </Container>
  )
}

export default React.memo(PriceModal)
