import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './index.css'
import Navbar from './components/Navbar'

import Home from './containers/Home'
import Login from './containers/Login'
import Register from './containers/Register'
import Chats from './containers/Chats'
import Stories from './containers/Stories'
import Notifications from './containers/Notifications'
import NotFound from './containers/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
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
