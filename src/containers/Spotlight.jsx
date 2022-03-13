import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react'
import { Button, Paper } from '@material-ui/core'
import { SpotlightComponent } from '../components'
import { getMemes } from '../services/memeService'
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const defaultProps = {
  color: 'secondary',
  children: <MailIcon />,
};

// export default function Spotlight({ user, friends, storyMemes, updateMemes, updateLikes }) {
export default function Spotlight({ user, updateMemes, updateLikes }) {
  const [memes, setMemes] = useState([])
  const classes = useStyles();
  const [users, setUsers] = useState()
  const [selectedUser, setSelectedUser] = useState(user.user_id)
  const [selectedUserInfo, setSelectedUserInfo] = useState(user)

  const getStory = async () => {
    console.log('Updating Spotlight')
    setMemes(await getMemes({
      "private": false,
      "receiver": null,
      "replyTo": null,
    }) || [])
    // setMemes(storyMemes[selectedUser] || [])
  }

  //   useEffect(getStory, [selectedUserInfo, storyMemes])
  useEffect(() => {
    let timer = setInterval(() => {
      getStory()
    }, 4000)
    return () => { clearTimeout(timer) }
  }, [])

  return (
    <div className={classes.root}>
      <h1 id='t1'>Trending Hashtags</h1>
      <div id="sp1">
        <Grid container spacing={5}>
          <Badge badgeContent={99} {...defaultProps}><Grid item xs={2.4}>
            <Paper className={classes.paper}>#dondeEstaDonda</Paper>
          </Grid>
          </Badge>
          <Badge badgeContent={99} {...defaultProps}><Grid item xs={2.4}>
            <Paper className={classes.paper}>#dogecoin</Paper>
          </Grid>
          </Badge>
          <Badge badgeContent={99} {...defaultProps}><Grid item xs={2.4}>
            <Paper className={classes.paper}>#backToSchool</Paper>
          </Grid>
          </Badge>
          <Badge badgeContent={99} {...defaultProps}><Grid item xs={2.4}>
            <Paper className={classes.paper}>#tgif</Paper>
          </Grid>
          </Badge>
          <Badge badgeContent={99} {...defaultProps}><Grid item xs={2.4}>
            <Paper className={classes.paper}>#fitness</Paper>
          </Grid>
          </Badge>
        </Grid>
      </div>
      <br></br>
      <hr />
      <Paper className='paper' elevation={3}>
        {/* <SpotlightComponent {...{ user: selectedUserInfo, memes, updateMemes, updateLikes, local_id: user.user_id }} /> */}
        <SpotlightComponent {...{ user: selectedUserInfo, memes, updateMemes, updateLikes }} />
      </Paper>
    </div>

  );





  return
}