import { useState, useEffect } from 'react'
import { Table, TableRow, Paper, Typography } from '@material-ui/core'

import Chat from '../components/Chat'

import { redirect } from '../services/userService'
import { getStoryMemes } from '../services/memeService'

export default function Stories({ user }) {
  useEffect(() => { redirect(user) }, [user])

  const [memes, setMemes] = useState([])

  const updateMemes = async () => { setMemes(await getStoryMemes(user) || []) }

  useEffect(() => updateMemes(), [])

  return user.loading === undefined && <Paper className='paper' elevation={3}>
    <Typography className='chat-header' variant='h4'>{user.username}'s Story!</Typography>
    <Table>
      {memes.map(meme =>
        <TableRow>
          <Chat meme={meme} username={user.username} update={updateMemes} />
        </TableRow>
      )}
    </Table>
  </Paper>
}