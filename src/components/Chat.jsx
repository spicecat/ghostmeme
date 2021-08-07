import { useState, useEffect } from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'

import { likeMeme, vanishMeme, isExpired } from '../services/memeService'


export default function Chat({ meme: { meme_id, createdAt, expiredAt, description, likes, imageUrl, }, username, update, local_id, isLocal = !local_id }) {
    const [liked, setLiked] = useState()

    const updateLikeMeme = async () => {
        if (liked === undefined) {
            setLiked(update(meme_id, false))
            return
        }
        setLiked(!liked)
        const response = await likeMeme(meme_id, local_id)
        if (response) update(meme_id)
        else setLiked(liked)
    }
    const updateVanishMeme = async () => { if (await vanishMeme(meme_id)) update() }

    useEffect(() => { if (!isLocal) updateLikeMeme() }, [])
    return <>
        {!isExpired(expiredAt) &&
            (isLocal ? <Tooltip title='Vanish Meme' placement='right'>
                <IconButton onClick={updateVanishMeme}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip> : <Tooltip title={`${liked ? 'Like' : 'Unlike'} Meme`} placement='right'>
                <IconButton onClick={updateLikeMeme}>
                    {liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                </IconButton>
            </Tooltip>
            )}
        <div className={`chat ${isLocal ? 'local' : 'other'}Chat`}>
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
    </>
}