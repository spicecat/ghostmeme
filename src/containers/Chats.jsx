import { useState, useEffect } from 'react'
import { Button, Grid, Paper, Typography } from '@material-ui/core'
import { orderBy } from 'lodash'

import Search from '../components/Search'
import User from '../components/User'
import Form from '../components/Form'
import Chat from '../components/Chat'

import { getUsers, searchUsers, getUser } from '../services/userService'
import { createMeme } from '../services/memeService'
import { memeSchema, userSearchSchema } from '../services/schemas'

export default function Chats({ user: { user_id: local_id, username }, receivedChatsMemes, sentChatsMemes, updateMemes, updateLikes }) {
    const [memes, setMemes] = useState([])

    const [users, setUsers] = useState()
    const [selectedUser, setSelectedUser] = useState('')
    const [selectedUserInfo, setSelectedUserInfo] = useState()

    // Array containing other users to send chats to
    // const [multipleRecipients, setMultipleRecipients] = useState(['6106f1b050309265789191a2', '6105642eda3de966b77eed89'])
    const [multipleRecipients, setMultipleRecipients] = useState([])

    const loadUsers = async () => { setUsers(await getUsers()) }
    const updateUsers = async query => searchUsers(users, query)

    const updateSelectedUser = async (user_id, status, setStatus) => {
        if (status === 'Select User') {
            if (selectedUser === user_id) {
                setSelectedUser('')
                setSelectedUserInfo()
                setMemes([])
            }
            else {
                console.log('selected', user_id)
                setSelectedUser(user_id)
                setSelectedUserInfo(await getUser(user_id) || selectedUserInfo)
                await setMultipleRecipients([])
            }
        }

        else if (status === 'Add Recipient') {
            // If user already selected, unselect user
            if (multipleRecipients.includes(user_id)) {
                console.log(`Remove recipient ${user_id}`)
                const index = multipleRecipients.indexOf(user_id)
                multipleRecipients.splice(index, 1);
            }

            // If addRecipient user = selectedUser, do nothing
            else if (user_id === selectedUser) {
                console.log('User already selected')
            }

            // Otherwise, add user
            else {
                console.log(`Add recipient ${user_id}`)
                setMultipleRecipients(multipleRecipients => [...multipleRecipients, user_id])
            }
        }

        else setStatus('Select User')
    }

    const getConversation = () => {
        console.log('Updating Conversation')
        const receivedMemes = receivedChatsMemes[selectedUser] || []
        const sentMemes = sentChatsMemes[selectedUser] || []
        const memes = receivedMemes.concat(sentMemes)
        setMemes(orderBy(memes, 'createdAt', 'desc'))
    }

    const handleCreateMeme = async values => {
        // if (await createMeme(local_id, selectedUser, values)) await updateMemes()
        await createMeme(local_id, selectedUser, values)
        for (const user in multipleRecipients) {
            await createMeme(local_id, multipleRecipients[user], values)
        }
        await updateMemes()
        await setMultipleRecipients([])
    }

    useEffect(() => { loadUsers() }, [])
    useEffect(getConversation, [selectedUser, receivedChatsMemes, sentChatsMemes])

    return <>
        {selectedUserInfo &&
            <Paper className='paper' elevation={3}>
                <Typography className='chat-header' variant='h4'>{`Conversation with ${selectedUserInfo.username}`}</Typography>
                <Grid container spacing={1}>
                    {memes && memes.map(meme => meme.owner === local_id ?
                        <Chat key={meme.meme_id} {...{ meme, username, updateMemes }} /> :
                        <Chat key={meme.meme_id} meme={meme} username={selectedUserInfo.username} updateLikes={updateLikes} local_id={local_id} type='other' />
                    )}
                </Grid>
                <hr />
                {/* Current Recipients: {multipleRecipients} */}
                <div className='chat-footer'>
                    <Form
                        name='Post Meme'
                        action={handleCreateMeme}
                        schema={memeSchema}
                        inline={2}
                    />
                </div>
            </Paper>
        }
        <br /><br />
        {
            users && <Search
                name='users'
                headCells={[
                    { name: 'Profile Picture', prop: 'imageUrl' },
                    { name: 'Username', prop: 'username' },
                    { name: 'Email', prop: 'email' },
                    { name: 'Phone', prop: 'phone' },
                    { name: 'Friends', prop: 'friends' },
                    { name: 'Likes', prop: 'liked' }]}
                action={updateUsers}
                schema={userSearchSchema}
                Component={User}
                update={updateSelectedUser}
            />
        }
    </>
}