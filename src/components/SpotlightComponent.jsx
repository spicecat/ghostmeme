import { Fragment } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { orderBy } from 'lodash'

import Chat from './Chat'
import Form from './Form'

import { createSpotlight, createMeme } from '../services/memeService'
import { memeSchema } from '../services/schemas'

// export default function SpotlightComponent({ user: { user_id }, memes, updateMemes, updateLikes}) {
export default function SpotlightComponent({ user: {user_id}, memes, updateMemes, updateLikes }) {
    // console.log(`USER ${user_id} ${username}`)

    const handleCreateMeme = async values => {
        if (await createSpotlight(user_id, null, values)) await updateMemes()
    }

    return <>
        <Typography className='chat-header' variant='h4'>Spotlight</Typography>
        <Grid container>
            {memes && orderBy(memes, 'createdAt', 'desc').map(meme => <Fragment key={meme.meme_id} >
                <Chat {...{ meme, updateMemes, updateLikes, isLocal: '', type: 'spotlight' }} />
            </Fragment >)}
        </Grid>
        {user_id &&
            <>
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
    </>
}