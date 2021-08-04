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
import { getConversation, createMeme, vanishMeme } from '../services/memeService'
import { memeSchema } from '../services/schemas'

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
                setSelectedUserInfo([])
                setMemes([])
            }
            else {
                setSelectedUser(user_id)
                console.log('selected', user_id)
                setSelectedUserInfo(await getUser(user_id) || selectedUserInfo)
                await getConversationRequest()
            }
        }
        else setStatus('Select User')
    }

    const getConversationRequest = async () => {
        console.log('Updating conversations with:', selectedUser)
        if (selectedUser) setMemes(await getConversation(localUser, selectedUser) || memes)
    }

    const createMemeRequest = async values => {
        if (await createMeme(user, selectedUser, values)) await getConversationRequest()
    }

    const vanishMemeRequest = async meme_id => {
        console.log(meme_id)
        await vanishMeme(meme_id)
    }

    const [timer, setTimer] = useState(0)
    const updateConversation = async () => {
        clearInterval(timer)
        getConversationRequest()
    }

    useEffect(() => {
        updateUsers()
        setTimer(setInterval(updateConversation, 7500))
        return () => clearTimeout(timer)
    }, [])
    useEffect(() => updateConversation(), [selectedUser])

    return user.loading === undefined && (
        <>
            {memes && selectedUserInfo &&
                <Paper elevation={3}>
                    <Typography className='chat-header' variant='h4'>{`Conversation with ${selectedUserInfo.username}`}</Typography>
                    <Table>
                        <TableBody>
                            {memes.map(meme => (
                                <TableRow key={meme.meme_id}>
                                    <TableCell className='tableChat' width='40%'>
                                        {(meme.owner === selectedUser) &&
                                            <div className='chat otherChat'>
                                                {/* Don't show expired memes */}
                                                {(meme.expiredAt !== -1 && meme.expiredAt < Date.now()) ? <i>Message vanished</i> :
                                                    <div>
                                                        <b>{meme.owner === localUser ? user.username : selectedUserInfo.username}</b>

                                                        {/* Creation date of meme and number of likes */}
                                                        &nbsp;-&nbsp;{meme.createdAt.toLocaleString()}
                                                        &nbsp;-&nbsp;{meme.likes} likes
                                                        <br />

                                                        {/* Image, if any */}
                                                        <img className='chat-img' src={meme.imageUrl} alt={meme.imageUrl} />
                                                        {meme.imageUrl && <br />}

                                                        {meme.description}

                                                        {/* Expired At date, if any */}
                                                        {meme.expiredAt === -1 || <>
                                                            <br /><br />
                                                            <i>{`Expires at ${meme.expiredAt.toLocaleString()}`}</i>
                                                        </>}
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </TableCell>
                                    <TableCell className='tableChat' width='20%' />
                                    <TableCell className='tableChat' width='40%'>
                                        {meme.owner === localUser && (meme.expiredAt === -1 || meme.expiredAt > Date.now()) && <Tooltip title='Vanish Meme' placement='right'><IconButton onClick={() => vanishMemeRequest(meme.meme_id)} aria-label='delete'><DeleteIcon /></IconButton></Tooltip>}
                                        {(meme.owner === localUser) &&
                                            <div className='chat localChat'>
                                                {(meme.expiredAt !== -1 && meme.expiredAt < Date.now()) ? <i>Message vanished</i> :
                                                    <div>
                                                        <b>{meme.owner === localUser ? user.username : selectedUserInfo.username}</b>
                                                        &nbsp;-&nbsp;{meme.createdAt.toLocaleString()}
                                                        &nbsp;-&nbsp;{meme.likes} likes
                                                        <br />
                                                        <img className='chat-img' src={meme.imageUrl} alt={meme.imageUrl} />
                                                        {meme.imageUrl && <br />}
                                                        {meme.description}
                                                        {meme.expiredAt === -1 || <>
                                                            <br /><br />
                                                            <i>{`Expires at ${meme.expiredAt.toLocaleString()}`}</i>
                                                        </>}
                                                    </div>
                                                }
                                            </div>
                                        }
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
    )
}