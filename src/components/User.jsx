import React, { useState, useEffect } from 'react'
import { TableRow, TableCell, Button } from '@material-ui/core'

import { sendFriendRequest, getFriendRequests } from '../services/userService'

export default function User({ user_id, username, email, phone, friends, liked, imageUrl, localUser }) {
    const [status, setStatus] = useState('Add Friend')
    const updateStatus = async () => {
        console.log(await sendFriendRequest(localUser.user_id, user_id))
        // setStatus('Pending')
    }

    // useEffect(() => {
    //     updateStatus()
    // }, [user_id])
    return (
        <TableRow>
            <TableCell>{username}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell>{friends}</TableCell>
            <TableCell>{liked}</TableCell>
            <TableCell>{imageUrl && <img src={imageUrl} alt={user_id} height="100" />}</TableCell>
            <TableCell><Button variant='contained' color='primary' size='small' onClick={updateStatus}>{status}</Button></TableCell>
        </TableRow >
    )
}