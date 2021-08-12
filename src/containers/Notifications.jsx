import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PaginatedTable from '../components/PaginatedTable'
import User from '../components/User'

import { getUsers, removeFriendRequest, addFriend } from '../services/userService'

export default function Notifications({ user: { user_id }, incomingFriendRequests, mentions }) {
    const [users, setUsers] = useState()
    const loadUsers = async () => { setUsers(await getUsers()) }
    useEffect(() => { loadUsers() }, [])
    const [friendNotifications, setFriendNotifications] = useState(incomingFriendRequests)

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }))
    const classes = useStyles()
    const updateStatus = async (target_id, status, setStatus) => {
        if (status === 'Accept Friend') {
            if (await addFriend(user_id, target_id)) {
                delete friendNotifications[target_id]
                setFriendNotifications(friendNotifications)
                return
            }
        }
        else if (status === 'Reject Friend') {
            if (await removeFriendRequest(user_id, target_id)) {
                delete friendNotifications[target_id]
                setFriendNotifications(friendNotifications)
                return
            }
        }
        else {
            setStatus('Accept Friend')
            return
        }
    }

    return <>
        Incoming Friend Requests
        {users ? <PaginatedTable
            name='Incoming Friend Requests'
            headCells={[
                { name: 'Profile Picture', prop: 'imageUrl' },
                { name: 'Username', prop: 'username' },
                { name: 'Email', prop: 'email' },
                { name: 'Phone', prop: 'phone' },
                { name: 'Friends', prop: 'friends' },
                { name: 'Likes', prop: 'liked' }]}
            data={users.filter(({ user_id }) => incomingFriendRequests.includes(user_id))}
            Component={User}
            update={updateStatus}
        /> : null}

        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <h2>Chat Notifications</h2>
                        <hr />
                        <div id='notifications'>
                            <h2>Just Now</h2>
                            <div className={classes.root}>
                                <List className={classes.root}>
                                    <Alert severity='success'><ListItem alignItems='flex-start'>
                                        <ListItemAvatar>
                                            <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary='Brunch this weekend?'
                                            secondary={
                                                <>
                                                    <Typography
                                                        component='span'
                                                        variant='body2'
                                                        className={classes.inline}
                                                        color='textPrimary'
                                                    >
                                                        Ali Connors
                                                    </Typography>
                                                    — I'll be in your neighborhood doing errands this...
                                                </>
                                            }
                                        />
                                    </ListItem></Alert>
                                    <Divider variant='inset' component='li' />
                                    <Alert severity='success'>
                                        <ListItem alignItems='flex-start'>
                                            <ListItemAvatar>
                                                <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary='Summer BBQ'
                                                secondary={
                                                    <>
                                                        <Typography
                                                            component='span'
                                                            variant='body2'
                                                            className={classes.inline}
                                                            color='textPrimary'
                                                        >
                                                            to Scott, Alex, Jennifer
                                                        </Typography>
                                                        — Wish I could come, but I'm out of town this...
                                                    </>
                                                }
                                            />
                                        </ListItem></Alert>
                                    <Divider variant='inset' component='li' />
                                    <Alert severity='success'><ListItem alignItems='flex-start'>
                                        <ListItemAvatar>
                                            <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary='Oui Oui'
                                            secondary={
                                                <>
                                                    <Typography
                                                        component='span'
                                                        variant='body2'
                                                        className={classes.inline}
                                                        color='textPrimary'
                                                    >
                                                        Sandra Adams
                                                    </Typography>
                                                    {' — Do you have Paris recommendations? Have you ever…'}
                                                </>
                                            }
                                        />
                                    </ListItem></Alert>
                                    <Divider variant='inset' component='li' />
                                    <Alert severity='success'><ListItem alignItems='flex-start'>
                                        <ListItemAvatar>
                                            <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary='Oui Oui'
                                            secondary={
                                                <>
                                                    <Typography
                                                        component='span'
                                                        variant='body2'
                                                        className={classes.inline}
                                                        color='textPrimary'
                                                    >
                                                        Travis Scott
                                                    </Typography> —
                                                    {'  Do you wanna get on this new song on my UTOPIA album?'}
                                                </>
                                            }
                                        />
                                    </ListItem></Alert>
                                </List>

                            </div>
                            <h2>5 Minutes Ago</h2>
                            <hr />
                            <div className={classes.root}>
                                <List className={classes.root}>
                                    <Alert severity='info'><ListItem alignItems='flex-start'>
                                        <ListItemAvatar>
                                            <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary='Brunch this weekend?'
                                            secondary={
                                                <>
                                                    <Typography
                                                        component='span'
                                                        variant='body2'
                                                        className={classes.inline}
                                                        color='textPrimary'
                                                    >
                                                        Ali Connors
                                                    </Typography>
                                                    — I'll be in your neighborhood doing errands this...
                                                </>
                                            }
                                        />
                                    </ListItem></Alert>
                                    <Divider variant='inset' component='li' />
                                    <Alert severity='info'>
                                        <ListItem alignItems='flex-start'>
                                            <ListItemAvatar>
                                                <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary='Summer BBQ'
                                                secondary={
                                                    <>
                                                        <Typography
                                                            component='span'
                                                            variant='body2'
                                                            className={classes.inline}
                                                            color='textPrimary'
                                                        >
                                                            to Scott, Alex, Jennifer
                                                        </Typography>
                                                        — Wish I could come, but I'm out of town this...
                                                    </>
                                                }
                                            />
                                        </ListItem></Alert>
                                    <Divider variant='inset' component='li' />
                                    <Alert severity='info'><ListItem alignItems='flex-start'>
                                        <ListItemAvatar>
                                            <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary='Oui Oui'
                                            secondary={
                                                <>
                                                    <Typography
                                                        component='span'
                                                        variant='body2'
                                                        className={classes.inline}
                                                        color='textPrimary'
                                                    >
                                                        Sandra Adams
                                                    </Typography>
                                                    {' — Do you have Paris recommendations? Have you ever…'}
                                                </>
                                            }
                                        />
                                    </ListItem></Alert>
                                    <Divider variant='inset' component='li' />
                                    <Alert severity='info'><ListItem alignItems='flex-start'>
                                        <ListItemAvatar>
                                            <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary='Oui Oui'
                                            secondary={
                                                <>
                                                    <Typography
                                                        component='span'
                                                        variant='body2'
                                                        className={classes.inline}
                                                        color='textPrimary'
                                                    >
                                                        Travis Scott
                                                    </Typography> —
                                                    {'  Do you wanna get on this new song on my UTOPIA album?'}
                                                </>
                                            }
                                        />
                                    </ListItem></Alert>
                                </List>

                            </div>

                            <h2>1 Hour Ago</h2>
                            <hr />
                            <div className={classes.root}>
                                <List className={classes.root}>
                                    <Alert severity='warning'><ListItem alignItems='flex-start'>
                                        <ListItemAvatar>
                                            <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary='Brunch this weekend?'
                                            secondary={
                                                <>
                                                    <Typography
                                                        component='span'
                                                        variant='body2'
                                                        className={classes.inline}
                                                        color='textPrimary'
                                                    >
                                                        Ali Connors
                                                    </Typography>
                                                    — I'll be in your neighborhood doing errands this...
                                                </>
                                            }
                                        />
                                    </ListItem></Alert>
                                    <Divider variant='inset' component='li' />
                                    <Alert severity='warning'>
                                        <ListItem alignItems='flex-start'>
                                            <ListItemAvatar>
                                                <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary='Summer BBQ'
                                                secondary={
                                                    <>
                                                        <Typography
                                                            component='span'
                                                            variant='body2'
                                                            className={classes.inline}
                                                            color='textPrimary'
                                                        >
                                                            to Scott, Alex, Jennifer
                                                        </Typography>
                                                        — Wish I could come, but I'm out of town this...
                                                    </>
                                                }
                                            />
                                        </ListItem></Alert>
                                    <Divider variant='inset' component='li' />
                                    <Alert severity='warning'><ListItem alignItems='flex-start'>
                                        <ListItemAvatar>
                                            <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary='Oui Oui'
                                            secondary={
                                                <>
                                                    <Typography
                                                        component='span'
                                                        variant='body2'
                                                        className={classes.inline}
                                                        color='textPrimary'
                                                    >
                                                        Sandra Adams
                                                    </Typography>
                                                    {' — Do you have Paris recommendations? Have you ever…'}
                                                </>
                                            }
                                        />
                                    </ListItem></Alert>
                                    <Divider variant='inset' component='li' />
                                    <Alert severity='warning'><ListItem alignItems='flex-start'>
                                        <ListItemAvatar>
                                            <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary='Oui Oui'
                                            secondary={
                                                <>
                                                    <Typography
                                                        component='span'
                                                        variant='body2'
                                                        className={classes.inline}
                                                        color='textPrimary'
                                                    >
                                                        Travis Scott
                                                    </Typography> —
                                                    {'  Do you wanna get on this new song on my UTOPIA album?'}
                                                </>
                                            }
                                        />
                                    </ListItem></Alert>
                                </List>

                            </div>

                            <h2>Over 1 Day Ago</h2>
                            <hr />
                            <div className={classes.root}>
                                <List className={classes.root}>
                                    <Alert severity='error'><ListItem alignItems='flex-start'>
                                        <ListItemAvatar>
                                            <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary='Brunch this weekend?'
                                            secondary={
                                                <>
                                                    <Typography
                                                        component='span'
                                                        variant='body2'
                                                        className={classes.inline}
                                                        color='textPrimary'
                                                    >
                                                        Ali Connors
                                                    </Typography>
                                                    — I'll be in your neighborhood doing errands this...
                                                </>
                                            }
                                        />
                                    </ListItem></Alert>
                                    <Divider variant='inset' component='li' />
                                    <Alert severity='error'>
                                        <ListItem alignItems='flex-start'>
                                            <ListItemAvatar>
                                                <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary='Summer BBQ'
                                                secondary={
                                                    <>
                                                        <Typography
                                                            component='span'
                                                            variant='body2'
                                                            className={classes.inline}
                                                            color='textPrimary'
                                                        >
                                                            to Scott, Alex, Jennifer
                                                        </Typography>
                                                        — Wish I could come, but I'm out of town this...
                                                    </>
                                                }
                                            />
                                        </ListItem></Alert>
                                    <Divider variant='inset' component='li' />
                                    <Alert severity='error'><ListItem alignItems='flex-start'>
                                        <ListItemAvatar>
                                            <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary='Oui Oui'
                                            secondary={
                                                <>
                                                    <Typography
                                                        component='span'
                                                        variant='body2'
                                                        className={classes.inline}
                                                        color='textPrimary'
                                                    >
                                                        Sandra Adams
                                                    </Typography>
                                                    {' — Do you have Paris recommendations? Have you ever…'}
                                                </>
                                            }
                                        />
                                    </ListItem></Alert>
                                    <Divider variant='inset' component='li' />
                                    <Alert severity='error'><ListItem alignItems='flex-start'>
                                        <ListItemAvatar>
                                            <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary='Oui Oui'
                                            secondary={
                                                <>
                                                    <Typography
                                                        component='span'
                                                        variant='body2'
                                                        className={classes.inline}
                                                        color='textPrimary'
                                                    >
                                                        Travis Scott
                                                    </Typography> —
                                                    {'  Do you wanna get on this new song on my UTOPIA album?'}
                                                </>
                                            }
                                        />
                                    </ListItem></Alert>
                                </List>

                            </div>
                        </div>
                    </Paper>
                </Grid>


                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <h2>Story Notifications</h2>
                        <hr />
                        <List className={classes.root}>
                            <h2>Just Now</h2>
                            <Alert severity='success'><ListItem alignItems='flex-start'></ListItem>
                                <img class="notiImage" src="https://img.devrant.com/devrant/rant/r_1000583_QudMG.jpg" alt="sample meme1" />
                                <p>Sent From: friend2</p>
                            </Alert></List>
                        <hr />
                        <br />
                        <List className={classes.root}>
                            <h2>5 Minutes Ago</h2>
                            <Alert severity='info'><ListItem alignItems='flex-start'></ListItem>
                                <img class="notiImage" src="https://wyncode.co/uploads/2014/08/41-726x940.jpg" alt="sample meme2" />
                                <p>Sent From: friend2</p>
                            </Alert></List>
                        <hr />
                        <br />
                        <List className={classes.root}>
                            <h2>Over 1 Hour Ago</h2>
                            <Alert severity='warning'><ListItem alignItems='flex-start'></ListItem>
                                <img class="notiImage" src="https://pics.me.me/cs-students-im-not-afraid-you-will-be-experienced-devs-41856534.png" alt="sample meme3" />
                                <p>Sent From: friend2</p>
                            </Alert></List>
                        <hr />
                        <br />
                        <List className={classes.root}>
                            <h2>Over 1 Day Ago</h2>
                            <Alert severity='error'><ListItem alignItems='flex-start'></ListItem>
                                <img class="notiImage" src="https://preview.redd.it/isyu86r7sor21.png?width=960&crop=smart&auto=webp&s=09374de7fa093e6d12aecf6b5f4085c221941230" alt="sample meme4" />
                                <p>Sent From: friend2</p>
                            </Alert></List>

                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <h2>Security Notifications</h2>
                        <hr />
                        <div className={classes.root}>
                            <Alert severity="success">image2 user, successfully changed their email!</Alert>
                            <Alert severity="success">image2 user, successfully changed their phone number!</Alert>
                            <Alert severity="success">image2 user, successfully changed their password!</Alert>
                            <Alert severity="info">User image2 has logged on from IP Address 192.168.1.4</Alert>

                        </div>

                    </Paper>
                </Grid>
            </Grid>
        </div>
    </>
}