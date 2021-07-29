import { useState, useEffect, useRef } from 'react'
import {
    Button,
    ButtonGroup,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import DeleteIcon from '@material-ui/icons/DeleteOutline'

import { redirect, getUsers, getUserInfo } from '../services/userService'
import { getMemes, getConversation, createMeme, vanishMeme } from '../services/memeService'

export default function Chats({ user }) {
    useEffect(() => { redirect(user) }, [user])

    // const localUser = '60f72d7d680fdc0008d79ad2'
    const localUser = user.user_id
    const [memes, setMemes] = useState([])
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState('')
    const [localUserInfo, setLocalUserInfo] = useState([])
    const [selectedUserInfo, setSelectedUserInfo] = useState([])

    const [showImageLink, setShowImageLink] = useState('')
    const [showImageFile, setShowImageFile] = useState('')
    const [showExpiration, setShowExpiration] = useState('')

    // const [selectedUser, setSelectedUser] = useState('60f5c300aa69860008702933')

    const getMemesRequest = async () => {
        setMemes(await getMemes())
    }

    const getUserInfoRequest = async (userID, user) => {
        if (user === 'local') {
            setLocalUserInfo(await getUserInfo(userID))
            // console.log(localUserInfo)
        }

        if (user === 'selected') {
            setSelectedUserInfo(await getUserInfo(userID))
            // console.log(selectedUserInfo)
        }
        // const response = await getUserInfo(userID)
        // console.log(response.username)
        // return response.username
    }

    const getUsersRequest = async () => {
        setUsers(await getUsers())
    }

    const getConversationRequest = async (selectedUserID, requestType) => {
        // const selectedUser = '60f5c300aa69860008702933'
        if (requestType === 'refresh') {
            setMemes(await getConversation(localUser, selectedUserID))
        } else {
            // GRACEFULLY HANDLE API
            const response = await getConversation(localUser, selectedUserID)
            response ? setMemes(response) : console.log('Error')
        }
    }

    const selectUserRequest = async (userID) => {
        setSelectedUser(userID)
        getUserInfoRequest(localUser, 'local')
        getUserInfoRequest(userID, 'selected')
        await getConversationRequest(userID, 'refresh')
    }

    const createMemeRequest = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const jsonData = Object.fromEntries(formData.entries())
        const response = await createMeme(jsonData)

        await getConversationRequest(selectedUser)
    }

    const vanishMemeRequest = async (memeID) => {
        console.log(memeID)
        await vanishMeme(memeID)
    }

    const toggleComponent = (component) => {
        if (component === 'imageLink') {
            showImageLink ? setShowImageLink(false) : setShowImageLink(true)
        }

        if (component === 'imageFile') {
            showImageFile ? setShowImageFile(false) : setShowImageFile(true)
        }

        if (component === 'expiration') {
            showExpiration ? setShowExpiration(false) : setShowExpiration(true)
        }
    }

    const selectedUserRef = useRef(selectedUser)
    selectedUserRef.current = selectedUser


    useEffect(() => {
        let timer = setInterval(() => {
            console.log('Updating conversations...')
            // selectedUserRef.current ? console.log(selectedUserRef.current) : console.log('No user selected')
            selectedUserRef.current ? getConversationRequest(selectedUserRef.current) : console.log('No user selected')
        }, 5000)
        return () => { clearTimeout(timer) }
    }, [])

    return user.loading === undefined && (
        <>
            {/* Search memes from X sender to X receiver */}

            {/* <TextField label='selectedUser' name='selectedUser' value={selectedUser} variant='outlined' />
            <Button variant='contained' color='primary' onClick={() => getConversationRequest(selectedUser)}>Search Conversations</Button> */}
            {/* <Button variant='contained' color='primary' onClick={() => getUserInfoRequest(localUser, 'local')}>Selected User Info</Button>
            <Button variant='contained' color='primary' onClick={() => getUserInfoRequest(selectedUser, 'selected')}>Selected User Info</Button> */}

            {/* Add new meme */}
            <form onSubmit={createMemeRequest} autoComplete='off'>
                <TextField type='hidden' value={localUser} name='owner' />
                <TextField type='hidden' value={selectedUser} name='receiver' />
                {/* <TextField label='expiredAt' placeholder='-1' name='expiredAt' variant='outlined' />
                <TextField label='description' name='description' variant='outlined' /> */}
                <TextField type='hidden' value='true' name='private' />
                <TextField type='hidden' name='replyTo' />
                {/* <TextField label='imageUrl' name='imageUrl' variant='outlined' />
                <TextField label='imageBase64' name='imageBase64' variant='outlined' /> */}

                {/* <Button type='submit' variant='contained' color='primary'>Add new meme</Button> */}

                {/* <Button variant='contained' color='primary' onClick={() => console.log(new Date(Date.now()).toLocaleDateString())}>Get Current Date</Button> */}
                <div align='center'>
                    <ButtonGroup variant="outlined" color="primary" aria-label="contained primary button group">
                        <Button color={showExpiration && 'secondary'} onClick={() => toggleComponent('expiration')}>Expiration</Button>
                        <Button color={showImageLink && 'secondary'} onClick={() => toggleComponent('imageLink')}>Image Link</Button>
                        <Button color={showImageFile && 'secondary'} onClick={() => toggleComponent('imageFile')}>Image File</Button>

                        <TextField placeholder='Chat message' name='description' variant='outlined' InputProps={{
                            endAdornment:
                                // <Button type='submit' variant="contained" color="primary" endIcon={<SendIcon />}> </Button>
                                <IconButton aria-label='send' type='submit'><SendIcon /></IconButton>
                        }} />
                    </ButtonGroup>

                    <br /><br />
                    {showExpiration ? <TextField label='Expiration' name='expiredAt' variant='outlined' type='date' defaultValue="2021-07-28" /> : <TextField type='hidden' name='expiredAt' />}
                    &nbsp;
                    {showImageLink ? <TextField label='Image URL' name='imageUrl' variant='outlined' /> : <TextField type='hidden' name='imageUrl' />}
                    &nbsp;
                    {showImageFile ? <TextField label='Image Base64' name='imageBase64' variant='outlined' /> : <TextField type='hidden' name='imageBase64' />}
                </div>
            </form>

            {/* Get all memes */}
            {/* <Button variant='contained' color='primary' onClick={getMemesRequest}>Get All Memes</Button>
            <br /><br /> */}
            <TableContainer >
                <Table>
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>createdAt</TableCell> */}
                            {/* <TableCell>expiredAt</TableCell> */}
                            {/* <TableCell>localUser</TableCell>
                            <TableCell>otherUser</TableCell> */}
                            {/* <TableCell>private</TableCell> */}
                            {/* <TableCell>imageUrl</TableCell> */}
                            {/* <TableCell>meme_id</TableCell> */}
                            {/* <TableCell>owner</TableCell> */}
                            {/* <TableCell>receiver</TableCell> */}
                            {/* <TableCell>likes</TableCell> */}
                            {/* <TableCell>replyTo</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {memes && memes.map(meme => (
                            // <TableRow className={(meme.owner === localUser) ? 'localChat' : 'otherChat'} key={meme.meme_id}>
                            <TableRow key={meme.meme_id}>
                                {/* <TableCell className={(meme.owner === localUser) ? 'localChatText' : ''}>{meme.createdAt.toLocaleString()}</TableCell> */}
                                {/* <TableCell className={(meme.owner === localUser) ? 'localChatText' : ''}>{meme.expiredAt == '-1' ? '' : meme.expiredAt.toLocaleString()}</TableCell> */}
                                <TableCell className='tableChat' width='40%'>
                                    {(meme.owner === selectedUser) &&
                                        <div className='chat otherChat'>
                                            {/* Don't show expired memes */}
                                            {(meme.expiredAt != Number('-1') && meme.expiredAt < Date.now()) ? <i>Message expired</i> :
                                                <div>
                                                    {/* Username of sender */}
                                                    <b>{(localUserInfo && selectedUserInfo) ? (meme.owner === localUser) ? localUserInfo.username : selectedUserInfo.username : 'Error'}</b>

                                                    {/* Creation date of meme and number of likes */}
                                                    &nbsp;-&nbsp;{meme.createdAt.toLocaleString()}
                                                    &nbsp;-&nbsp;{meme.likes} likes
                                                    <br />

                                                    {/* Image, if any */}
                                                    <img className='chat-img' src={meme.imageUrl} />
                                                    {meme.imageUrl && <br />}

                                                    {/* Meme description */}
                                                    {meme.description}

                                                    {/* Expired At date, if any */}
                                                    {meme.expiredAt == '-1' ? '' : <br />}
                                                    {meme.expiredAt == '-1' ? '' : <br />}
                                                    <i>{meme.expiredAt == '-1' ? '' : `Expires at ${meme.expiredAt.toLocaleString()}`}</i>
                                                </div>
                                            }
                                        </div>
                                    }
                                </TableCell>
                                <TableCell className='tableChat' width='20%' />
                                <TableCell className='tableChat' width='40%'>
                                    {/* <div className={(meme.owner === localUser) ? 'chat localChat' : 'chat otherChat'}> */}
                                    {meme.owner === localUser && (meme.expiredAt == Number('-1') || meme.expiredAt > Date.now()) && <IconButton onClick={() => vanishMemeRequest(meme.meme_id)} aria-label='delete'><DeleteIcon /></IconButton>}
                                    {(meme.owner === localUser) &&
                                        <div className='chat localChat'>
                                            {/* Don't show expired memes */}
                                            {(meme.expiredAt != Number('-1') && meme.expiredAt < Date.now()) ? <i>Message expired</i> :
                                                <div>
                                                    {/* Username of sender */}
                                                    <b>{(localUserInfo && selectedUserInfo) ? (meme.owner === localUser) ? localUserInfo.username : selectedUserInfo.username : 'Error'}</b>

                                                    {/* Creation date of meme and number of likes */}
                                                    &nbsp;-&nbsp;{meme.createdAt.toLocaleString()}
                                                    &nbsp;-&nbsp;{meme.likes} likes
                                                    <br />

                                                    {/* Image, if any */}
                                                    <img className='chat-img' src={meme.imageUrl} />
                                                    {meme.imageUrl && <br />}

                                                    {/* Meme description */}
                                                    {meme.description}

                                                    {/* Expired At date, if any */}
                                                    {meme.expiredAt == '-1' ? '' : <br />}
                                                    {meme.expiredAt == '-1' ? '' : <br />}
                                                    <i>{meme.expiredAt == '-1' ? '' : `Expires at ${meme.expiredAt.toLocaleString()}`}</i>
                                                </div>
                                            }
                                        </div>
                                    }
                                </TableCell>
                                {/* <TableCell className={(meme.owner === localUser) ? 'localChatText' : ''}>{meme.privates}</TableCell> */}
                                {/* <TableCell className={(meme.owner === localUser) ? 'localChatText' : ''}><img className='chat-img' src={meme.imageUrl} /></TableCell> */}
                                {/* <TableCell className={(meme.owner === localUser) ? 'localChatText' : ''}>{meme.meme_id}</TableCell> */}
                                {/* <TableCell className={(meme.owner === localUser) ? 'localChatText' : ''}>{(localUserInfo && selectedUserInfo) ? (meme.owner === localUser) ? localUserInfo.username : selectedUserInfo.username : 'Error'}</TableCell> */}
                                {/* <TableCell className={(meme.owner === localUser) ? 'localChatText' : ''}>{(localUserInfo && selectedUserInfo) ? (meme.receiver === localUser) ? localUserInfo.username : selectedUserInfo.username : 'Error'}</TableCell> */}
                                {/* <TableCell className={(meme.owner === localUser) ? 'localChatText' : ''}>{meme.likes}</TableCell> */}
                                {/* <TableCell className={(meme.owner === localUser) ? 'localChatText' : ''}>{meme.replyTo}</TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Get all users */}
            <Button variant='contained' color='primary' onClick={getUsersRequest}>Get All Users</Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>name</TableCell>
                            {/* <TableCell>email</TableCell>
                            <TableCell>phone</TableCell> */}
                            <TableCell>username</TableCell>
                            {/* <TableCell>imageUrl</TableCell> */}
                            {/* <TableCell>deleted</TableCell> */}
                            {/* <TableCell>user_id</TableCell> */}
                            <TableCell>friends</TableCell>
                            <TableCell>liked</TableCell>
                            <TableCell>Select User?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map(user => (
                            <TableRow key={user.user_id}>
                                <TableCell>{user.name}</TableCell>
                                {/* <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell> */}
                                <TableCell>{user.username}</TableCell>
                                {/* <TableCell>{user.imageUrl}</TableCell> */}
                                {/* <TableCell>{user.deleted}</TableCell> */}
                                {/* <TableCell>{user.user_id}</TableCell> */}
                                <TableCell>{user.friends}</TableCell>
                                <TableCell>{user.liked}</TableCell>
                                <TableCell><Button variant='contained' color='primary' onClick={() => selectUserRequest(user.user_id)}>Select User</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}