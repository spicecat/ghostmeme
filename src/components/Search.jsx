import { useState, useEffect } from 'react'
import { Table, TableHead, TableBody, TableFooter, TableRow, TableCell, TablePagination } from '@material-ui/core'

import { getFriendsStoriesMemes } from '../services/memeService'

import Meme from './Meme'

export default function Search({ user }) {
    useEffect(() => { updateMemes() }, [])

    const [memes, setMemes] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const updateMemes = async () => { setMemes(await getFriendsStoriesMemes(user)) }

    const changePage = (event, newPage) => { setPage(newPage) }
    const changeRowsPerPage = event => {
        setRowsPerPage(Number(event.target.value))
        setPage(0)
    }

    return !user.loading &&
        <Table>
            <TableHead>
                <TableRow>
                    {['Owner', 'CreatedAt', 'Description', 'Likes'].map(cat =>
                        <TableCell key={cat}>{cat}</TableCell>
                    )}
                </TableRow>
            </TableHead>
            <TableBody>
                {memes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(meme => <Meme key={meme.meme_id} {...meme} />)}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        count={memes.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{ native: true }}
                        onPageChange={changePage}
                        onRowsPerPageChange={changeRowsPerPage}
                    />
                </TableRow>
            </TableFooter>
        </Table>
}