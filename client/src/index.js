import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import {Provider} from 'react-redux'
import store from './store'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider><Provider store={store}><App /></Provider></MuiThemeProvider>,
  document.getElementById('root')
)
