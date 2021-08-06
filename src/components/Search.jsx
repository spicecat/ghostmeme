import { useState, useEffect } from 'react'

import PaginatedTable from '../components/PaginatedTable'
import Form from '../components/Form'

export default function Search({ name, headCells, action, schema, Component, update, refresh = false, show = true }) {
    const [timer, setTimer] = useState()

    const [data, setData] = useState([])
    const [query, setQuery] = useState()

    const updateData = () => {
        clearTimeout(timer)
        const getData = async () => {
            console.log('Updating', name)
            setData(await action(query) || data)
        }
        if (show) {
            getData()
            if (refresh) setTimer(setInterval(getData, 7500))
        }
    }

    useEffect(updateData, [query, show])

    return show && <>
        <Form name={name} action={setQuery} schema={schema} search={true} />
        <br />
        <PaginatedTable name={name} headCells={headCells} data={data} Component={Component} update={update} />
    </>
}