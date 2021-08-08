import { useState, useEffect } from 'react'
import { Grid, IconButton, Tooltip } from '@material-ui/core'
import CommentIcon from '@material-ui/icons/Comment'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'

import Form from '../components/Form'

import { likeMeme, vanishMeme, isExpired } from '../services/memeService'
import { memeSchema } from '../services/schemas'

export default function Chat({ meme: { meme_id, createdAt, expiredAt, description, likes, imageUrl, }, username, update, local_id, isLocal = !local_id, type = 'local' }) {
    const [liked, setLiked] = useState()
    const [selected, setSelected] = useState(false)

    const updateSelected = async () => {
        setSelected(!selected)
        // update(meme_id)
    }

    const getLikedStatus = () => { if (!isLocal) setLiked(update(meme_id, false)) }
    const updateLikeMeme = async () => {
        if (isLocal) return
        setLiked(!liked)
        const response = await likeMeme(meme_id, local_id)
        if (response) update(meme_id)
        else setLiked(liked)
    }

    const updateVanishMeme = async () => { if (await vanishMeme(meme_id)) update() }

    useEffect(() => { getLikedStatus() }, [])

    return <Grid container spacing={1}>
        <Grid container item>
            {type !== 'other' && <Grid item xs={6} />}
            <Grid item xs={1}>
                {!isExpired(expiredAt) && <>
                    {isLocal ? <Tooltip title='Vanish Meme' placement='right'>
                        <IconButton onClick={updateVanishMeme}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip> : <Tooltip title={`${liked ? 'Like' : 'Unlike'} Meme`} placement='right'>
                        <IconButton onClick={updateLikeMeme}>
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
                            <b>{username}</b>
                            &nbsp;-&nbsp;{createdAt.toLocaleString()}
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
            </Grid>
        </Grid>
        <Grid item xs={1} />
        {selected && <Grid item xs>
            <Form
                name='Post Comment'
                action={() => 1}
                schema={memeSchema}
                inline={2}
            />
        </Grid>}
    </Grid >
}