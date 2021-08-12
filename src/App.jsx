import { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Paper } from '@material-ui/core'
import { omit } from 'lodash'

import { deleteFromArray } from './var.js'

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

import { getLocalUser, getFriends, getFriendRequests, getUserLikes } from './services/userService'
import { getVisibleMemes } from './services/memeService'

const RedirectComponent = (Component, redirect) => redirect ? <Redirect to='login' /> : Component

export default function App() {
  const [user, setUser] = useState({ loading: true })
  const [friends, setFriends] = useState()
  const [outgoingFriendRequests, setOutgoingFriendRequests] = useState()
  const [incomingFriendRequests, setIncomingFriendRequests] = useState()
  const [likes, setLikes] = useState()

  const updateUser = async () => { setUser(await getLocalUser() || user) }
  useEffect(() => { updateUser() }, [])

  const updateFriends = async () => {
    setFriends(await getFriends(user.user_id) || friends)
    setOutgoingFriendRequests(await getFriendRequests(user.user_id, 'outgoing') || outgoingFriendRequests)
    setIncomingFriendRequests(await getFriendRequests(user.user_id, 'incoming') || incomingFriendRequests)
  }
  const getLikes = async () => { setLikes(await getUserLikes(user.user_id) || likes) }
  const updateLikes = (meme_id, update) => {
    if (update) {
      if (likes.includes(meme_id)) deleteFromArray(likes, meme_id)
      else likes.push(meme_id)
      setLikes(likes)
    }
    else return likes.includes(meme_id)
  }

  useEffect(() => { updateUser() }, [])
  useEffect(() => {
    if (user.loading === undefined) {
      updateFriends()
      getLikes()
    }
  }, [user])

  const [timer, setTimer] = useState()
  const [receivedChatsMemes, setReceivedChatsMemes] = useState()
  const [sentChatsMemes, setSentChatsMemes] = useState()
  const [friendsMemes, setFriendsMemes] = useState()
  const [storyMemes, setStoryMemes] = useState()
  const [mentions, setMentions] = useState()

  const updateMemes = () => {
    if (!friends) return
    clearTimeout(timer)
    const getMemes = async () => {
      console.log('Updating Memes')
      const { receivedChatsMemes, sentChatsMemes, storyMemes, mentions } = await getVisibleMemes(user, friends)
      setReceivedChatsMemes(receivedChatsMemes)
      setSentChatsMemes(sentChatsMemes)
      setFriendsMemes(omit(storyMemes, user.user_id))
      setStoryMemes(storyMemes)
      setMentions(mentions)
    }
    getMemes()
    setTimer(setInterval(getMemes, 9500))
  }
  useEffect(updateMemes, [friends])

  return (
    <BrowserRouter>
      <Navbar {...{ user, mentions }} />
      <div className='body'>
        <Paper className='paper' elevation={5}>
          {user.loading === undefined && receivedChatsMemes && friendsMemes && <MemeSearch {...{ receivedChatsMemes, friendsMemes }} />}
          <br /><br />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/reset_password' component={ResetPassword} />
            <Route exact path='/chats'>
              {RedirectComponent(user.loading === undefined && receivedChatsMemes && sentChatsMemes && likes && <Chats {...{ user, receivedChatsMemes, sentChatsMemes, updateMemes, updateLikes }} />, user.loading === false)}
            </Route>
            <Route exact path='/stories' >
              {RedirectComponent(user.loading === undefined && storyMemes && likes && <Stories {...{ user, storyMemes, updateMemes, likes, updateLikes }} />, user.loading === false)}
            </Route>
            <Route exact path='/notifications' >
              {RedirectComponent(user.loading === undefined && incomingFriendRequests && mentions && <Notifications {...{ user, incomingFriendRequests, mentions }} />, user.loading === false)}
            </Route>
            <Route exact path='/friends' >
              {RedirectComponent(user.loading === undefined && friends && outgoingFriendRequests && incomingFriendRequests && <Friends {...{ user, friends, outgoingFriendRequests, incomingFriendRequests, setFriends, setOutgoingFriendRequests, setIncomingFriendRequests }} />, user.loading === false)}
            </Route>
            <Route path='*' component={NotFound} />
          </Switch>
        </Paper>
      </div>
    </BrowserRouter>
  )
}
