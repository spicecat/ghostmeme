import React, { useState, useEffect } from 'react'

import { redirect, getUsers, sendFriendRequest, removeFriendRequest, addFriend, removeFriend } from '../services/userService'

import PaginatedTable from '../components/PaginatedTable'
import User from '../components/User'

export default function Friends({ user, updateUser }) {
    useEffect(() => { redirect(user) }, [user])

    const [users, setUsers] = useState([])

    const updateUsers = async () => {
        setUsers(await getUsers())
        if (user.loading === undefined) await updateUser()
    }

    useEffect(() => { updateUsers() }, [])

    let { user_id, friends, outgoingFriendRequests, incomingFriendRequests } = user

    const getStatus = target_id => {
        if (target_id in friends) return 'Remove Friend'
        else if (incomingFriendRequests.includes(target_id)) return 'Accept Friend'
        else if (outgoingFriendRequests.includes(target_id)) return 'Pending'
        else return 'Add Friend'
    }

    const updateStatus = async (target_id, status, setStatus) => {
        const deleteFromArray = (arr, e) => arr.splice(arr.indexOf(e), 1)
        let response = false

        if (status === 'Add Friend') {
            setStatus('Pending')
            response = await sendFriendRequest(user_id, target_id)
            if (response) outgoingFriendRequests.push(target_id)
        }
        else if (status === 'Pending') {
            setStatus('Add Friend')
            response = await removeFriendRequest(user_id, target_id)
            if (response) deleteFromArray(outgoingFriendRequests, target_id)
        }
        else if (status === 'Accept Friend') {
            setStatus('Remove Friend')
            response = await addFriend(user_id, target_id)
            if (response) friends[target_id] = users.find(o => o.user_id === target_id).username
        }
        else if (status === 'Remove Friend') {
            setStatus('Add Friend')
            response = await removeFriend(user_id, target_id)
            if (response) delete friends[target_id]
        }
        else {
            setStatus(getStatus(target_id))
            return
        }
        
        if (response) await updateUser({ ...user, friends, incomingFriendRequests, outgoingFriendRequests })
        else setStatus(status)
    }

    return user.loading === undefined &&
        <>
            <PaginatedTable
                name='friends'
                headCells={[
                    { name: 'Profile Picture', prop: 'imageUrl' },
                    { name: 'Username', prop: 'username' },
                    { name: 'Email', prop: 'email' },
                    { name: 'Phone', prop: 'phone' },
                    { name: 'Friends', prop: 'friends' },
                    { name: 'Likes', prop: 'liked' }]}
                data={users}
                Component={User}
                localUser={user}
                update={updateStatus}
            />
        </>
}