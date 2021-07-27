import { useState, useEffect } from 'react'
import { IconButton } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import { getFriendsStoriesMemes } from '../services/memeService'

import MemesTable from './MemesTable'

export default function Search({ user }) {
    useEffect(() => { updateMemes() }, [])

    const [open, setOpen] = useState(true)
    const [memes, setMemes] = useState([])

    const updateMemes = async () => { setMemes(await getFriendsStoriesMemes(user)) }

    return !user.loading &&
        <>
            <IconButton onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            Memes from friends
            {open && <MemesTable categories={['Owner', 'CreatedAt', 'Description', 'Image', 'Likes']} memes={memes} />}
        </>
}