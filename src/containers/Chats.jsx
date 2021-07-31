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
import { KeyboardDatePicker } from "@material-ui/pickers";
import Typography from '@material-ui/core/Typography';

import SendIcon from '@material-ui/icons/Send'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
// import FileBase64 from 'react-file-base64';

import { redirect, getUsers, getUser } from '../services/userService'
import { getConversation, createMeme, vanishMeme } from '../services/memeService'

export default function Chats({ user }) {
    useEffect(() => { redirect(user) }, [user])

    const localUser = user.user_id
    const [memes, setMemes] = useState([])
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState('')
    const [selectedUserInfo, setSelectedUserInfo] = useState([])

    const [imgBase64, setimgBase64] = useState('')
    const [selectedDate, handleDateChange] = useState(new Date());

    const [showImageLink, setShowImageLink] = useState('')
    const [showImageFile, setShowImageFile] = useState('')
    const [showExpiration, setShowExpiration] = useState('')

    const updateUsers = async () => { setUsers(await getUsers()) }

    const getConversationRequest = async (selectedUserID, localUserID = localUser, requestType) => {
        if (requestType === 'refresh') {
            setMemes(await getConversation(localUserID, selectedUserID))
        } else {
            // GRACEFULLY HANDLE API
            const response = await getConversation(localUserID, selectedUserID)
            response ? setMemes(response) : console.log('Error')
        }
    }

    const selectUserRequest = async userID => {
        setSelectedUser(userID)
        setSelectedUserInfo(await getUser(userID))
        await getConversationRequest(userID, localUser, 'refresh')
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
        else if (component === 'imageFile') {
            showImageFile ? setShowImageFile(false) : setShowImageFile(true)
        }
        else if (component === 'expiration') {
            showExpiration ? setShowExpiration(false) : setShowExpiration(true)
        }
    }

    const selectedUserRef = useRef(selectedUser)
    selectedUserRef.current = selectedUser

    const localUserRef = useRef(localUser)
    localUserRef.current = localUser

    useEffect(() => {
        updateUsers()
        let timer = setInterval(() => {
            console.log('Updating conversations...')
            // selectedUserRef.current ? console.log(selectedUserRef.current) : console.log('No user selected')
            // console.log(`Local user: ${localUserRef.current}`)
            selectedUserRef.current ? getConversationRequest(selectedUserRef.current, localUserRef.current) : console.log('No user selected')
        }, 3000)
        return () => { clearTimeout(timer) }
    }, [])

    return user.loading === undefined && (
        <>
            {/* Add new meme */}
            <form onSubmit={createMemeRequest} autoComplete='off'>
                <TextField type='hidden' value={localUser} name='owner' />
                <TextField type='hidden' value={selectedUser} name='receiver' />
                {/* <TextField label='expiredAt' placeholder=-1 name='expiredAt' variant='outlined' />
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
                    {/* {showExpiration ? <TextField label='Expiration' name='expiredAt' variant='outlined' type='date' defaultValue="2021-07-28" /> : <TextField type='hidden' name='expiredAt' />} */}
                    {showExpiration ? <KeyboardDatePicker
                        name='expiredAt'
                        clearable
                        value={selectedDate}
                        placeholder="10/10/2018"
                        onChange={date => handleDateChange(date)}
                        minDate={new Date()}
                        format="MM/dd/yyyy"
                    /> : <TextField type='hidden' name='expiredAt' />}
                    &nbsp;
                    {showImageLink ? <TextField label='Image URL' name='imageUrl' variant='outlined' /> : <TextField type='hidden' name='imageUrl' />}
                    &nbsp;
                    {showImageFile ? <TextField label='Image Base64' name='imageBase64' variant='outlined' /> : <TextField type='hidden' name='imageBase64' />}
                    {/* {showImageFile ? <input name='imageBase64' accept="image/*" id="icon-button-file" type="file" /> : <TextField type='hidden' name='imageBase64' />} */}

                </div>
            </form>

            <br />
            <Paper elevation={3}>
                <div align='center' className='chat-header'>{selectedUser ? <Typography variant='h4'>Conversation with {selectedUserInfo.username}</Typography> : <Typography variant='h4'>No conversation selected</Typography>}</div>
                <TableContainer >
                    <Table>
                        <TableBody>
                            {memes && memes.map(meme => (
                                // <TableRow className={(meme.owner === localUser) ? 'localChat' : 'otherChat'} key={meme.meme_id}>
                                <TableRow key={meme.meme_id}>
                                    {/* <TableCell className={(meme.owner === localUser) ? 'localChatText' : ''}>{meme.createdAt.toLocaleString()}</TableCell> */}
                                    {/* <TableCell className={(meme.owner === localUser) ? 'localChatText' : ''}>{meme.expiredAt===-1 ? '' : meme.expiredAt.toLocaleString()}</TableCell> */}
                                    <TableCell className='tableChat' width='40%'>
                                        {(meme.owner === selectedUser) &&
                                            <div className='chat otherChat'>
                                                {/* Don't show expired memes */}
                                                {(meme.expiredAt !== -1 && meme.expiredAt < Date.now()) ? <i>Message expired</i> :
                                                    <div>
                                                        {/* Username of sender */}
                                                        <b>{(user && selectedUserInfo) ? (meme.owner === localUser) ? user.username : selectedUserInfo.username : 'Error'}</b>

                                                        {/* Creation date of meme and number of likes */}
                                                        &nbsp;-&nbsp;{meme.createdAt.toLocaleString()}
                                                        &nbsp;-&nbsp;{meme.likes} likes
                                                        <br />

                                                        {/* Image, if any */}
                                                        <img className='chat-img' src={meme.imageUrl} alt={meme.imageUrl} />
                                                        {meme.imageUrl && <br />}

                                                        {/* Meme description */}
                                                        {meme.description}

                                                        {/* Expired At date, if any */}
                                                        {meme.expiredAt === -1 ? '' : <br />}
                                                        {meme.expiredAt === -1 ? '' : <br />}
                                                        <i>{meme.expiredAt === -1 ? '' : `Expires at ${meme.expiredAt.toLocaleString()}`}</i>
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </TableCell>
                                    <TableCell className='tableChat' width='20%' />
                                    <TableCell className='tableChat' width='40%'>
                                        {/* <div className={(meme.owner === localUser) ? 'chat localChat' : 'chat otherChat'}> */}
                                        {meme.owner === localUser && (meme.expiredAt === -1 || meme.expiredAt > Date.now()) && <IconButton onClick={() => vanishMemeRequest(meme.meme_id)} aria-label='delete'><DeleteIcon /></IconButton>}
                                        {(meme.owner === localUser) &&
                                            <div className='chat localChat'>
                                                {/* Don't show expired memes */}
                                                {(meme.expiredAt !== -1 && meme.expiredAt < Date.now()) ? <i>Message expired</i> :
                                                    <div>
                                                        {/* Username of sender */}
                                                        <b>{(user && selectedUserInfo) ? (meme.owner === localUser) ? user.username : selectedUserInfo.username : 'Error'}</b>

                                                        {/* Creation date of meme and number of likes */}
                                                        &nbsp;-&nbsp;{meme.createdAt.toLocaleString()}
                                                        &nbsp;-&nbsp;{meme.likes} likes
                                                        <br />

                                                        {/* Image, if any */}
                                                        <img className='chat-img' src={meme.imageUrl} alt={meme.imageUrl} />
                                                        {meme.imageUrl && <br />}

                                                        {/* Meme description */}
                                                        {meme.description}

                                                        {/* Expired At date, if any */}
                                                        {meme.expiredAt === -1 ? '' : <br />}
                                                        {meme.expiredAt === -1 ? '' : <br />}
                                                        <i>{meme.expiredAt === -1 ? '' : `Expires at ${meme.expiredAt.toLocaleString()}`}</i>
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <br /><br />

            {/* Get all users */}
            <Button variant='contained' color='primary' onClick={updateUsers}>Get All Users</Button>
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
                            {/* <TableCell>liked</TableCell> */}
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
                                {/* <TableCell>{user.liked}</TableCell> */}
                                <TableCell><Button variant='contained' color='primary' onClick={() => selectUserRequest(user.user_id)}>Select User</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}