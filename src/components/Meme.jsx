import React from 'react'
import { TableRow, TableCell } from '@material-ui/core'

export default function Meme({ meme_id, username, createdAt, description, likes, imageUrl }) {
    const date = new Date(createdAt), formatedDate = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
    console.log(username)
    return (
        <TableRow>
            <TableCell>{username}</TableCell>
            <TableCell>{formatedDate}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell><img src={imageUrl} alt={meme_id} height="100" /></TableCell>
            <TableCell>{likes}</TableCell>
        </TableRow>
    )
}