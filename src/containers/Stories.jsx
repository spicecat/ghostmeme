import { useState, useEffect } from 'react'
import { Table, TableCell, TableRow, Paper, Typography } from '@material-ui/core'

import Chat from '../components/Chat'
import Form from '../components/Form'

import { redirect } from '../services/userService'
import { getStoryMemes, createMeme } from '../services/memeService'
import { memeSchema } from '../services/schemas'

export default function Stories({ user }) {
  useEffect(() => { redirect(user) }, [user])

  const [memes, setMemes] = useState([])

  const updateMemes = async () => {
    setMemes(await getStoryMemes(user) || memes)
  }

  const handleCreateMeme = async values => {
    if (await createMeme(user, null, values)) await updateMemes()
  }

  useEffect(() => updateMemes(), [user])

  return user.loading === undefined && <Paper className='paper' elevation={3}>
    <Typography className='chat-header' variant='h4'>{user.username}'s Story!</Typography>
    <Table>
      {memes.map(meme =>
        <TableRow>
          <TableCell className='tableChat' width='40%'>
          </TableCell>
          <TableCell className='tableChat' width='20%' />
          <TableCell className='tableChat' width='40%'>
            <Chat meme={meme} username={user.username} update={updateMemes} />
          </TableCell>
        </TableRow>
      )}
    </Table>
    <hr />
    <div className='chat-footer'>
      <Form
        name='Post Meme'
        action={handleCreateMeme}
        schema={memeSchema}
        inline={2}
      />
    </div>
  </Paper>
}