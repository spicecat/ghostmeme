import { useState, useEffect, useRef } from 'react'
import { Typography } from '@material-ui/core'

import Search from '../components/Search'

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

import { redirect } from '../services/userService'
import { getUserInfo, getUsers } from '../services/memeService'

export default function Friends({ user }) {
    useEffect(() => { redirect(user) }, [user])

    const [users, setUsers] = useState([])

    const getUsersRequest = async () => {
        setUsers(await getUsers())
    }

    return user.loading === undefined &&
        <>
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
                            <TableCell>Select User?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map(user => (
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
                                <TableCell><Button variant='contained' color='primary'>Does nothing</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
}