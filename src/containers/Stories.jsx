import { useState, useEffect } from 'react'
import { Paper, Typography } from '@material-ui/core'

import Story from '../components/Story'
import Search from '../components/Search'

export default function Stories({ user, friends, likes, updateLikes }) {

  // const updateUsers = async query => searchUsers(friends, query)


  return <Paper className='paper' elevation={3}>
    <Story user={user} likes={likes} updateLikes={updateLikes} />
    {/* {
      friends && <Search
        name='users'
        headCells={[
          { name: 'Profile Picture', prop: 'imageUrl' },
          { name: 'Username', prop: 'username' },
          { name: 'Email', prop: 'email' },
          { name: 'Phone', prop: 'phone' },
          { name: 'Friends', prop: 'friends' },
          { name: 'Likes', prop: 'liked' }]}
        action={updateUsers}
        schema={userSearchSchema}
        Component={User}
        update={updateSelectedUser}
      />
    } */}
  </Paper>
}