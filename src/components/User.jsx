import { useState, useEffect } from 'react'
import { useDispatch, useTrackedState } from 'reactive-react-redux'
import { Avatar, TableRow, TableCell, Button } from '@material-ui/core'

import { getUsers, searchUsers, sendFriendRequest, removeFriendRequest, addFriend, removeFriend, blockUser } from '../services/userService'

export default function User({ user_id: target_id, username, email, phone, friends: friendCount, liked, imageUrl, update }) {
    const state = useTrackedState()
    const dispatch = useDispatch()
    const { user: { user_id, blocked, blockedBy }, friends, outgoingFriendRequests, incomingFriendRequests } = state

    const [status, setStatus] = useState('')

    const getStatus = target_id => {
        console.log(outgoingFriendRequests, state.arr)
        if (blocked.includes(target_id)) setStatus('Unblock')
        else if (blockedBy.includes(target_id)) setStatus('Blocked')
        else if (target_id in friends) setStatus('Remove Friend')
        else if (incomingFriendRequests.includes(target_id)) setStatus('Accept Friend')
        else if (outgoingFriendRequests.includes(target_id)) setStatus('Pending')
        else setStatus('Add Friend')
    }

    const updateStatus = async newStatus => {
        console.log('update', target_id, outgoingFriendRequests)
        if (newStatus === 'Reject Friend') {
            setStatus('Add Friend')
            if (await removeFriendRequest(user_id, target_id)) {
                dispatch({ type: 'delete', target: 'incomingFriendRequests', value: target_id })
                return
            }
        }
        else if (newStatus === 'Block') {
            setStatus('Unblock')
            if (await blockUser(user_id)) {
                dispatch({ type: 'add', target: 'blocked', value: target_id })
                return
            }
        }
        else if (status === 'Add Friend') {
            setStatus('Pending')
            if (await sendFriendRequest(user_id, target_id)) {
                console.log(dispatch({ type: 'push', target: 'outgoingFriendRequests', value: target_id }))
                return
            }
        }
        else if (status === 'Pending') {
            setStatus('Add Friend')
            if (await removeFriendRequest(user_id, target_id)) {
                dispatch({ type: 'delete', target: 'outgoingFriendRequests', value: target_id })
                return
            }
        }
        else if (status === 'Accept Friend') {
            setStatus('Remove Friend')
            if (await addFriend(user_id, target_id)) {
                dispatch({ type: 'add', target: 'friends', value: [target_id, username] })
                dispatch({ type: 'delete', target: 'incomingFriendRequests', value: target_id })
                return
            }
        }
        else if (status === 'Remove Friend') {
            setStatus('Add Friend')
            if (await removeFriend(user_id, target_id)) {
                dispatch({ type: 'delete', target: 'friends', value: target_id })
                return
            }
        }
        else if (status === 'Unblock') {
            setStatus('Add Friend')
            if (await blockUser(user_id)) {
                dispatch({ type: 'delete', target: 'blocked', value: target_id })
                return
            }
        }
        setStatus(status)
    }

    const addRecipient = () => {
        update(user_id, 'Add Recipient', setStatus)
    }

    useEffect(getStatus, [target_id])

    return (
        <TableRow>
            <TableCell>{imageUrl && <Avatar alt={username} src={imageUrl} />}</TableCell>
            <TableCell>{username}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell>{friendCount}</TableCell>
            <TableCell>{liked}</TableCell>
            <TableCell>
                <Button variant='contained' color='primary' size='small' onClick={updateStatus}>{status}</Button>
                &nbsp;
                <Button variant='contained' color='primary' size='small' onClick={addRecipient}>Add recipient</Button>
                {status !== 'Unblock' && <>
                    &nbsp;
                    {status === 'Accept Friend' && <Button variant='contained' color='primary' size='small' onClick={() => updateStatus('Reject Friend')}>Reject Friend</Button>}
                    &nbsp;
                    <Button variant='contained' color='primary' size='small' onClick={() => updateStatus('Block')}>Block</Button>
                </>}
            </TableCell>
        </TableRow >
    )
}