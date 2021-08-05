import { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Paper } from '@material-ui/core'

import { getLocalUser } from './services/userService'

import './index.css'
import Navbar from './components/Navbar'

import Home from './containers/Home'
import Search from './containers/Search'
import Login from './containers/Login'
import Register from './containers/Register'
import ResetPassword from './containers/ResetPassword'
import Chats from './containers/Chats'
import Stories from './containers/Stories'
import Notifications from './containers/Notifications'
import Friends from './containers/Friends'
import NotFound from './containers/NotFound'

export default function App() {
  const [user, setUser] = useState({ loading: true })

  const updateUser = async newUser => { setUser(newUser || await getLocalUser() || user) }

  useEffect(() => { updateUser() }, [])
  return (
    <BrowserRouter>
      <Navbar user={user} />
      <div className='body'>
        <Paper className='paper' elevation={5} fullWidth>
          {user.loading === undefined && <Search user={user} />}
          <br /><br />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/reset_password' component={ResetPassword} />
            <Route exact path='/chats'><Chats user={user} /></Route>
            <Route exact path='/stories' ><Stories user={user} /></Route>
            <Route exact path='/notifications' >< Notifications user={user} /></Route>
            <Route exact path='/friends' ><Friends user={user} updateUser={updateUser} /></Route>
            <Route path='*' component={NotFound} />
          </Switch>
        </Paper>
      </div>
    </BrowserRouter>
  )
}
