import { useState, useEffect } from 'react'

import Search from '../components/Search'
import User from '../components/User'

import { deleteFromArray } from '../var.js'
import { getUsers, searchUsers, sendFriendRequest, removeFriendRequest, addFriend, removeFriend } from '../services/userService'
import { userSearchSchema } from '../services/schemas'

export default function Friends({ user: { user_id }, friends, outgoingFriendRequests, incomingFriendRequests, setFriends, setOutgoingFriendRequests, setIncomingFriendRequests }) {
    const [users, setUsers] = useState()

    const loadUsers = async () => { setUsers(await getUsers()) }

    const updateUsers = async query => searchUsers(users, query)

    useEffect(() => { loadUsers() }, [])

    const getStatus = target_id => {
        if (target_id in friends) return 'Remove Friend'
        else if (incomingFriendRequests.includes(target_id)) return 'Accept Friend'
        else if (outgoingFriendRequests.includes(target_id)) return 'Pending'
        else return 'Add Friend'
    }

    const updateStatus = async (target_id, status, setStatus) => {
        if (status === 'Add Friend') {
            setStatus('Pending')
            if (await sendFriendRequest(user_id, target_id)) {
                outgoingFriendRequests.push(target_id)
                setOutgoingFriendRequests(outgoingFriendRequests)
                return
            }
        }
        else if (status === 'Pending') {
            setStatus('Add Friend')
            if (await removeFriendRequest(user_id, target_id)) {
                deleteFromArray(outgoingFriendRequests, target_id)
                setOutgoingFriendRequests(outgoingFriendRequests)
                return
            }
        }
        else if (status === 'Accept Friend') {
            setStatus('Remove Friend')
            if (await addFriend(user_id, target_id)) {
                friends[target_id] = users.find(o => o.user_id === target_id).username
                setFriends(friends)
                delete incomingFriendRequests[target_id]
                setIncomingFriendRequests(incomingFriendRequests)
                return
            }
        }
        else if (status === 'Remove Friend') {
            setStatus('Add Friend')
            if (await removeFriend(user_id, target_id)) {
                delete friends[target_id]
                setFriends(friends)
                return
            }
        }
        else {
            setStatus(getStatus(target_id))
            return
        }
        setStatus(status)
    }

    return users ?
        <Search
            name='Users'
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
            update={updateStatus}
        /> : null
}