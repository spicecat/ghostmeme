import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'

import Alert from './Alert'

const useStyles = makeStyles(theme => ({
    login: {
        margin: 'auto',
        padding: theme.spacing(2),
        width: theme.spacing(32),
    }
}))

export default function PaperContent({ Component, ...props }) {
    const classes = useStyles()

    const [statusCode, setStatusCode] = useState(100)
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('Error')

    useEffect(() => {
        if ([201, 202].includes(statusCode)) window.location.href = '/'
        else if (statusCode !== 100) { // don't show Alert on mount and reset
            setMsg({ 400: 'Bad Request', 401: 'Incorrect username or password', 409: 'Username Taken' }[statusCode] || 'Error')
            setOpen(true)
        }
    }, [statusCode])

    // reset statusCode
    useEffect(() => {
        if (!open) setStatusCode(100)
    }, [open])
    return (
        <Paper className={classes.login}>
            <Alert open={open} type='error' msg={msg} setOpen={setOpen} />
            <br />
            <Component {...props} action={async values => { setStatusCode(await props.action(values)) }} />
        </Paper>
    )
}