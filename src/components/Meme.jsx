import React from 'react'
import { TableRow, TableCell } from '@material-ui/core'

export default function Meme1({ meme_id, owner, createdAt, description, likes, imageUrl }) {
    return (
        <TableRow key={meme_id}>
            <TableCell>{owner}</TableCell>
            <TableCell>{createdAt}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell>{likes}</TableCell>
            <TableCell>{imageUrl}</TableCell>
        </TableRow>
    )
}