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
    const [openChats, setOpenChats] = useState(true)
    const [openFriends, setOpenFriends] = useState(true)
    const [chatsMemes, setChatsMemes] = useState([])
    const [friendsMemes, setFriendsMemes] = useState([])
    const [chatsSearch, setChatsSearch] = useState()
    const [friendsSearch, setFriendsSearch] = useState()

    const updateMemes = async () => {
        console.log('Updating memes...')
        setChatsMemes(await searchChatsMemes(user, chatsSearch))
        setFriendsMemes(await searchFriendsMemes(user, friendsSearch))
    }

    useEffect(() => { updateMemes() }, [chatsSearch, friendsSearch])

    useEffect(() => {
        updateMemes()
        const timer = setInterval(updateMemes, 17711)
        return () => clearInterval(timer)
    }, [])

    return (
        <>
            <IconButton onClick={() => { setOpenChats(!openChats) }}>
                {openChats ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
                {openFriends ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            Memes from Friends
            {openFriends &&
                <>
                    <Form name='friends' action={async values => { setFriendsMemes(await searchFriendsMemes(user, values)) }} schema={memeSearchSchema} search={true} />
                    <br />
                    <PaginatedTable name='friends' data={friendsMemes} Component={Meme} />
                </>}
        </>
    )
}