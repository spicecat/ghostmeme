import { useState, useEffect } from 'react'

import { redirect, getUsers, getFriendRequests } from '../services/userService'

// import UsersTable from '../components/UsersTable'
import PaginatedTable from '../components/PaginatedTable'
import User from '../components/User'


export default function Friends({ user }) {
    useEffect(() => { redirect(user) }, [user])

    const [users, setUsers] = useState([])
    const [outgoingFriendRequests, setOutgoingFriendRequests] = useState([])
    const [incomingFriendRequests, setIncomingFriendRequests] = useState([])

    const updateUsers = async () => {
        setUsers(await getUsers())
        if (user.loading === undefined) {
            setOutgoingFriendRequests(await getFriendRequests(user.user_id, 'outgoing'))
            setIncomingFriendRequests(await getFriendRequests(user.user_id, 'incoming'))
        }
    }

    useEffect(() => {
        updateUsers()
    }, [user])

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
                Component={User} localUser={{ ...user, outgoingFriendRequests, incomingFriendRequests }} />
        </>
}