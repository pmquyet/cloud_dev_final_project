import React from 'react'
import { Link, Route, Router, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import Auth from './auth/Auth'
import { LogIn } from './components/LogIn'
import { NotFound } from './components/NotFound'

import './App.css'
import { Todos } from './components/Todos'

export interface AppProps {}

export interface AppProps {
  auth: Auth
  history: any
}

export interface AppState {}

const App = (auth: Auth) => {
  const handleLogin = () => {
    auth.login()
  }

  const handleLogout = () => {
    auth.logout()
  }
  const generateMenu = () => {
    return (
      <Menu>
        <Menu.Item name="home">
          <Link to="/">Home</Link>
        </Menu.Item>

        <Menu.Menu position="right">{logInLogOutButton()}</Menu.Menu>
      </Menu>
    )
  }

  const logInLogOutButton = () => {
    if (auth.isAuthenticated()) {
      return (
        <Menu.Item name="logout" onClick={handleLogout}>
          Log Out
        </Menu.Item>
      )
    } else {
      return (
        <Menu.Item name="login" onClick={handleLogin}>
          Log In
        </Menu.Item>
      )
    }
  }

  const generateCurrentPage = () => {
    if (!auth.isAuthenticated()) {
      return <LogIn auth={auth} />
    }

    return (
      <Routes>
        {/* <Route
          path="/"
          element={<Todos {...props} auth={props.auth} />}
          // render={(props) => {
          //   return <Todos {...props} auth={props.auth} />
          // }}
        /> */}

        {/* <Route
          path="/todos/:todoId/edit"
          render={(props) => {
            return <EditTodo {...props} auth={props.auth} />
          }}
        /> */}

        <Route element={<NotFound />} />
      </Routes>
    )
  }

  return (
    <div>
      <nav>
        <Link to="me">My Profile</Link>
      </nav>

      <Routes>
        {/* <Route path="me" element={<MyProfile />} />
          <Route path=":id" element={<OthersProfile />} /> */}
      </Routes>
    </div>
  )
}

export default App
