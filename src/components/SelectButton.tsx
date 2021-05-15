import React from 'react'
import {styled} from '@linaria/react'

const Container = styled.div`
  display: flex;
  justify-content: center;
`
const Button = styled.button`
  border: 1px solid white;
  color: white;
  background: transparent;
  outline: none;
  padding: 8px 16px;
  cursor: pointer;
  &[data-selected='true'] {
    color: black;
    background: white;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.16);
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
