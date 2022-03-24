import { Outlet } from 'react-router-dom'
import { Paper } from '@material-ui/core'
import { Navbar } from '../components'

export default function Layout() {
  return <div className='body'>
      <Navbar />
      <Paper className='paper' elevation={5}>
        <Outlet />
      </Paper>
  </div>
}