import React from 'react'
import { Typography } from '@material-ui/core'

import Search from '../components/Search'

export default function Home() {
    return (
        <>
            <Search />
            <Typography>Welcome to Ghostmeme! </Typography>
        </>
    )
}