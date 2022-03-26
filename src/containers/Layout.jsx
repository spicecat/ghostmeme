import { Outlet } from 'react-router-dom'
import { Paper } from '@material-ui/core'
import { Navbar, MemeSearch } from '../components'

export default function Layout({ user, mentions, receivedChatsMemes, friendsMemes }) {
  return <div className='body'>
    <Navbar {...{ user, mentions }} />
    <Paper className='paper' elevation={5}>
      {user.loading === undefined && receivedChatsMemes && friendsMemes && <MemeSearch {...{ receivedChatsMemes, friendsMemes }} />}
      <br /><br />
      <Outlet />
    </Paper>
  </div>
}