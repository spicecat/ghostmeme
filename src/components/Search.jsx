import { useState, useEffect } from 'react'
import { Table, TableHead, TableBody, TableFooter, TableRow, TableCell, TablePagination, IconButton } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import { getFriendsStoriesMemes } from '../services/memeService'

import Meme from './Meme'

export default function Search({ user }) {
    useEffect(() => { updateMemes() }, [])

    const [open, setOpen] = useState(true)
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
        <Table size='small'>
            <TableHead>
                <IconButton onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                Memes from friends
                {open &&
                    <TableRow>
                        {['Owner', 'CreatedAt', 'Description', 'Image', 'Likes'].map(cat =>
                            <TableCell key={cat}>{cat}</TableCell>
                        )}
                    </TableRow>
                }
            </TableHead>
            {open &&
                <>
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
                </>
            }
        </Table>
}