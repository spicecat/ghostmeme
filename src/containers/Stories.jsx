import { useState, useEffect } from 'react'
import { Paper } from '@material-ui/core'
import { useTrackedState } from 'reactive-react-redux'

import Story from '../components/Story'
import Search from '../components/Search'

export default function Stories({ user, friends, storyMemes, updateMemes, updateLikes }) {
  const state = useTrackedState()
  const [memes, setMemes] = useState([])

  const [users, setUsers] = useState()
  const [selectedUser, setSelectedUser] = useState(user.user_id)
  const [selectedUserInfo, setSelectedUserInfo] = useState(user)

  const getStory = () => {
    console.log('Updating Story')
    setMemes(storyMemes[selectedUser] || [])
  }

  useEffect(getStory, [selectedUserInfo, storyMemes])

  return <Paper className='paper' elevation={3}>
    <Story {...{ user: selectedUserInfo, memes, updateMemes, updateLikes, local_id: user.user_id }} />
  </Paper>
}