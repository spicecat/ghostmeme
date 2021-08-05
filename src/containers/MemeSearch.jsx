import { useState, useEffect } from 'react'
import { IconButton } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import { searchChatsMemes, searchFriendsMemes } from '../services/memeService'
import { memeSearchSchema } from '../services/schemas'

import PaginatedTable from '../components/PaginatedTable'
import Meme from '../components/Meme'
import Search from '../components/Search'
import Form from '../components/Form'

export default function MemeSearch({ user }) {
    const [timer, setTimer] = useState()

    const [openChats, setOpenChats] = useState(true)
    const [openFriends, setOpenFriends] = useState(true)
    const [chatsMemes, setChatsMemes] = useState([])
    const [friendsMemes, setFriendsMemes] = useState([])
    const [chatsSearch, setChatsSearch] = useState()
    const [friendsSearch, setFriendsSearch] = useState()

    const updateMemes = () => {
        clearTimeout(timer)
        const getMemes = async () => {
            console.log('Updating memes...')
            if (openChats) setChatsMemes(await searchChatsMemes(user, chatsSearch) || chatsMemes)
            if (openFriends) setFriendsMemes(await searchFriendsMemes(user, friendsSearch) || friendsMemes)
        }
        getMemes()
        setTimer(setInterval(getMemes, 7500))
    }

    useEffect(updateMemes, [openChats, openFriends, chatsSearch, friendsSearch])

    return (
        <>
            <IconButton onClick={() => { setOpenChats(!openChats) }}>
                {openChats ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
            </IconButton>
            Memes from Chats
            {openChats &&
                <>
                    <Form name='chats' action={setChatsSearch} schema={memeSearchSchema} search={true} />
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
                    {/* <Search name='friends' action={search => console.log(user, search)} schema={memeSearchSchema} Component={Meme} refresh={true} /> */}
                    <Form name='friends' action={setFriendsSearch} schema={memeSearchSchema} search={true} />
                    <br />
                    <PaginatedTable name='friends' data={friendsMemes} Component={Meme} />
                </>}
        </>
    )
}