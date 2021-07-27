import React from 'react'
import { TableRow, TableCell } from '@material-ui/core'

export default function Meme1({ meme_id, owner, createdAt, description, likes, imageUrl }) {
    const date = new Date(createdAt), formatedDate = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`

    return (
        <TableRow>
            <TableCell>{owner}</TableCell>
            <TableCell>{formatedDate}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell>{likes}</TableCell>
            <TableCell><img src={imageUrl} alt={meme_id} height="100" /></TableCell>
        </TableRow>
    )
}