import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Auth from './auth/Auth'
import reportWebVitals from './reportWebVitals'
import { createBrowserHistory } from 'history'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
const history = createBrowserHistory()
// const history = createHistory()

const auth_input = new Auth(history)

const handleAuthentication = (props: any) => {
  const location = props.location
  if (/access_token|id_token|error/.test(location.hash)) {
    auth_input.handleAuthentication()
  }
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={} />
      </Routes>
    </BrowserRouter>

    {/* <App auth={auth} {...props} /> */}
  </React.StrictMode>,
  document.getElementById('root')
)

// {
/* <Router history={history}>
<div>
  <Route
    path="/callback"
    render={props => {
      handleAuthentication(props)
      return <Callback />
    }}
  />
  <Route
    render={props => {
      return <App auth={auth} {...props} />
    }}
  />
</div>
</Router> */
// }

reportWebVitals()
