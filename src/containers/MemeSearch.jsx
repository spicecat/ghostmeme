import { useState } from 'react'
import { IconButton } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import { searchChatsMemes, searchFriendsMemes } from '../services/memeService'
import { memeSearchSchema } from '../services/schemas'

import Meme from '../components/Meme'
import Search from '../components/Search'

export default function MemeSearch({ user: { user_id }, friends: { friends } }) {
    const [openChats, setOpenChats] = useState(true)
    const [openFriends, setOpenFriends] = useState(true)

    return <>
        <IconButton onClick={() => { setOpenChats(!openChats) }}>
            {openChats ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </IconButton>
        Memes from Chats
        <Search name='chats' action={query => searchChatsMemes(user_id, friends, query)} schema={memeSearchSchema} Component={Meme} refresh={true} show={openChats} />
        <br />

        <IconButton onClick={() => { setOpenFriends(!openFriends) }}>
            {openFriends ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </IconButton>
        Memes from Friends
        <Search name='friends' action={query => searchFriendsMemes(friends, query)} schema={memeSearchSchema} Component={Meme} refresh={true} show={openFriends} />
    </>
}