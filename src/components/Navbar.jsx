import React from 'react'
import { Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, IconButton, Button, Avatar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import { logout } from '../services/userService'

const useStyles = makeStyles(theme => ({
    menuButton: { marginRight: theme.spacing(2) },
    userControl: { marginLeft: 'auto' }
}))

export default function Navbar({ page, username, avatar }) {
    const classes = useStyles()

    return (
        <AppBar position='static'>
            <Toolbar variant='dense'>
                <IconButton color='inherit' className={classes.menuButton}>
                    <MenuIcon />
                </IconButton>
                &nbsp;
                <Typography>{page}</Typography>
                <>
                    <Button color='inherit' variant='outlined' size='small' to='/chats' component={Link}>Chats</Button>&nbsp;
                    <Button color='inherit' variant='outlined' size='small' to='/stories' component={Link}>Stories</Button>&nbsp;
                    <Button color='inherit' variant='outlined' size='small' to='/notifications' component={Link}>Notifications</Button>&nbsp;
                </>
                <span className={classes.userControl} />
                {username ?
                    <>
                        <Typography>Logged in as: {username}</Typography>
                        &nbsp;&nbsp;&nbsp;
                        <Avatar alt={username} />
                        &nbsp;&nbsp;&nbsp;
                        <Button color='inherit' variant='outlined' size='small' onClick={logout}>Logout</Button>
                    </> :
                    <>
                        <Button color='inherit' variant='outlined' size='small' to='/register' component={Link}>Register</Button>&nbsp;
                        <Button color='inherit' variant='outlined' size='small' to='/login' component={Link}>Login</Button>
                    </>}
            </Toolbar>
        </AppBar >

    )
}