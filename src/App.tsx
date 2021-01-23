import React from 'react'
import {Provider} from 'react-redux'
import {styled} from '@linaria/react'

import store from './store'
import Main from './components/Main'

const Comp = styled.div`
  padding: 40px;
`

const App = () => (
  <Provider store={store}>
    <Comp>
      <Main />
    </Comp>
  </Provider>
)

export default App
