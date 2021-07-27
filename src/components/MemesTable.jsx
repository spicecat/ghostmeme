import { useState } from 'react'
import { Table, TableHead, TableBody, TableFooter, TableRow, TableCell, TablePagination } from '@material-ui/core'

import Meme from './Meme'

export default function MemesTable({ categories, memes }) {

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const changePage = (event, newPage) => { setPage(newPage) }
    const changeRowsPerPage = event => {
        setRowsPerPage(Number(event.target.value))
        setPage(0)
    }

    return (
        <Table size='small'>
            <TableHead>
                <TableRow>
                    {categories.map(cat =>
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
    )
}