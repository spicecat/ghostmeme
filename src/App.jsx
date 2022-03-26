import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { omit } from 'lodash'

import { basename, deleteFromArray } from './var.js'

import './index.css'

import { Chats, ForgotPassword, Friends, Home, Layout, Login, UserProfile, NotFound, Notifications, Register, ResetPassword, Spotlight, Stories } from './containers'

import { getLocalUser, getFriends, getFriendRequests, getUserLikes } from './services/userService'
import { getVisibleMemes } from './services/memeService'

function RedirectComponent({ Component, redirect }) {
  return redirect ? <Navigate to='/login' /> : Component
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

  const [timer] = useState()
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
      const visibleMemes = await getVisibleMemes(user, friends)
      setReceivedChatsMemes(visibleMemes.receivedChatsMemes)
      setSentChatsMemes(visibleMemes.sentChatsMemes)
      setFriendsMemes(omit(visibleMemes.storyMemes, user.user_id))
      setStoryMemes(visibleMemes.storyMemes)
      setMentions(visibleMemes.mentions)
    }
    getMemes()
    // setTimer(setInterval(getMemes, 10000))
  }
  useEffect(loadMemes, [friends])
  return <BrowserRouter basename={basename}>
    <Routes>
      <Route path='/' element={<Layout {...{ user, mentions, receivedChatsMemes, friendsMemes }} />}>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot_password' element={<ForgotPassword />} />
        <Route path='/reset/:emailHash/:email' element={<ResetPassword />} />
        <Route path='/spotlight' element={<Spotlight {...{ user, updateMemes: loadMemes, likes, updateLikes }} />} />
        <Route path='/chats' element={<RedirectComponent Component={user.loading === undefined && likes && <Chats {...{ user, receivedChatsMemes, sentChatsMemes, updateMemes: loadMemes, updateLikes }} />} redirect={user.loading === false ? "1" : ""} />} />
        <Route path='/stories' element={<RedirectComponent Component={user.loading === undefined && <Stories {...{ user, friends, storyMemes, updateMemes: loadMemes, likes, updateLikes }} />} redirect={user.loading === false ? "1" : ""} />} />
        <Route path='/notifications' element={<RedirectComponent Component={user.loading === undefined && <Notifications {...{ user, incomingFriendRequests, mentions }} />} redirect={user.loading === false ? "1" : ""} />} />
        <Route path='/friends' element={<RedirectComponent Component={user.loading === undefined && <Friends {...{ user, friends, outgoingFriendRequests, incomingFriendRequests, setFriends, setOutgoingFriendRequests, setIncomingFriendRequests }} />} redirect={user.loading === false ? "1" : ""} />} />
        <Route path='/myprofile' element={<RedirectComponent Component={user.loading === undefined && <UserProfile {...{ user }} />} redirect={user.loading === false ? "1" : ""} />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
}