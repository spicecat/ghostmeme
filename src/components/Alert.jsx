import React, { useState, useEffect } from 'react'
import MuiAlert from '@material-ui/lab/Alert'

import { getLoginTimeout, getLoginAttempts } from '../services/userService'

export default function Alert({ msg = 'Error', type = 'error', statusCode }) {
    const [open, setOpen] = useState(false)
    const [severity, setType] = useState(type)
    const [message, setMsg] = useState(msg)

    const formatTime = time => `${Math.floor(time / 60000)} minutes, ${Math.floor((time % 60000) / 1000)} seconds`

    useEffect(() => { // update message
        if (statusCode === 102) return
        else if (statusCode === 100) setOpen(false)
        else if ([201, 202].includes(statusCode)) {
            setType('success')
            setMsg('Success!')
        }
        else {
            setType('error')
            setMsg({
                400: 'Bad Request',
                401: `Incorrect username or password. ${3 - getLoginAttempts()} attempts remaining`,
                403: `0 login attempts remain. Try again in ${formatTime(getLoginTimeout())}`,
                409: 'Username or email taken',
                501: 'Not Implemented'
            }[statusCode] || 'Error')
            setOpen(true)
        }
    }, [statusCode])

    return (
        open && <MuiAlert onClose={() => { setOpen(false) }} elevation={6} severity={severity}>{message}</MuiAlert>
    )
}