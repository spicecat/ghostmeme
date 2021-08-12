import { useState, useEffect } from 'react'
import { useTrackedState } from 'reactive-react-redux'

import { List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

import PaginatedTable from '../components/PaginatedTable'
import User from '../components/User'

import { getUsers, removeFriendRequest, addFriend } from '../services/userService'

export default function Notifications() {
    const state = useTrackedState()
    const { user: { user_id }, incomingFriendRequests, mentions } = state

    const [users, setUsers] = useState()
    const loadUsers = async () => { setUsers(await getUsers()) }

    useEffect(() => { loadUsers() }, [])

    const [friendNotifications, setFriendNotifications] = useState(incomingFriendRequests)

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
    </>
}