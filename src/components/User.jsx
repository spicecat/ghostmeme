import React, { useState, useEffect } from 'react'
import { TableRow, TableCell, Button } from '@material-ui/core'

export default function User({ user_id, username, email, phone, friends, liked, imageUrl, update }) {
    const [status, setStatus] = useState('')

    const updateStatus = () => update(user_id, status, setStatus)

    useEffect(() => { updateStatus() }, [user_id])

    return (
        <TableRow>
            <TableCell>{imageUrl && <img src={imageUrl} alt={user_id} height="100" />}</TableCell>
            <TableCell>{username}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell>{friends}</TableCell>
            <TableCell>{liked}</TableCell>
            <TableCell><Button variant='contained' color='primary' size='small' onClick={updateStatus}>{status}</Button></TableCell>
        </TableRow >
    )
}