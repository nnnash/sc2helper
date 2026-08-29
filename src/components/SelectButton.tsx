import React from 'react'
import {styled} from '@linaria/react'

import {button, colors} from '../styling/theme'

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
`
const Button = styled.button`
  padding: 8px 16px;
  font-size: 13px;
  ${button}
  &[data-selected='true'] {
    color: #041018;
    background: linear-gradient(180deg, ${colors.edgeBright}, ${colors.edge});
    border-color: ${colors.edgeBright};
    box-shadow: 0 0 16px ${colors.glowStrong};
    font-weight: 700;
  }
`

interface Props<TType> {
  items: Array<TType>
  selected: TType
  setSelected: (val: TType) => void
  displayName?: (key: TType) => string
}
const SelectButton: <T extends string = string>(props: Props<T>) => React.ReactElement<Props<T>> = ({
  items,
  selected,
  setSelected,
  displayName = (val) => val,
}) => (
  <Container>
    {items.map((item) => (
      <Button key={item} data-selected={item === selected} onClick={() => setSelected(item)}>
        {displayName(item)}
      </Button>
    ))}
  </Container>
)

export default SelectButton
