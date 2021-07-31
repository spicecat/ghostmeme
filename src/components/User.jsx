import React, { useState, useEffect } from 'react'
import { TableRow, TableCell, Button } from '@material-ui/core'

import { sendFriendRequest, removeFriendRequest, addFriend, removeFriend } from '../services/userService'

export default function User({ user_id: target_id, username, email, phone, friends, liked, imageUrl, localUser, update }) {
    const [status, setStatus] = useState('Add Friend')
    const { user_id: local_id, friends: localFriends, outgoingFriendRequests, incomingFriendRequests } = localUser

    const updateStatus = async () => {
        if (target_id in localFriends) setStatus('Remove Friend')
        else if (incomingFriendRequests.includes(target_id)) setStatus('Accept Friend')
        else if (outgoingFriendRequests.includes(target_id)) setStatus('Pending')
        else setStatus('Add Friend')
        console.log(target_id, username)
    }

    useEffect(() => { updateStatus() }, [target_id, localUser])

    const handleFriendRequest = async () => {
        if (status === 'Add Friend') await sendFriendRequest(local_id, target_id)
        else if (status === 'Pending') await removeFriendRequest(local_id, target_id)
        else if (status === 'Accept Friend') await addFriend(local_id, target_id)
        else if (status === 'Remove Friend') await removeFriend(local_id, target_id)
        await update()
    }

    return (
        <TableRow>
            <TableCell>{username}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell>{friends}</TableCell>
            <TableCell>{liked}</TableCell>
            <TableCell>{imageUrl && <img src={imageUrl} alt={target_id} height="100" />}</TableCell>
            <TableCell><Button variant='contained' color='primary' size='small' onClick={handleFriendRequest}>{status}</Button></TableCell>
        </TableRow >
    )
}