import { useState, useEffect } from 'react'

import { redirect, getUsers, getFriendRequests } from '../services/userService'

// import UsersTable from '../components/UsersTable'
import PaginatedTable from '../components/PaginatedTable'
import User from '../components/User'


export default function Friends({ user }) {
    useEffect(() => { redirect(user) }, [user])

    const [users, setUsers] = useState([])
    const [friendRequests, setFriendRequests] = useState([])

    const updateUsers = async () => {
        setUsers(await getUsers())
        setFriendRequests(await getFriendRequests(user.user_id))
    }

    useEffect(() => {
        updateUsers()
    }, [])

    return user.loading === undefined &&
        <>
            <PaginatedTable
                name='friends'
                headCells={[
                    { name: 'Username', prop: 'username' },
                    { name: 'Email', prop: 'email' },
                    { name: 'Phone', prop: 'phone' },
                    { name: 'Friends', prop: 'friends' },
                    { name: 'Likes', prop: 'liked' },
                    { name: 'Profile Picture', prop: 'imageUrl' }]}
                data={users}
                Component={User} localUser={{ ...user, friendRequests }} />
        </>
}