import { useState, useEffect } from 'react'
import { IconButton } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import { searchChatsMemes, searchFriendsMemes } from '../services/memeService'
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
        setFriendsMemes(await searchFriendsMemes(user))
    }

    return !user.loading &&
        <>
            <IconButton onClick={() => setOpenChats(!openChats)}>
                {openChats ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            Memes from Chats
            {openChats &&
                <>
                    <Form name='chats' action={async values => {
                        console.log(values)
                        setChatsMemes(await searchChatsMemes(user, values))
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
                    <Form name='friends' action={async values => {
                        console.log(values)
                        setFriendsMemes(await searchFriendsMemes(user, values))
                    }} schema={memeSearchSchema} search={true} />
                    <br />
                    <MemesTable memes={friendsMemes} />
                </>}
        </>
}