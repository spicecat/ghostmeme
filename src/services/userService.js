import superagent from 'superagent'
import superagentCache from 'superagent-cache'
import Cookies from 'universal-cookie'
import { pick } from 'lodash'

import { serverUrl, apiUrl, apiKey } from '../var.js'

const userServerUrl = serverUrl + '/users', userApiUrl = apiUrl + '/users'
superagentCache(superagent)
const cookies = new Cookies()

const retry = async ({ status }, action) => {
    if (status === 555) return new Promise(resolve => setTimeout(() => { resolve(action) }, 5000))
    else return
}

export const redirect = async user => {
    // comment below to disable redirect
    if (!user.username && user.loading === false) window.location.href = '/login'
}

export const register = async ({ username, password, profile_picture, rememberMe, ...info }) => {
    const URL = userServerUrl
    try {
        delete info.confirm_password
        if (profile_picture) var imageBase64 = await profile_picture.text()
        const auth = Buffer.from(username + ':' + password, 'ascii').toString('base64')
        var response = await superagent.post(URL, { ...info, imageBase64 }).query({ rememberMe }).set('Authorization', 'Basic ' + auth)
    } catch (err) { return err.status }
    const { token } = response.body
    cookies.set('token', token)
    cookies.remove('loginAttempts')
    return response.statusCode
}

export const login = async ({ username, password, rememberMe }) => {
    if (getLoginTimeout() > 0) return 403
    const loginAttempts = getLoginAttempts()

    const url = userServerUrl
    try {
        const auth = Buffer.from(username + ':' + password, 'ascii').toString('base64')
        var response = await superagent.get(url).query({ rememberMe }).set('Authorization', 'Basic ' + auth)
    } catch (err) {
        if (err.status === 401) {
            if (loginAttempts >= 2) {
                cookies.set('loginTimeout', Date.now() + 1000 * 60 * 5)
                cookies.remove('loginAttempts')
                return 403
            }
            cookies.set('loginAttempts', 1 + loginAttempts)
        }
        return err.status
    }
    const { token } = response.body
    cookies.set('token', token)
    cookies.remove('loginAttempts')
    return response.statusCode
}

export const logout = () => {
    cookies.remove('token')
    window.location.href = '/'
}

export const getLoginTimeout = () => {
    const loginTimeout = Number(cookies.get('loginTimeout') || 0) - Date.now()
    if (loginTimeout <= 0) cookies.remove('loginTimeout')
    console.log(loginTimeout)
    return loginTimeout
}
export const getLoginAttempts = () => Number(cookies.get('loginAttempts')) || 0

export const getLocalUser = async () => {
    const token = cookies.get('token')
    if (!token) return { loading: false }

    const URL = userServerUrl + '/getUser'
    try {
        var response = await superagent.get(URL).set('Authorization', 'Bearer ' + token)
    } catch (err) {
        if (err.status === 401) logout()
        return
    }
    const { user_id } = response.body
    const user = await getUser(user_id)
    // const user = {
    //     user_id: '5ec8adf06e38137ff2e58770',
    //     name: "Barack Obama",
    //     email: "o@barackobama.com",
    //     phone: "773-555-5555",
    //     username: "Oforce1",
    //     friends: [{ '5ec8adf06e38137ff2e58770': "Barack Obama" }, { '5ec8adf06e38137ff2e58771': "Barack Obama1" }],
    //     liked: 0,
    //     deleted: false,
    //     imageUrl: null
    // }
    user.friends = await getFriends(user.user_id)
    console.log(user)
    return user
}

export const getUsers = async (after = '') => {
    const URL = `${apiUrl}/users?after=${after}`

    try {
        const response = await superagent.get(URL).set('key', apiKey)
        const { users } = response.body
        return users
        // if (users.length) {
        //     const last_id = users[users.length - 1].user_id
        //     console.log(313, users, after, last_id, Date.now())
        //     return await delay(users.concat(await getUsers(after = last_id)))
        // }
        // else return []
    } catch (err) { return retry(err, getUsers(after)) || [] }
}

export const getUser = async user_id => {
    const URL = `${userApiUrl}/${user_id}`

    try {
        const response = await superagent.get(URL).set('key', apiKey)
        return response.body.user
    } catch (err) { return retry(err, getUser(user_id)) || {} }
}

export const getFriends = async user_id => {
    const URL = `${userApiUrl}/${user_id}/friends`

    try {
        const response = await superagent.get(URL).set('key', apiKey)
        return addUsernames(response.body.users)
    } catch (err) { return retry(err, getFriends(user_id)) || {} }
}

const addUsernames = async user_ids => {
    const usernames = await getUsernames(user_ids)
    return pick(usernames, user_ids)
}

export const getUsernames = async user_ids => { // returns object {user_id:username...}
    const usernames = {}, users = await getUsers()
    for (const user of users) usernames[user.user_id] = user.username

    for (let i in user_ids) {
        const delay = 1000 * i
        const user_id = user_ids[i]
        if (!(user_id in usernames))
            new Promise(async function (resolve) {
                await new Promise(res => setTimeout(res, delay))
                resolve(await new Promise(async () => {
                    const { username } = await getUser(user_id)
                    usernames[user_id] = username || ''
                }))
            })
    }
    return usernames
}

export const getFriendRequests = async (user_id, reqType = 'outgoing') => {
    const URL = `${userApiUrl}/${user_id}/requests/${reqType}`
    try {
        const response = await superagent.get(URL).set('key', apiKey)
        return response.body.users
    } catch (err) { return retry(err, getFriendRequests(user_id)) || [] }
}

export const sendFriendRequest = async (user_id, target_id, reqType = 'outgoing') => {
    const URL = `${userApiUrl}/${user_id}/requests/${reqType}/${target_id}`
    try {
        const response = await superagent.put(URL).set('key', apiKey)
        if (reqType === 'outgoing') return sendFriendRequest(target_id, user_id, 'incoming')
        else return response.body.success
    } catch (err) { return retry(err, sendFriendRequest(user_id, target_id)) }
}

export const removeFriendRequest = async (user_id, target_id, reqType = 'outgoing') => {
    const URL = `${userApiUrl}/${user_id}/requests/${reqType}/${target_id}`
    try {
        const response = await superagent.delete(URL).set('key', apiKey)
        if (reqType === 'outgoing') return removeFriendRequest(target_id, user_id, 'incoming')
        else return response.body.success
    } catch (err) { return retry(err, sendFriendRequest(user_id, target_id)) }
}

export const addFriend = async (user_id, target_id, reqType = 'outgoing') => {
    await removeFriendRequest(user_id, target_id)
    const URL = `${userApiUrl}/${user_id}/requests/${target_id}`
    try {
        const response = await superagent.put(URL).set('key', apiKey)
        if (reqType === 'outgoing') return addFriend(target_id, user_id, 'incoming')
        else return response.body.success
    } catch (err) { return retry(err, sendFriendRequest(user_id, target_id)) }
}

export const removeFriend = async (user_id, target_id, reqType = 'outgoing') => {
    await removeFriendRequest(user_id, target_id)
    const URL = `${userApiUrl}/${user_id}/friends/${target_id}`
    try {
        const response = await superagent.delete(URL).set('key', apiKey)
        if (reqType === 'outgoing') return removeFriend(target_id, user_id, 'incoming')
        else return response.body.success
    } catch (err) { return retry(err, sendFriendRequest(user_id, target_id)) }
}

