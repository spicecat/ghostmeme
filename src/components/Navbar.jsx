import { Link, useHistory } from 'react-router-dom'
import { AppBar, Avatar, Button, IconButton, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import { logout } from '../services/userService'

export default function Navbar({ page, user: { username, loading, imageUrl } }) {
    const history = useHistory()

    return (
        <AppBar position='static'>
            <Toolbar variant='dense'>
                <IconButton color='inherit' className='menu-button' onClick={() => history.push('/')}>
                    <MenuIcon />
                </IconButton>
                &nbsp;
                <Typography>{page}</Typography>
                <>
                    <Button color='inherit' variant='outlined' size='small' to='/spotlight' component={Link}>Spotlight</Button>&nbsp;
                    <Button color='inherit' variant='outlined' size='small' to='/chats' component={Link}>Chats</Button>&nbsp;
                    <Button color='inherit' variant='outlined' size='small' to='/stories' component={Link}>Stories</Button>&nbsp;
                    <Button color='inherit' variant='outlined' size='small' to='/notifications' component={Link}>Notifications</Button>&nbsp;
                    <Button color='inherit' variant='outlined' size='small' to='/friends' component={Link}>Friends</Button>&nbsp;
                    <Button color='inherit' variant='outlined' size='small' to='/myprofile' component={Link}>Profile</Button>&nbsp;
                </>
                <span className='user-control' />
                {loading || username ?
                    <>
                        <Typography>Logged in as: {username}</Typography>
                        &nbsp;&nbsp;&nbsp;
                        <Avatar alt={username} src={imageUrl} />
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