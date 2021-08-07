import { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Paper } from '@material-ui/core'

import { getLocalUser, getLocalFriends, getUserLikes } from './services/userService'

import './index.css'
import Navbar from './components/Navbar'

import Home from './containers/Home'
import MemeSearch from './containers/MemeSearch'
import Login from './containers/Login'
import Register from './containers/Register'
import ResetPassword from './containers/ResetPassword'
import Chats from './containers/Chats'
import Stories from './containers/Stories'
import Notifications from './containers/Notifications'
import Friends from './containers/Friends'
import NotFound from './containers/NotFound'

const RedirectComponent = (Component, redirect) => redirect ? <Redirect to='login' /> : Component

export default function App() {
  const [user, setUser] = useState({ loading: true })
  const [friends, setFriends] = useState()
  const [likes, setLikes] = useState()

  const updateUser = async () => { setUser(await getLocalUser() || user) }
  const updateFriends = async () => { setFriends(await getLocalFriends(user.user_id) || friends) }
  const updateLikes = async () => { setLikes(await getUserLikes(user.user_id) || likes) }

  useEffect(() => { updateUser() }, [])
  useEffect(() => {
    if (user.loading === undefined) {
      updateFriends()
      updateLikes()
    }
  }, [user])

  return (
    <BrowserRouter>
      <Navbar user={user} />
      <div className='body'>
        <Paper className='paper' elevation={5}>
          {user.loading === undefined && friends && <MemeSearch user={user} friends={friends} />}
          <br /><br />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/reset_password' component={ResetPassword} />
            <Route exact path='/chats'>
              {RedirectComponent(user.loading === undefined && <Chats user={user} likes={likes} updateLikes={setLikes} />, user.loading === false)}
            </Route>
            <Route exact path='/stories' >
              {RedirectComponent(user.loading === undefined && <Stories user={user} />, user.loading === false)}
            </Route>
            <Route exact path='/notifications' >
              {RedirectComponent(user.loading === undefined && <Notifications user={user} />, user.loading === false)}
            </Route>
            <Route exact path='/friends' >
              {RedirectComponent(user.loading === undefined && friends && <Friends user={user} friends={friends} updateFriends={setFriends} />, user.loading === false)}
            </Route>
            <Route path='*' component={NotFound} />
          </Switch>
        </Paper>
      </div>
    </BrowserRouter>
  )
}
