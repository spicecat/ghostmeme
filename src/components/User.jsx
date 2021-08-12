import { useState, useEffect } from 'react'
import { Avatar, TableRow, TableCell, Button } from '@material-ui/core'

export default function User({ user_id, username, email, phone, friends, liked, imageUrl, update }) {
    const [status, setStatus] = useState('')

    const updateStatus = () => update(user_id, status, setStatus)
    const addRecipient = () => {
        console.log(`Add recipient ${user_id}`)
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
                <Button variant='contained' color='primary' size='small' onClick={addRecipient}>Add recipient</Button>
                &nbsp;
                {status === 'Accept Friend' && <Button variant='contained' color='primary' size='small' onClick={() => update(user_id, 'Reject Friend', setStatus)}>Reject Friend</Button>}
            </TableCell>
        </TableRow >
    )
}