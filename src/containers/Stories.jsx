import { useState, useEffect } from 'react'
<<<<<<< HEAD
import { Paper } from '@material-ui/core'

import Story from '../components/Story'
import Search from '../components/Search'
=======
import { Table, TableCell, TableRow, Paper, Typography } from '@material-ui/core'

import Story from '../components/Story'
import Form from '../components/Form'

import { createMeme } from '../services/memeService'
import { commentSchema, storySchema } from '../services/schemas'
>>>>>>> parent of 483f3ff (readded story post form)

export default function Stories({ user, friends, storyMemes, updateMemes, updateLikes }) {
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
<<<<<<< HEAD
    <Story {...{ user: selectedUserInfo, memes, updateMemes, updateLikes, local_id: user.user_id }} />
=======
    <Story user={user} likes={likes} updateLikes={updateLikes} />
    <hr />
    {/* <div className='chat-footer'>
      <Form
        name='Post Story'
        action={handleCreateMeme}
        schema={storySchema}
        inline={3}
      />
    </div>
    <div className='chat-footer'>
      <Form
        name='Post Comment'
        action={handleCreateMeme}
        schema={commentSchema}
        inline={3}
      />
    </div> */}
>>>>>>> parent of 483f3ff (readded story post form)
  </Paper>
}