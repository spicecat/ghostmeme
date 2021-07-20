import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
}))

export default function Navbar({ page }) {
    const classes = useStyles()
    return (
        <AppBar position='static'>
            <Toolbar variant='dense'>
                <IconButton color='inherit' className={classes.menuButton}>
                    <MenuIcon />
                </IconButton>
                <Typography className={classes.menuButton}>
                    {page}
                </Typography>
            </Toolbar>
        </AppBar >

    )
}