import { useState, useEffect } from 'react'

import { redirect, getUsers } from '../services/userService'

// import UsersTable from '../components/UsersTable'
import MemesTable from '../components/Table'
import User from '../components/User'


export default function Friends({ user }) {
    useEffect(() => { redirect(user) }, [user])

    const [users, setUsers] = useState([])

    const updateUsers = async () => {
        setUsers(await getUsers())
    }

    useEffect(() => {
        updateUsers()
    }, [])

    return user.loading === undefined &&
        <>
            <MemesTable
                headCells={[
                    { name: 'Username', prop: 'username' },
                    { name: 'Email', prop: 'email' },
                    { name: 'Phone', prop: 'phone' },
                    { name: 'Friends', prop: 'friends' },
                    { name: 'Likes', prop: 'liked' },
                    { name: 'Profile Picture', prop: 'imageUrl' }]}
                memes={users}
                Component={User} />
        </>
}