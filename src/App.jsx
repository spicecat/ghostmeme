import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Paper } from '@material-ui/core'
import { omit } from 'lodash'

import { basename, deleteFromArray } from './var.js'

import './index.css'
import { Navbar } from './components'

import { Home, MemeSearch, Login, Register, ForgotPassword, ResetPassword, Chats, Stories, Spotlight, Notifications, Friends, NotFound, UserProfile } from './containers'

import { getLocalUser, getFriends, getFriendRequests, getUserLikes } from './services/userService'
import { getVisibleMemes } from './services/memeService'

function RedirectComponent({ Component, redirect }) {
  return redirect ? <Navigate to='/login' /> : <Component />
}

export default function App() {
  const [user, setUser] = useState({ loading: true })
  const [friends, setFriends] = useState()
  const [outgoingFriendRequests, setOutgoingFriendRequests] = useState()
  const [incomingFriendRequests, setIncomingFriendRequests] = useState()
  const [likes, setLikes] = useState()

  const updateUser = async () => { setUser(await getLocalUser() || user) }
  useEffect(() => { updateUser() }, [])

  const loadFriends = async () => {
    setFriends(await getFriends(user.user_id) || friends)
    setOutgoingFriendRequests(await getFriendRequests(user.user_id, 'outgoing') || outgoingFriendRequests)
    setIncomingFriendRequests(await getFriendRequests(user.user_id, 'incoming') || incomingFriendRequests)
  }

  const loadLikes = async () => { setLikes(await getUserLikes(user.user_id) || likes) }
  const updateLikes = (meme_id, update) => {
    if (update) {
      if (likes.includes(meme_id)) deleteFromArray(likes, meme_id)
      else likes.push(meme_id)
      setLikes(likes)
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
  const [receivedChatsMemes, setReceivedChatsMemes] = useState()
  const [sentChatsMemes, setSentChatsMemes] = useState()
  const [friendsMemes, setFriendsMemes] = useState()
  const [storyMemes, setStoryMemes] = useState()
  const [mentions, setMentions] = useState()

  const loadMemes = () => {
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
    // setTimer(setInterval(getMemes, 10000))
  }
  useEffect(loadMemes, [friends])
  return <BrowserRouter basename={basename}>
    <Navbar {...{ user, mentions }} />
    <div className='body'>
      <Paper className='paper' elevation={5}>
        {user.loading === undefined && receivedChatsMemes && friendsMemes && <MemeSearch {...{ receivedChatsMemes, friendsMemes }} />}
        <br /><br />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/forgot_password' element={<ForgotPassword />} />
          <Route exact path='/reset/:emailHash/:email' element={<ResetPassword />} />
          <Route exact path='/spotlight' element={<Spotlight {...{ user, updateMemes: loadMemes, likes, updateLikes }} />} />
          <Route exact path='/myprofile' element={<RedirectComponent Component={user.loading === undefined && <UserProfile {...{ user }} />} redirect={user.loading === false ? "1" : ""} />} />
          <Route exact path='/chats' element={<RedirectComponent Component={user.loading === undefined && receivedChatsMemes && sentChatsMemes && likes && <Chats {...{ user, receivedChatsMemes, sentChatsMemes, updateMemes: loadMemes, updateLikes }} />} redirect={user.loading === false ? "1" : ""} />} />
          <Route exact path='/stories' element={<RedirectComponent Component={user.loading === undefined && friends && storyMemes && likes && <Stories {...{ user, friends, storyMemes, updateMemes: loadMemes, likes, updateLikes }} />} redirect={user.loading === false ? "1" : ""} />} />
          <Route exact path='/notifications' element={<RedirectComponent Component={user.loading === undefined && incomingFriendRequests && mentions && <Notifications {...{ user, incomingFriendRequests, mentions }} />} redirect={user.loading === false ? "1" : ""} />} />
          <Route exact path='/friends' element={<RedirectComponent Component={user.loading === undefined && friends && outgoingFriendRequests && incomingFriendRequests && <Friends {...{ user, friends, outgoingFriendRequests, incomingFriendRequests, setFriends, setOutgoingFriendRequests, setIncomingFriendRequests }} />} redirect={user.loading === false ? "1" : ""} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Paper>
    </div>
  </BrowserRouter>
}