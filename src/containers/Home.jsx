import React from 'react'
import { Typography } from '@material-ui/core'

import PaperContent from '../components/Paper'

export const Home = () => {
    const LoginContent = () =>
        <>
            <Typography>Welcome to Ghostmeme! </Typography>
        </>

    return (
        <PaperContent Component={LoginContent} />
    )
}

export default Home