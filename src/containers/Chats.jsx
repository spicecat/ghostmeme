import { useState, useEffect } from 'react'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography
} from '@material-ui/core'

import { deleteFromArray } from '../var.js'

import Search from '../components/Search'
import User from '../components/User'
import Form from '../components/Form'
import Chat from '../components/Chat'

import { getUsers, searchUsers, getUser } from '../services/userService'
import { getConversation, createMeme } from '../services/memeService'
import { memeSchema, userSearchSchema } from '../services/schemas'

export default function Chats({ user: { user_id, username }, likes, updateLikes }) {
    const [timer, setTimer] = useState()

    const local_id = user_id
    const [memes, setMemes] = useState([])
    const [users, setUsers] = useState()
    const [selectedUser, setSelectedUser] = useState('')
    const [selectedUserInfo, setSelectedUserInfo] = useState()

    const loadUsers = async () => { setUsers(await getUsers()) }
    const updateUsers = async query => searchUsers(users, query)

    const updateSelectUser = async (user_id, status, setStatus) => {
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
            }
        }
        else setStatus('Select User')
    }

    const updateLiked = (meme_id, update = true) => {
        if (update) {
            if (likes.includes(meme_id)) deleteFromArray(likes, meme_id)
            else likes.push(meme_id)
            updateLikes(likes)
        }
        else return likes.includes(meme_id)
    }

    const updateMemes = () => {
        clearTimeout(timer)
        const getMemes = async () => { if (selectedUser) setMemes(await getConversation(local_id, selectedUser) || memes) }
        getMemes()
        setTimer(setInterval(getMemes, 7500))
    }

    const handleCreateMeme = async values => {
        if (await createMeme(user_id, selectedUser, values)) await updateMemes()
    }

    useEffect(() => { loadUsers() }, [])
    useEffect(updateMemes, [selectedUser])

    return <>
        {memes && selectedUserInfo &&
            <Paper className='paper' elevation={3}>
                <Typography className='chat-header' variant='h4'>{`Conversation with ${selectedUserInfo.username}`}</Typography>
                <Table>
                    <TableBody>
                        {memes.map(meme => (
                            <TableRow key={meme.meme_id}>
                                <TableCell className='tableChat' width='40%'>
                                    {meme.owner === selectedUser && <Chat meme={meme} username={selectedUserInfo.username} update={updateLiked} local_id={local_id} />}
                                </TableCell>
                                <TableCell className='tableChat' width='20%' />
                                <TableCell className='tableChat' width='40%'>
                                    {meme.owner === local_id && <Chat meme={meme} username={username} update={updateMemes} />}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <hr />
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
        {users && <Search
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
            update={updateSelectUser}
        />}
    </>
}