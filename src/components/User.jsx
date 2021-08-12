import { useState, useEffect } from 'react'
import { Avatar, TableRow, TableCell, Button } from '@material-ui/core'

import { blockUser } from '../services/userService'

export default function User({ user_id, username, email, phone, friends, liked, imageUrl, update }) {
    const [status, setStatus] = useState('')

    const updateStatus = async newStatus => {
        if (newStatus === 'Block') {
            setStatus('Unblock')
            if (!await blockUser(user_id)) setStatus(status)
        }
        else if (status === 'Unblock') {
            setStatus('Add Friend')
            if (!await blockUser(user_id)) setStatus(status)
        }
        else update(user_id, status, setStatus)
    }

    const addRecipient = () => {
        update(user_id, 'Add Recipient', setStatus)
    }

    useEffect(() => { updateStatus() }, [user_id])

    return (
        <TableRow>
            <TableCell>{imageUrl && <Avatar alt={username} src={imageUrl} />}</TableCell>
            <TableCell>{username}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell>{friends}</TableCell>
            <TableCell>{liked}</TableCell>
            <TableCell>
                <Button variant='contained' color='primary' size='small' onClick={updateStatus}>{status}</Button>
                &nbsp;
                {status === 'Select User' && <Button variant='contained' color='primary' size='small' onClick={addRecipient}>Add recipient</Button>}
                {(status !== 'Blocked' && status !== 'Unblock') && <>
                    &nbsp;
                    {status === 'Accept Friend' && <Button variant='contained' color='primary' size='small' onClick={() => updateStatus('Reject Friend')}>Reject Friend</Button>}
                    &nbsp;
                    <Button variant='contained' color='primary' size='small' onClick={() => updateStatus('Block')}>Block</Button>
                </>}
            </TableCell>
        </TableRow >
    )
}