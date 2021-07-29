import superagent from 'superagent'
import Cookies from 'universal-cookie'

import { serverUrl, apiUrl, apiKey } from '../var.js'

const userServerUrl = serverUrl + '/users', userApiUrl = apiUrl + '/users'
const cookies = new Cookies()

const retry = async ({ status }, action, ...props) => new Promise(resolve => setTimeout(() => {
    if (status === 555) resolve(action(...props))
    else resolve()
}, 5000))

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
    return {
        user_id: '5ec8adf06e38137ff2e58770',
        name: "Barack Obama",
        email: "o@barackobama.com",
        phone: "773-555-5555",
        username: "Oforce1",
        friends: [{ '5ec8adf06e38137ff2e58770': "Barack Obama" }, { '5ec8adf06e38137ff2e58771': "Barack Obama1" }],
        liked: 0,
        deleted: false,
        imageUrl: null
    }
    const token = cookies.get('token')
    if (!token) return { loading: false }

    const URL = userServerUrl + '/getUser'
    try {
        var response = await superagent.get(URL).set('Authorization', 'Bearer ' + token)
    } catch (err) {
        if (err.status === 401) logout()
        return
    }
    const { user } = response.body
    user.friends = await getFriends(user.user_id)
    console.log(user)
    return user
}

export const getUser = async user_id => {
    const URL = `${userApiUrl}/${user_id}`

    try {
        const response = await superagent.get(URL).set('key', apiKey)
        return response.body
    } catch (err) { return retry(err, getUser, user_id) }
}

export const getFriends = async user_id => {
    const URL = `${userApiUrl}/${user_id}/friends`

    try {
        const response = await superagent.get(URL).set('key', apiKey)
        return addUsernames(response.body.users)
    } catch (err) { return retry(err, getFriends, user_id) }
}

export const addUsernames = async user_ids => {
    let users = [], result = []
    const getUsername = async (user, delay) => {
        const { user_id } = user
        if (user_id in users) return { ...user, username: users.username }
        else return new Promise(async function (resolve) {
            await new Promise(res => setTimeout(res, delay));
            resolve(await new Promise(res => {
                const { username } = getUser(user_id)
                console.log(delay)
                users[user_id] = username
                res({ ...user, username })
            }))
        })
    }
    for (let i in user_ids) {
        const delay = 1000 * i
        result.push(getUsername({ user_id: user_ids[i] }, delay))
    }
    return Promise.all(result)
}

export const sendFriendRequest = async (user_id, target_id) => {
    const URL = `${userApiUrl}/${user_id}/requests/outgoing/${target_id}`

    try {
        const response = await superagent.put(URL).set('key', apiKey)
        return response.body.success
    } catch (err) { return retry(err, sendFriendRequest, user_id, target_id) }
}