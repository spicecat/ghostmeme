import { useState, useEffect } from 'react'
import { IconButton } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import { getChatsMemes, getFriendsStoriesMemes } from '../services/memeService'

import MemesTable from './MemesTable'

export default function Search({ user }) {
    useEffect(() => { updateMemes() }, [])

    const [openChats, setOpenChats] = useState(true)
    const [openFriends, setOpenFriends] = useState(true)
    const [chatsMemes, setChatsMemes] = useState([])
    const [friendsMemes, setFriendsMemes] = useState([])

    const updateMemes = async () => {
        setChatsMemes(await getChatsMemes(user))
        setFriendsMemes(await getFriendsStoriesMemes(user))
    }

    return !user.loading &&
        <>
            <IconButton onClick={() => setOpenChats(!openChats)}>
                {openChats ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            Memes from Chats
            {openChats && <MemesTable categories={['Owner', 'Created At', 'Description', 'Image', 'Likes']} memes={chatsMemes} />}
            <br />
            <IconButton onClick={() => setOpenFriends(!openFriends)}>
                {openFriends ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            Memes from Friends
            {openFriends && <MemesTable categories={['Owner', 'Created At', 'Description', 'Image', 'Likes']} memes={friendsMemes} />}
        </>
}