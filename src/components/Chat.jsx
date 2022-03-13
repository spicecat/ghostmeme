import { useState, useEffect } from 'react'
import { Grid, IconButton, Tooltip } from '@material-ui/core'
import CommentIcon from '@material-ui/icons/Comment'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'

import {Form} from '../components'

import { createMeme, likeMeme, unlikeMeme, vanishMeme, isExpired } from '../services/memeService'
import { memeSchema } from '../services/schemas'

export default function Chat({ meme: { meme_id, createdAt, expiredAt, description, likes, imageUrl, }, username, updateMemes, updateLikes, local_id, isLocal = !local_id, type = 'local' }) {
    const [liked, setLiked] = useState()
    const [selected, setSelected] = useState(false)

    const updateSelected = async () => { setSelected(!selected) }

    const getLikedStatus = () => { if (!isLocal) setLiked(updateLikes(meme_id)) }
    const handleUpdateLike = async () => {
        setLiked(!liked)
        if (liked ? await unlikeMeme(meme_id, local_id) : await likeMeme(meme_id, local_id)) updateLikes(meme_id, true)
        else setLiked(liked)
    }

    const updateVanishMeme = async () => { if (await vanishMeme(meme_id)) await updateMemes() }

    const handleCreateComment = async values => {
        if (await createMeme(local_id, null, values, meme_id)) await updateMemes()
    }

    // useEffect(() => { getLikedStatus() }, [])
    useEffect(() => {
        if (type !== 'spotlight') {
            getLikedStatus()
        }
    })

    return (
        <Grid container spacing={1}>
            {/* Add spaces after stories to separate stories and comments*/}
            {type == 'story' && <div><br /><br /></div>}

            <Grid container item>
                {type == 'local' && <Grid item xs={6} />}
                {(type == 'story' || type == 'comment' || type == 'spotlight') && <Grid item xs={3} />}
                <Grid item xs={1}>
                    {!isExpired(expiredAt) && <>
                        {isLocal && <Tooltip title='Vanish Meme' placement='right'>
                            <IconButton onClick={updateVanishMeme}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>}
                        {!isLocal && <Tooltip title={`${liked ? 'Unlike' : 'Like'} Meme`} placement='right'>
                            <IconButton onClick={handleUpdateLike}>
                                {liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                            </IconButton>
                        </Tooltip>}
                        {type === 'story' && <Tooltip title='Comment' placement='right'>
                            <IconButton onClick={updateSelected}>
                                <CommentIcon />
                            </IconButton>
                        </Tooltip>}
                    </>}
                </Grid>
                <Grid item xs={5}>
                    <div className={`chat ${type}Chat`}>
                        {isExpired(expiredAt) ? <i>Message vanished</i> :

                            <div>
                                {type == 'story' ?
                                    <div>
                                        <b>{username}</b>
                                        &nbsp;-&nbsp;{createdAt.toDateString()}
                                        &nbsp;-&nbsp;{likes} likes
                                        <br />
                                        <br /><img className='story-img' src={imageUrl} alt={imageUrl} />
                                        {imageUrl && <br />}
                                        {description}
                                        {expiredAt !== -1 && <>
                                            <br /><br />
                                            <i>{`Expires at ${expiredAt.toLocaleString()}`}</i>
                                        </>}
                                    </div>
                                    :
                                    <div>
                                        {type !== 'spotlight' && <><b>{username}</b>&nbsp;-&nbsp;</>}
                                        {createdAt.toLocaleString()}
                                        &nbsp;-&nbsp;{likes} likes
                                        <br />
                                        <img className='chat-img' src={imageUrl} alt={imageUrl} />
                                        {imageUrl && <br />}
                                        {description}
                                        {expiredAt !== -1 && <>
                                            <br /><br />
                                            <i>{`Expires at ${expiredAt.toLocaleString()}`}</i>
                                        </>}
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </Grid>
            </Grid>

            <Grid item xs={1} />
            {selected && <Grid item xs>
                <div className='chat-footer'>
                    <Form
                        name='Post Comment'
                        action={handleCreateComment}
                        schema={memeSchema}
                        inline={2}
                    />
                </div>
            </Grid>}
        </Grid>
    )
}