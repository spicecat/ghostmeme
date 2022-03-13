import { useState, useEffect } from 'react'

import { PaginatedTable, Form } from '../components'

export default function Search({ name, headCells, action, schema, Component, update }) {
    const [data, setData] = useState([])
    const [query, setQuery] = useState()

    const updateData = async () => {
        setData(await action(query) || data)
    }
    useEffect(() => updateData(), [query])

    return <>
        <Form {...{ name, action: setQuery, schema, search: true }} />
        <br />
        <PaginatedTable {...{ name, headCells, data, Component, update }} />
    </>
}