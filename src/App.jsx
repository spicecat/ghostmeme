import React, { useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

import './index.css'
import Navbar from './components/Navbar'

import Login from './containers/Login'
import Register from './containers/Register'
import Chats from './containers/Chats'
import Stories from './containers/Stories'
import Notifications from './containers/Notifications'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <div class='body'>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/chats" component={Chats} />
          <Route exact path="/stories" component={Stories} />
          <Route exact path="/notifications" component={Notifications} />
          <Route exact path="/"><Login /></Route> {/* Home page */}
          <Redirect to="login" />
        </div>
      </Switch>
    </BrowserRouter>
  )
}
