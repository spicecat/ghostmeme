import { useState, useEffect } from 'react'
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Paper,
    Tooltip,
    Typography
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/DeleteOutline'

import PaginatedTable from '../components/PaginatedTable'
import User from '../components/User'
import Form from '../components/Form'

import { redirect, getUsers, getUser } from '../services/userService'
import { getConversation, createMeme, vanishMeme, isExpired } from '../services/memeService'
import { memeSchema } from '../services/schemas'

const Chat = ({ meme: { meme_id, createdAt, expiredAt, description, likes, imageUrl, }, isLocal, username, action }) => <>
    {isLocal && !isExpired({ expiredAt }) && <Tooltip title='Vanish Meme' placement='right'><IconButton onClick={() => action(meme_id)} aria-label='delete'><DeleteIcon /></IconButton></Tooltip>}
    <div className={`chat ${isLocal ? 'local' : 'other'}Chat`}>
        {isExpired({ expiredAt }) ? <i>Message vanished</i> :
            <div>
                <b>{username}</b>
                &nbsp;-&nbsp;{createdAt.toLocaleString()}
                &nbsp;-&nbsp;{likes} likes
                <br />
                <img className='chat-img' src={imageUrl} alt={imageUrl} />
                {imageUrl && <br />}
                {description}
                {expiredAt !== -1 && <>
                    <br /><br />
                    <i>{`Expires at ${expiredAt.toLocaleString()}`}</i>
                </>}
            </div>
        }
    </div>
</>

export default function Chats({ user }) {
    useEffect(() => { redirect(user) }, [user])

    const localUser = user.user_id
    const [memes, setMemes] = useState([])
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState('')
    const [selectedUserInfo, setSelectedUserInfo] = useState()

    const updateUsers = async () => { setUsers(await getUsers()) }

    const selectUserRequest = async (user_id, status, setStatus) => {
        if (status === 'Select User') {
            if (selectedUser === user_id) {
                setSelectedUser('')
                setSelectedUserInfo()
                setMemes([])
            }
            else {
                setSelectedUser(user_id)
                console.log('selected', user_id)
                setSelectedUserInfo(await getUser(user_id) || selectedUserInfo)
                await updateMemes()
            }
        }
        else setStatus('Select User')
    }

    const updateMemes = async () => {
        console.log('Updating conversations with:', selectedUser, memes)
        if (selectedUser) setMemes(await getConversation(localUser, selectedUser) || memes)
    }

    const createMemeRequest = async values => {
        if (await createMeme(user, selectedUser, values)) await updateMemes()
    }

    const vanishMemeRequest = async meme_id => {
        console.log(meme_id)
        if (await vanishMeme(meme_id)) updateMemes()
    }

    const [timer, setTimer] = useState(0)
    const updateConversation = async () => {
        clearInterval(timer)
        updateMemes()
    }

    useEffect(() => {
        updateUsers()
        setTimer(setInterval(updateConversation, 7500))
        return () => clearTimeout(timer)
    }, [])
    useEffect(() => updateConversation(), [selectedUser])

    return user.loading === undefined && <>
        {memes && selectedUserInfo &&
            <Paper elevation={3}>
                <Typography className='chat-header' variant='h4'>{`Conversation with ${selectedUserInfo.username}`}</Typography>
                <Table>
                    <TableBody>
                        {memes.map(meme => (
                            <TableRow key={meme.meme_id}>
                                <TableCell className='tableChat' width='40%'>
                                    {meme.owner === selectedUser && <Chat meme={meme} isLocal={false} username={selectedUserInfo.username} action={vanishMemeRequest} />}
                                </TableCell>
                                <TableCell className='tableChat' width='20%' />
                                <TableCell className='tableChat' width='40%'>
                                    {meme.owner === localUser && <Chat meme={meme} isLocal={true} username={user.username} action={vanishMemeRequest} />}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <hr />
                <div className='chat-footer'>
                    <Form
                        name='Post Meme'
                        action={createMemeRequest}
                        schema={memeSchema}
                        inline={true}
                    />
                </div>
            </Paper>
        }
        <br /><br />
        <PaginatedTable
            name='users'
            headCells={[
                { name: 'Profile Picture', prop: 'imageUrl' },
                { name: 'Username', prop: 'username' },
                { name: 'Email', prop: 'email' },
                { name: 'Phone', prop: 'phone' },
                { name: 'Friends', prop: 'friends' },
                { name: 'Likes', prop: 'liked' }]}
            data={users}
            Component={User}
            update={selectUserRequest}
        />
    </>
}