import { useState, useEffect } from 'react'
import { Table, TableCell, TableRow, Paper, Typography } from '@material-ui/core'

import Story from '../components/Story'
import Form from '../components/Form'

import { createMeme } from '../services/memeService'
import { commentSchema, storySchema } from '../services/schemas'

export default function Stories({ user }) {

  return <Paper className='paper' elevation={3}>
    <Story user={user} />
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
  </Paper>
}