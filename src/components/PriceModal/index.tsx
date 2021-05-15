import React, {FC} from 'react'
import {styled} from '@linaria/react'
import {RaceChooser, ItemTypeChooser, InitialResources, AvailableResources, AvailableWorkers} from './Controls'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {GlobalState} from '../../redux/reducers'
import actions from '../../redux/actions'
import ItemList from './ItemList'
import Purchases from './Purchases'
import {MIDDLE_WIDTH} from '../../constants'

interface Props {
  open: boolean
}
const Container = styled.div<Props>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${(props) => (props.open ? 'visible' : 'hidden')};
`
const Content = styled.section`
  width: 80%;
  height: 80%;
  background: #031e3a;
  border: 6px solid white;
  display: flex;
  @media (max-width: ${MIDDLE_WIDTH}px) {
    width: 100%;
  }
`
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
