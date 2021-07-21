import { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField
} from '@material-ui/core'

import { getAllMemes } from '../services/memeService'

export const Chats = () => {
    const [memes, setMemes] = useState([])

    const makePostRequest = async () => {
        const response = await getAllMemes()
        setMemes(response)

    }

    // useEffect(makePostRequest)

    return (
        <>
            <Button variant='contained' color='primary' onClick={makePostRequest}>Get All Memes</Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>createdAt</TableCell>
                            <TableCell>expiredAt</TableCell>
                            <TableCell>description</TableCell>
                            <TableCell>private</TableCell>
                            <TableCell>imageUrl</TableCell>
                            <TableCell>meme_id</TableCell>
                            <TableCell>owner</TableCell>
                            <TableCell>receiver</TableCell>
                            <TableCell>likes</TableCell>
                            <TableCell>replyTo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {memes.map(meme => (
                            <TableRow key={meme.meme_id}>
                                <TableCell>{meme.createdAt}</TableCell>
                                <TableCell>{meme.expiredAt}</TableCell>
                                <TableCell>{meme.description}</TableCell>
                                <TableCell>{meme.privates}</TableCell>
                                <TableCell>{meme.imageUrl}</TableCell>
                                <TableCell>{meme.meme_id}</TableCell>
                                <TableCell>{meme.owner}</TableCell>
                                <TableCell>{meme.receiver}</TableCell>
                                <TableCell>{meme.likes}</TableCell>
                                <TableCell>{meme.replyTo}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Chats