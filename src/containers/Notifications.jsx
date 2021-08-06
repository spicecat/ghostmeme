import { useEffect } from 'react'

import { List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}))

export default function Notifications({ user }) {
    const classes = useStyles()



    return <>
        <div id='notifications'>
            <h1>Notifications</h1>
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
    </>
}