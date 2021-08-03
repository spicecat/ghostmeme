import { useState, useEffect } from 'react'
import { Table, TableHead, TableBody, TableFooter, TableRow, TableSortLabel, TableCell, TablePagination } from '@material-ui/core'

export default function PaginatedTable({ name, headCells = [
    { name: 'Owner', prop: 'owner' },
    { name: 'Created At', prop: 'createdAt' },
    { name: 'Description', prop: 'description' },
    { name: 'Image', prop: 'image' },
    { name: 'Likes', prop: 'likes' }
], data, Component, update }) {

    const [orderedMemes, setOrderedMemes] = useState(data)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const [order, setOrder] = useState('desc')
    const [orderBy, setOrderBy] = useState(headCells[1].prop)

    const changePage = (event, newPage) => { setPage(newPage) }
    const changeRowsPerPage = event => {
        setRowsPerPage(Number(event.target.value))
        setPage(0)
    }

    const changeOrder = (event, prop) => {
        const newOrder = orderBy === prop && order === 'desc' ? 'asc' : 'desc'
        setOrder(newOrder)
        setOrderBy(prop)
        sortMemes(newOrder, prop)
    }
    const sortMemes = (ord = order, ordBy = orderBy) => {
        const arr = data, type = typeof (data[0][ordBy])
        console.log(data[0], type)
        const compare = (a, b) => a > b ? 1 : -1
        arr.sort((a, b) => type === 'string' ? compare(a[ordBy].toUpperCase(), b[ordBy].toUpperCase()) : compare(a[ordBy], b[ordBy]))
        if (ord === 'desc') arr.reverse()
        setOrderedMemes(arr)
    }

    useEffect(() => { if (data.length) sortMemes() }, [data])
    // onRequestSort={changeOrder}
    return (
        <Table size='small'>
            <TableHead>
                <TableRow>
                    {headCells.map(headCell => (
                        <TableCell
                            key={name + headCell.prop}
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
                    .map(item => <Component key={item.meme_id || item.user_id} {...item} {...{ update }} />)}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        count={data.length}
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