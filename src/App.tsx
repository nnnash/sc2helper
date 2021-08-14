import React from 'react'
import {Provider} from 'react-redux'

import store from './store'
import Main from './components/Main'
import TabletopImg from './components/TabletopImg'

const App = () => <Provider store={store}>{process.env.REACT_APP_TABLETOP_IMG ? <TabletopImg /> : <Main />}</Provider>

export default App
