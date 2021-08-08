import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableRow, Typography } from '@material-ui/core'

import { deleteFromArray } from '../var.js'

import Chat from '../components/Chat'
import Form from '../components/Form'

import { createMeme, getStoryMemes, getStoryComments } from '../services/memeService'
import { commentSchema, storySchema } from '../services/schemas'

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

    const updateComments = async () => { if (memes) setComments(await getStoryComments(memes.map(({ meme_id }) => meme_id)) || comments) }

    const updateLiked = (meme_id, update = true) => {
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
        <Table>
            <TableBody>
                {memes && memes.map(meme => <>
                    <TableRow>
                        <TableCell width='60%' />
                        <TableCell width='40%'>
                            <Chat meme={meme} username={username} update={updateMemes} isLocal={meme.owner === user_id} />
                        </TableCell>
                    </TableRow>
                    {comments && comments[meme.meme_id].map(comment =>
                        <TableRow key={comment.meme_id}>
                            <TableCell width='40%'>
                                <Chat meme={comment} username={comment.username} update={updateLiked} local_id={user_id} isLocal={comment.owner === user_id} type='other' />
                            </TableCell>
                            <TableCell width='60%' />
                        </TableRow>
                    )}
                </>)}
            </TableBody>
        </Table>
    </>
}