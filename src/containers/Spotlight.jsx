import { useState, useEffect } from 'react'
import { Button, Paper } from '@material-ui/core'

import SpotlightComponent from '../components/SpotlightComponent'
import Search from '../components/Search'
import { getMemes } from '../services/memeService'

export default function Spotlight({ user, friends, storyMemes, updateMemes, updateLikes }) {
  const [memes, setMemes] = useState([])

  const [users, setUsers] = useState()
  const [selectedUser, setSelectedUser] = useState(user.user_id)
  const [selectedUserInfo, setSelectedUserInfo] = useState(user)

  const getStory = async () => {
    console.log('Updating Spotlight')
    setMemes(await getMemes({
        "private": false,
        "receiver": null,
        "replyTo": null,
    }) || [])
    // setMemes(storyMemes[selectedUser] || [])
  }

  useEffect(getStory, [selectedUserInfo, storyMemes])

  return <Paper className='paper' elevation={3}>
    <SpotlightComponent {...{ user: selectedUserInfo, memes, updateMemes, updateLikes, local_id: user.user_id }} />
  </Paper>
}