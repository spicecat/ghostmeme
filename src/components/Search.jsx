import { useState, useEffect } from 'react'

import PaginatedTable from '../components/PaginatedTable'
import Form from '../components/Form'

export default function Search({ name, action, schema, Component, refresh = false }) {
    const [timer, setTimer] = useState()

    const [data, setData] = useState([])
    const [search, setSearch] = useState()

    const updateData = () => {
        clearTimeout(timer)
        const getData = async () => {
            console.log('Updating', name)
            setData(await action(search) || data)
        }
        getData()
        if (refresh) setTimer(setInterval(getData, 7500))
    }

    useEffect(updateData, [search])

    return <>
        <Form name={name} action={setSearch} schema={schema} search={true} />
        <br />
        <PaginatedTable name={name} data={data} Component={Component} />
    </>
}