import { useState, useEffect } from 'react'
import { useTrackedState } from 'reactive-react-redux'
import { IconButton } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import { searchMemes } from '../services/memeService'
import { memeSearchSchema } from '../services/schemas'

import Meme from '../components/Meme'
import Search from '../components/Search'

export default function MemeSearch() {
    const state = useTrackedState()

    const [chatsMemes, setChatsMemes] = useState([])
    const [friendsMemes, setFriendsMemes] = useState([])

    const updateMemes = () => {
        setChatsMemes(Object.values(state.receivedChatsMemes).flat())
        setFriendsMemes(Object.values(state.friendsMemes).flat())
    }
    useEffect(updateMemes, [state.receivedChatsMemes, state.friendsMemes])

    const [openChats, setOpenChats] = useState(false)
    const [openFriends, setOpenFriends] = useState(false)

    return <>
        <IconButton onClick={() => { setOpenChats(!openChats) }}>
            {openChats ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </IconButton>
        Memes from Chats
        {openChats && <Search name='chats' action={query => searchMemes(query, chatsMemes)} schema={memeSearchSchema} Component={Meme} refresh={true} />}
        <br />

        <IconButton onClick={() => { setOpenFriends(!openFriends) }}>
            {openFriends ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </IconButton>
        Memes from Friends
        {openFriends && <Search name='friends' action={query => searchMemes(query, friendsMemes)} schema={memeSearchSchema} Component={Meme} refresh={true} />}
    </>
}