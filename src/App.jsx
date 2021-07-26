// eslint-disable-next-line
import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Cookies from 'universal-cookie'

import './index.css'
import Navbar from './components/Navbar'

import Home from './containers/Home'
import Login from './containers/Login'
import Register from './containers/Register'
import Chats from './containers/Chats'
import Stories from './containers/Stories'
import Notifications from './containers/Notifications'
import NotFound from './containers/NotFound'

const cookies = new Cookies()

export default function App() {
  // const [avatar, setUsername] = useState('')

  return (
    <BrowserRouter>
      <Navbar username={cookies.get('username')} avatar={cookies.get('avatar')} />
      <div class='body'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/chats' component={Chats} />
          <Route exact path='/stories' component={Stories} />
          <Route exact path='/notifications' component={Notifications} />
          <Route path='*' component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}
