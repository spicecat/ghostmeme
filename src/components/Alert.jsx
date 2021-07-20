import React from 'react'
import MuiAlert from '@material-ui/lab/Alert'

export default function Alert({ open, type, msg, setOpen }) {
    return (
        open && <MuiAlert onClose={() => setOpen(false)} elevation={6} severity={type}>{msg}</MuiAlert>
    )
}