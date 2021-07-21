import { useState, useEffect } from 'react'
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField
} from '@material-ui/core'

import { getAllMemes, createMeme, getAllUsers } from '../services/memeService'

export const Chats = () => {
    const [memes, setMemes] = useState([])
    const [users, setUsers] = useState([])

    const getMemesRequest = async () => {
        setMemes(await getAllMemes())
    }

    const getUsersRequest = async () => {
        setUsers(await getAllUsers())
    }

    const createMemeRequest = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const jsonData = Object.fromEntries(formData.entries())
        const response = createMeme(jsonData)
    }

    return (
        <>
            {/* Add new meme */}
            <form onSubmit={createMemeRequest} autoComplete='off'>
                <TextField label='owner' name='owner' variant='outlined' />
                <TextField label='receiver' name='receiver' variant='outlined' />
                <TextField label='expiredAt' name='expiredAt' variant='outlined' />
                <TextField label='description' name='description' variant='outlined' />
                <TextField label='private' name='private' variant='outlined' />
                <TextField label='replyTo' name='replyTo' variant='outlined' />
                <TextField label='imageUrl' name='imageUrl' variant='outlined' />
                <TextField label='imageBase64' name='imageBase64' variant='outlined' />

                <Button type='submit' variant='contained' color='primary'>Add new meme</Button>
            </form>

            {/* Get all users */}
            <Button variant='contained' color='primary' onClick={getUsersRequest}>Get All Users</Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>name</TableCell>
                            <TableCell>email</TableCell>
                            <TableCell>phone</TableCell>
                            <TableCell>username</TableCell>
                            <TableCell>imageUrl</TableCell>
                            {/* <TableCell>deleted</TableCell> */}
                            <TableCell>user_id</TableCell>
                            <TableCell>friends</TableCell>
                            <TableCell>liked</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.user_id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.imageUrl}</TableCell>
                                {/* <TableCell>{user.deleted}</TableCell> */}
                                <TableCell>{user.user_id}</TableCell>
                                <TableCell>{user.friends}</TableCell>
                                <TableCell>{user.liked}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Get all memes */}
            <Button variant='contained' color='primary' onClick={getMemesRequest}>Get All Memes</Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>createdAt</TableCell>
                            <TableCell>expiredAt</TableCell>
                            <TableCell>description</TableCell>
                            <TableCell>private</TableCell>
                            <TableCell>imageUrl</TableCell>
                            <TableCell>meme_id</TableCell>
                            <TableCell>owner</TableCell>
                            <TableCell>receiver</TableCell>
                            <TableCell>likes</TableCell>
                            <TableCell>replyTo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {memes.map(meme => (
                            <TableRow key={meme.meme_id}>
                                <TableCell>{meme.createdAt}</TableCell>
                                <TableCell>{meme.expiredAt}</TableCell>
                                <TableCell>{meme.description}</TableCell>
                                <TableCell>{meme.privates}</TableCell>
                                <TableCell>{meme.imageUrl}</TableCell>
                                <TableCell>{meme.meme_id}</TableCell>
                                <TableCell>{meme.owner}</TableCell>
                                <TableCell>{meme.receiver}</TableCell>
                                <TableCell>{meme.likes}</TableCell>
                                <TableCell>{meme.replyTo}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Chats