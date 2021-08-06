import { useState } from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'

import { likeMeme, vanishMeme, isExpired } from '../services/memeService'


export default function Chat({ meme: { meme_id, createdAt, expiredAt, description, likes, imageUrl, }, isLocal = true, username, update, user_id }) {
    const [liked, setLiked] = useState(false)


    const handleLikeMeme = async () => {
        setLiked(!liked)
        await likeMeme(meme_id, user_id)
    }
    const handleVanishMeme = async () => { if (await vanishMeme(meme_id)) update() }

    return <>
        {!isExpired({ expiredAt }) && (isLocal ? <Tooltip title='Vanish Meme' placement='right'>
            <IconButton onClick={handleVanishMeme}>
                <DeleteIcon />
            </IconButton>
        </Tooltip> : <Tooltip title={`${liked ? 'Like' : 'Unlike'} Meme`} placement='right'>
            <IconButton onClick={handleLikeMeme}>
                {liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
            </IconButton>
        </Tooltip>
        )}
        <div className={`chat ${isLocal ? 'local' : 'other'}Chat`}>
            {isExpired({ expiredAt }) ? <i>Message vanished</i> :
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
                        <i>{`Expires at ${expiredAt.toLocaleString()} ${expiredAt}`}</i>
                    </>}
                </div>
            }
        </div>
    </>
}