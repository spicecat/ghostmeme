import { Fragment } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { orderBy } from 'lodash'

import { Chat, Form } from '../components'

import { createMeme } from '../services/memeService'
import { memeSchema } from '../services/schemas'

export default function Stories({ user: { user_id, username }, memes, updateMemes, updateLikes, local_id }) {

    const handleCreateMeme = async values => {
        if (await createMeme(user_id, null, values)) await updateMemes()
    }

    return <>
        <Typography className='chat-header' variant='h4'>{username}'s Story!</Typography>
        <Grid container>
            {memes && orderBy(memes, 'createdAt', 'desc').map(meme => <Fragment key={meme.meme_id} >
                <Chat {...{ meme, username, updateMemes, updateLikes, local_id, isLocal: meme.owner === local_id, type: 'story' }} />
                {meme.comments && meme.comments.map(comment =>
                    <Chat {...{ meme: comment, username: comment.username, updateMemes, updateLikes, local_id, isLocal: comment.owner === local_id, type: 'comment' }} />
                )}
            </Fragment >)}
        </Grid>
        <hr />
        <div className='chat-footer'>
            <Form
                name='Post Story'
                action={handleCreateMeme}
                schema={memeSchema}
                inline={2}
            />
        </div>
    </>
}