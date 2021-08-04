import { useState, useEffect } from 'react'
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Tooltip,
  Typography
} from '@material-ui/core'

import { redirect } from '../services/userService'
import { getStoryMemes } from '../services/memeService'

export default function Stories({ user }) {
  useEffect(() => { redirect(user) }, [user])

  const [memes, setMemes] = useState([])

  const updateMemes = async () => { setMemes(await getStoryMemes(user)) }

  useEffect(() => updateMemes(), [])

  return user.loading === undefined && <Paper className='paper' elevation={3}>
    <Typography className='chat-header' variant='h4'>{user.username}'s Story!</Typography>
    <Table>
      {memes.map(meme =>
        <TableRow>{meme.description}</TableRow>
      )}
    </Table>
  </Paper>
}