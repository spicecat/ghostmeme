import { useState, useEffect } from 'react'
import { IconButton } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import { searchChatsMemes, searchFriendsMemes } from '../services/memeService'
import { memeSearchSchema } from '../services/schemas'

import PaginatedTable from '../components/PaginatedTable'
import Meme from '../components/Meme'
import Form from '../components/Form'

export default function Search({ user }) {
    const [timer, setTimer] = useState(0)

    const [openChats, setOpenChats] = useState(true)
    const [openFriends, setOpenFriends] = useState(true)
    const [chatsMemes, setChatsMemes] = useState([])
    const [friendsMemes, setFriendsMemes] = useState([])
    const [chatsSearch, setChatsSearch] = useState()
    const [friendsSearch, setFriendsSearch] = useState()

    const updateMemes = async () => {
        console.log('Updating memes...')
        clearInterval(timer)
        if (openChats) setChatsMemes(await searchChatsMemes(user, chatsSearch))
        if (openFriends) setFriendsMemes(await searchFriendsMemes(user, friendsSearch))
    }

    useEffect(() => {
        setTimer(setInterval(updateMemes, 23711))
        return () => clearInterval(timer)
    }, [])

    useEffect(() => updateMemes(), [openChats, openFriends, chatsSearch, friendsSearch])

    return (
        <>
            <IconButton onClick={() => { setOpenChats(!openChats) }}>
                {openChats ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
            </IconButton>
            Memes from Chats
            {openChats &&
                <>
                    <Form name='chats' action={values => { setChatsSearch(values) }} schema={memeSearchSchema} search={true} />
                    <br />
                    <PaginatedTable name='chats' data={chatsMemes} Component={Meme} />
                </>}
            <br />

            <IconButton onClick={() => { setOpenFriends(!openFriends) }}>
                {openFriends ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
            </IconButton>
            Memes from Friends
            {openFriends &&
                <>
                    <Form name='friends' action={async values => { setFriendsSearch(values) }} schema={memeSearchSchema} search={true} />
                    <br />
                    <PaginatedTable name='friends' data={friendsMemes} Component={Meme} />
                </>}
        </>
    )
}