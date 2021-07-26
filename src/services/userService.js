import superagent from 'superagent'
import Cookies from 'universal-cookie'

import { serverUrl } from '../var.js'

const baseUrl = serverUrl + '/users'
const cookies = new Cookies()

export const redirect = async user => {
    // comment below to disable redirect
    if (!user.username && !user.loading) window.location.href = '/login'
}

export const register = async ({ username, password, profile_picture, rememberMe, ...info }) => {
    const url = baseUrl
    try {
        delete info.confirm_password
        if (profile_picture) var imageBase64 = await profile_picture.text()
        const auth = Buffer.from(username + ':' + password, 'ascii').toString('base64')
        var response = await superagent.post(url, { ...info, imageBase64 }).query({ rememberMe }).set('Authorization', 'Basic ' + auth)
    } catch (err) { return err.status }
    const { token } = response.body
    cookies.set('token', token)
    cookies.remove('loginAttempts')
    return response.statusCode
}

export const login = async ({ username, password, rememberMe }) => {
    if (getLoginTimeout() > 0) return 403
    const loginAttempts = getLoginAttempts()

    const url = baseUrl
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

export const getUser = async () => {
    const token = cookies.get('token')
    if (!token) return {}

    const url = baseUrl + '/getUser'
    try {
        var response = await superagent.get(url).set('Authorization', 'Bearer ' + token)
    } catch (err) {
        if (err.status === 401) logout()
        return
    }
    const { user } = response.body
    console.log(user)
    return user
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