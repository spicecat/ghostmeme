import React, { useState, useEffect } from 'react'
import { TableRow, TableCell, Button } from '@material-ui/core'

import { sendFriendRequest, removeFriendRequest, removeFriend } from '../services/userService'

export default function User({ user_id, username, email, phone, friends, liked, imageUrl, localUser }) {
    const [status, setStatus] = useState('Add Friend')

    const updateStatus = async () => {
        if (user_id in localUser.friends) setStatus('Remove Friend')
        else if (user_id in localUser.friendRequests) setStatus('Pending')
        else setStatus('Add Friend')
        console.log(user_id, username)
    }

    // useEffect(() => {
    //     updateStatus()
    // }, [user_id])

    useEffect(() => {
        updateStatus()
    }, [])

    const handleFriendRequest = async () => {
        if (status === 'Add Friend' && await sendFriendRequest(localUser.user_id, user_id)) setStatus('Pending')
        else if (status === 'Pending' && await removeFriendRequest(localUser.user_id, user_id)) setStatus('Add Friend')
        else if (status === 'Remove Friend' && await removeFriend(localUser.user_id, user_id)) setStatus('Add Friend')
    }

    return (
        <TableRow>
            <TableCell>{username}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell>{friends}</TableCell>
            <TableCell>{liked}</TableCell>
            <TableCell>{imageUrl && <img src={imageUrl} alt={user_id} height="100" />}</TableCell>
            <TableCell><Button variant='contained' color='primary' size='small' onClick={handleFriendRequest}>{status}</Button></TableCell>
        </TableRow >
    )
}