import { useState, useEffect } from 'react'
import { IconButton } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import { searchChatsMemes, searchFriendsMemes } from '../services/memeService'
import { memeSearchSchema } from '../services/schemas'

import MemesTable from '../components/MemesTable'
import Form from '../components/Form'

export default function Search({ user }) {
    const [openChats, setOpenChats] = useState(true)
    const [openFriends, setOpenFriends] = useState(true)
    const [chatsMemes, setChatsMemes] = useState([])
    const [friendsMemes, setFriendsMemes] = useState([])

    const updateMemes = async () => {
        console.log('Updating memes...')
        setChatsMemes(await searchChatsMemes(user))
        setFriendsMemes(await searchFriendsMemes(user))
    }

    useEffect(() => {
        updateMemes()
        const timer = setInterval(updateMemes, 13711)
        return () => clearInterval(timer)
    }, [])

    return !user.loading &&
        <>
            <IconButton onClick={() => setOpenChats(!openChats)}>
                {openChats ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            Memes from Chats
            {openChats &&
                <>
                    <Form name='chats' action={async values => { setChatsMemes(await searchChatsMemes(user, values)) }} schema={memeSearchSchema} search={true} />
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
                    <Form name='friends' action={async values => { setFriendsMemes(await searchFriendsMemes(user, values)) }} schema={memeSearchSchema} search={true} />
                    <br />
                    <MemesTable memes={friendsMemes} />
                </>}
        </>
}