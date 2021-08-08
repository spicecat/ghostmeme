import { useState, useEffect } from 'react'
import { Paper, Typography } from '@material-ui/core'

import Story from '../components/Story'

export default function Stories({ user, likes, updateLikes }) {

  return <Paper className='paper' elevation={3}>
    <Story user={user} likes={likes} updateLikes={updateLikes} />
  </Paper>
}