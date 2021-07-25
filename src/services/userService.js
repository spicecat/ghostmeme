import superagent from 'superagent'
import Cookies from 'universal-cookie'

import { serverUrl } from '../var.js'

const baseUrl = serverUrl + '/users'
const cookies = new Cookies()

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
    return response.statusCode
}

export const login = async ({ username, password, rememberMe }) => {
    const url = baseUrl
    try {
        const auth = Buffer.from(username + ':' + password, 'ascii').toString('base64')
        console.log({ rememberMe })
        var response = await superagent.get(url).query({ rememberMe }).set('Authorization', 'Basic ' + auth)
    } catch (err) { return err.status } // remove
    const { token } = response.body
    cookies.set('token', token)
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
    console.log(user, 321)
    return user
}

export const logout = () => {
    cookies.remove('token')
    window.location.href = '/'
}