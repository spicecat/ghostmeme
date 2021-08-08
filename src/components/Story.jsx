import { useState, useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'

import { deleteFromArray } from '../var.js'

import Chat from '../components/Chat'
import Form from '../components/Form'

import { createMeme, getStoryMemes, getComments } from '../services/memeService'
import { memeSchema } from '../services/schemas'

export default function Stories({ user: { user_id, username }, likes, updateLikes }) {
    const [timer, setTimer] = useState()

    const [memes, setMemes] = useState()
    const [comments, setComments] = useState()

    const updateMemes = () => {
        clearTimeout(timer)
        const getMemes = async () => { setMemes(await getStoryMemes(user_id) || memes) }
        getMemes()
        setTimer(setInterval(getMemes, 7500))
    }

    const updateComments = async () => { if (memes) setComments(await getComments(memes.map(({ meme_id }) => meme_id)) || comments) }

    const handleUpdateLikes = (meme_id, update = true) => {
        if (update) {
            if (likes.includes(meme_id)) deleteFromArray(likes, meme_id)
            else likes.push(meme_id)
            updateLikes(likes)
        }
        else return likes.includes(meme_id)
    }

    const handleCreateMeme = async values => {
        if (await createMeme(user_id, null, values)) await updateMemes()
    }

    useEffect(() => updateMemes(), [user_id])
    useEffect(() => updateComments(), [memes])

    return <>
        <Typography className='chat-header' variant='h4'>{username}'s Story!</Typography>
        <Grid container>
            {memes && memes.map(meme => <>
                <Chat meme={meme} username={username} updateMemes={updateMemes} updateLikes={handleUpdateLikes} local_id={user_id} isLocal={meme.owner === user_id} type='story' />
                {comments && comments[meme.meme_id] && comments[meme.meme_id].map(comment =>
                    <Chat meme={comment} username={comment.username} updateMemes={updateMemes} updateLikes={handleUpdateLikes} local_id={user_id} isLocal={comment.owner === user_id} type='other' />
                )}
            </>)}
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