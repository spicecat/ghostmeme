import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'

import Alert from './Alert'

const useStyles = makeStyles(theme => ({
    login: {
        margin: 'auto',
        padding: theme.spacing(2)
    }
}))

export default function PaperContent({ Component }) {
    const classes = useStyles()

    const [statusCode, setStatusCode] = useState(100)

    useEffect(() => {
        if ([201, 202].includes(statusCode)) window.location.href = '/'
    }, [statusCode])

    return (
        <Paper className={classes.login}>
            <Alert statusCode={statusCode} />
            <br />
            {Component(setStatusCode)}
        </Paper>
    )
}