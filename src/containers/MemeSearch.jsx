import { useState } from 'react'
import { IconButton } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import { searchMemes } from '../services/memeService'
import { memeSearchSchema } from '../services/schemas'

import Meme from '../components/Meme'
import Search from '../components/Search'

export default function MemeSearch({ receivedChatsMemes, friendsMemes }) {
    const [openChats, setOpenChats] = useState(true)
    const [openFriends, setOpenFriends] = useState(true)

    return <>
        <IconButton onClick={() => { setOpenChats(!openChats) }}>
            {openChats ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </IconButton>
        Memes from Chats
        {openChats && <Search name='chats' action={query => searchMemes(query, Object.values(receivedChatsMemes).flat())} schema={memeSearchSchema} Component={Meme} refresh={true} />}
        <br />

        <IconButton onClick={() => { setOpenFriends(!openFriends) }}>
            {openFriends ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </IconButton>
        Memes from Friends
        {openFriends && <Search name='friends' action={query => searchMemes(query, Object.values(friendsMemes).flat())} schema={memeSearchSchema} Component={Meme} refresh={true} />}
    </>
}