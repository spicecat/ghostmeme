import { useState, useEffect } from 'react'
import { Avatar, TableRow, TableCell, Button } from '@material-ui/core'

import { blockUser } from '../services/userService'

export default function User({ user_id, username, email, phone, friends, liked, imageUrl, update }) {
    const [status, setStatus] = useState('')

    const updateStatus = async newStatus => {
        if (status === 'Unblock') {
            if (await blockUser(user_id)) update(user_id, '', setStatus)
        }
        else if (newStatus === 'Block') {
            if (await blockUser(user_id)) setStatus('Unblock')
        }
        else update(user_id, status, setStatus)
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