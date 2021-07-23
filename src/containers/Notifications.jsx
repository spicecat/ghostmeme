import React from 'react'

import Form from '../components/Form'
import PaperContent from '../components/Paper'
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button'


export const Notifications = () => {
    return (
        <>
        Notifications
        <Alert variant="filled" severity="error">
            This is an error alert — check it out!
        </Alert>
        <Alert variant="filled" severity="warning">
            This is a warning alert — check it out!
        </Alert>
        <Alert variant="filled" severity="info">
            This is an info alert — check it out!
        </Alert>
        <Alert variant="filled" severity="success">
            This is a success alert — check it out!
        </Alert>
        </>
    )
}

export default Notifications