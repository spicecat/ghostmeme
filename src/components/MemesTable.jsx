import { useState, useEffect } from 'react'
import { Table, TableHead, TableBody, TableFooter, TableRow, TableSortLabel, TableCell, TablePagination } from '@material-ui/core'

import Meme from './Meme'

export default function MemesTable({ headCells = [
    { name: 'Owner', prop: 'owner' },
    { name: 'Created At', prop: 'createdAt' },
    { name: 'Description', prop: 'description' },
    { name: 'Image', prop: 'image' },
    { name: 'Likes', prop: 'likes' }
], memes }) {

    const [orderedMemes, setOrderedMemes] = useState(memes)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const changePage = (event, newPage) => { setPage(newPage) }
    const changeRowsPerPage = event => {
        setRowsPerPage(Number(event.target.value))
        setPage(0)
    }

    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState(headCells[1].prop)

    const changeOrder = (event, prop) => {
        const newOrder = orderBy === prop && order === 'desc' ? 'asc' : 'desc'
        setOrder(newOrder)
        setOrderBy(prop)
        sortMemes(newOrder, prop)
    }
    const sortMemes = (ord, ordBy) => {
        const arr = memes
        arr.sort((a, b) => (ord === 'asc' ? 1 : -1) * (a[ordBy] < b[ordBy] ? 1 : -1))
        setOrderedMemes(arr)
    }

    useEffect(() => { sortMemes() }, [memes])

    return (
        <Table size='small'>
            <TableHead onRequestSort={changeOrder}>
                <TableRow>
                    {headCells.map(headCell => (
                        <TableCell
                            key={headCell.prop}
                            padding='none'
                            sortDirection={orderBy === headCell.prop && order}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.prop}
                                direction={orderBy === headCell.prop ? order : 'asc'}
                                onClick={event => changeOrder(event, headCell.prop)}
                            >
                                {headCell.name}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {orderedMemes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
        </Table >
    )
}