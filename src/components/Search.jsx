import { useState, useEffect } from 'react'
import { IconButton, TextField } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import { searchChatsMemes, searchFriendsStoriesMemes } from '../services/memeService'
import { memeSearchSchema } from '../services/schemas'

import MemesTable from './MemesTable'
import Form from './Form'

export default function Search({ user }) {
    useEffect(() => { updateMemes() }, [])

    const [openChats, setOpenChats] = useState(true)
    const [openFriends, setOpenFriends] = useState(true)
    const [chatsMemes, setChatsMemes] = useState([])
    const [friendsMemes, setFriendsMemes] = useState([])

    const updateMemes = async () => {
        setChatsMemes(await searchChatsMemes(user))
        setFriendsMemes(await searchFriendsStoriesMemes(user))
    }

    return !user.loading &&
        <>
            <IconButton onClick={() => setOpenChats(!openChats)}>
                {openChats ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            Memes from Chats
            {openChats &&
                <>
                    <Form action={async values => {
                        console.log(values)

                    }} schema={memeSearchSchema} search={true} />
                    <br />
                    <MemesTable memes={chatsMemes} />
                </>}
            <br />

            <IconButton onClick={() => setOpenFriends(!openFriends)}>
                {openFriends ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            Memes from Friends
            {openFriends &&
                <>
                    <Form action={async values => {
                        console.log(values)

                    }} schema={memeSearchSchema} search={true} />
                    <br />
                    <MemesTable memes={friendsMemes} />
                </>}
        </>
}