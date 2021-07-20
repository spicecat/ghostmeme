import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Cookies from 'universal-cookie'

import './styles/App.css'
// import Navbar from './components/Navbar'

import Login from './containers/Login'
import Register from './containers/Register'
import Chats from './containers/Chats'
import Stories from './containers/Stories'
import Notifications from './containers/Notifications'

const cookies = new Cookies()

export default function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <br />
      <Switch>
        <Route exact path="/login"><Login /></Route>
        <Route exact path="/register"><Register /></Route>
        <Route exact path="/Chats"><Chats /></Route>
        <Route exact path="/Stories"><Stories /></Route>
        <Route exact path="/Notifications"><Notifications /></Route>
        <Route exact path="/"><Login /></Route> {/* Home page */}
        <Route><Submit /></Route> {/* Page not found */}
      </Switch>
    </BrowserRouter>
  )
}
