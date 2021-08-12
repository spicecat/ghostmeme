import { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { omit } from 'lodash'
import { useDispatch, useTrackedState } from 'reactive-react-redux'
import { Paper } from '@material-ui/core'

import { deleteFromArray } from './var.js'

import './index.css'
import Navbar from './components/Navbar'

import Home from './containers/Home'
import MemeSearch from './containers/MemeSearch'
import Login from './containers/Login'
import Register from './containers/Register'
import ForgotPassword from './containers/ForgotPassword'
import ResetPassword from './containers/ResetPassword'
import Chats from './containers/Chats'
import Stories from './containers/Stories'
import Notifications from './containers/Notifications'
import Friends from './containers/Friends'
import NotFound from './containers/NotFound'
import UserProfile from './containers/Myprofile.jsx'

import { getLocalUser, getFriends, getFriendRequests, getUserLikes } from './services/userService'
import { getVisibleMemes } from './services/memeService'

const RedirectComponent = (Component, redirect) => redirect ? <Redirect to='login' /> : Component
export default function App() {
  const state = useTrackedState()
  const dispatch = useDispatch()
  const { user, friends, outgoingFriendRequests, incomingFriendRequests, likes, blocked, blockedBy } = state

  const updateUser = async () => {
    dispatch({ type: 'set', target: 'user', value: await getLocalUser() || user })
  }
  useEffect(() => { updateUser() }, [])

  const loadFriends = async () => {
    dispatch({ type: 'set', target: 'friends', value: await getFriends(user.user_id) || friends })
    dispatch({ type: 'set', target: 'outgoingFriendRequest', value: await getFriendRequests(user.user_id, 'outgoing') || outgoingFriendRequests })
    dispatch({ type: 'set', target: 'incomingFriendRequests', value: await getFriendRequests(user.user_id, 'incoming') || incomingFriendRequests })
  }

  const loadLikes = async () => {
    dispatch({
      type: 'set', target: 'likes', value: await getUserLikes(user.user_id) || likes
    })
  }
  const updateLikes = (meme_id, update) => {
    if (update) {
      if (likes.includes(meme_id)) deleteFromArray(likes, meme_id)
      else likes.push(meme_id)
      dispatch({ type: 'set', target: 'likes', value: likes })
    }
    else return likes.includes(meme_id)
  }

  useEffect(() => {
    if (user.loading === undefined) {
      loadFriends()
      loadLikes()
    }
  }, [user])

  const [timer, setTimer] = useState()

  const loadMemes = () => {
    if (!friends) return
    clearTimeout(timer)
    const getMemes = async () => {
      console.log('Updating Memes')
      const { receivedChatsMemes, sentChatsMemes, storyMemes, mentions } = await getVisibleMemes(user, friends)
      dispatch({
        type: 'set', target: 'receivedChatsMemes', value: receivedChatsMemes
      })
      dispatch({ type: 'set', target: 'sentChatsMemes', value: sentChatsMemes })
      dispatch({
        type: 'set', target: 'friendsMemes', value: omit(storyMemes, user.user_id)
      })
      dispatch({ type: 'set', target: 'storyMemes', value: storyMemes })
      dispatch({
        type: 'set', target: 'mentions', value: mentions
      })
    }
    getMemes()
    // setTimer(setInterval(getMemes, 10000))
  }
  useEffect(loadMemes, [friends])

  return <BrowserRouter>
    <Navbar />
    <div className='body'>
      <Paper className='paper' elevation={5}>
        {user.loading === undefined && <MemeSearch />}
        <br /><br />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/forgot_password' component={ForgotPassword} />
          <Route exact path='/reset/:emailHash/:email' component={ResetPassword} />
          <Route exact path='/myprofile' >
            {RedirectComponent(user.loading === undefined && <UserProfile {...{ user: user }} />, user.loading === false)}
          </Route>
          <Route exact path='/chats'>
            {RedirectComponent(user.loading === undefined && <Chats {...{ updateMemes: loadMemes, updateLikes }} />, user.loading === false)}
          </Route>
          <Route exact path='/stories' >
            {RedirectComponent(user.loading === undefined && <Stories {...{ updateMemes: loadMemes, updateLikes }} />, user.loading === false)}
          </Route>
          <Route exact path='/notifications' >
            {RedirectComponent(user.loading === undefined && <Notifications {...{}} />, user.loading === false)}
          </Route>
          <Route exact path='/friends' >
            {RedirectComponent(user.loading === undefined && <Friends {...{}} />, user.loading === false)}
          </Route>
          <Route path='*' component={NotFound} />
        </Switch>
      </Paper>
    </div>
  </BrowserRouter>
}
