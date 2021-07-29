import React from 'react'
import { TableRow, TableCell, Button } from '@material-ui/core'

export default function User({ user_id, username, email, phone, friends, liked, imageUrl }) {

    return (
        <TableRow>
            <TableCell>{username}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell>{friends}</TableCell>
            <TableCell>{liked}</TableCell>
            <TableCell>{imageUrl && <img src={imageUrl} alt={user_id} height="100" />}</TableCell>
            <TableCell><Button variant='contained' color='primary'>Does nothing</Button></TableCell>
        </TableRow>
    )
}