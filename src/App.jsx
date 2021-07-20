import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"

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
          <Route exact path="/login"><Login /></Route>
          <Route exact path="/register"><Register /></Route>
          <Route exact path="/Chats"><Chats /></Route>
          <Route exact path="/Stories"><Stories /></Route>
          <Route exact path="/Notifications"><Notifications /></Route>
          <Route exact path="/"><Login /></Route> {/* Home page */}
          <Route><Login /></Route> {/* Page not found */}
        </div>
      </Switch>
    </BrowserRouter>
  )
}
