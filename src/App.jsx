import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { getLocalUser } from './services/userService'

import './index.css'
import Navbar from './components/Navbar'
import Search from './components/Search'
import PaperContent from './components/Paper'

import Home from './containers/Home'
import Login from './containers/Login'
import Register from './containers/Register'
import Chats from './containers/Chats'
import Stories from './containers/Stories'
import Notifications from './containers/Notifications'
import Friends from './containers/Friends'
import NotFound from './containers/NotFound'

export default function App() {
  const [user, setUser] = useState({ loading: true })

  useEffect(() => {
    const updateUser = async () => { setUser(await getLocalUser()) }
    updateUser()
  }, [])
  return (
    <BrowserRouter>
      <Navbar username={user.username} avatar={user.imageBase64} />
      <div className='body'>
        <PaperContent Component={() =>
          <>
            {user.loading === undefined && <Search user={user} />}
            <br />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/chats'><Chats user={user} /></Route>
              <Route exact path='/stories' ><Stories user={user} /></Route>
              <Route exact path='/notifications' >< Notifications user={user} /></Route>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/friends' >< Friends user={user} /></Route>
              <Route path='*' component={NotFound} />
            </Switch>
          </>
        } />
      </div>
    </BrowserRouter>
  )
}
