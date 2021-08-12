import { Fragment } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { orderBy } from 'lodash'

import Chat from './Chat'
import Form from './Form'

import { createMeme } from '../services/memeService'
import { memeSchema } from '../services/schemas'

export default function SpotlightComponent({ user: { user_id, username }, memes, updateMemes, updateLikes, local_id }) {

    const handleCreateMeme = async values => {
        if (await createMeme(user_id, null, values)) await updateMemes()
    }

    return <>
        <Typography className='chat-header' variant='h4'>Spotlight</Typography>
        <Grid container>
            {memes && orderBy(memes, 'createdAt', 'desc').map(meme => <Fragment key={meme.meme_id} >
                <Chat {...{ meme, username, updateMemes, updateLikes, local_id, isLocal: meme.owner === local_id, type: 'spotlight' }} />
            </Fragment >)}
        </Grid>
        <hr />
        <div className='chat-footer'>
            <Form
                name='Post Public Meme'
                action={handleCreateMeme}
                schema={memeSchema}
                inline={2}
            />
        </div>
    </>
}