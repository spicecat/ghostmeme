import superagent from 'superagent'
import Cookies from 'universal-cookie'

import { serverUrl } from '../var.js'

const baseUrl = serverUrl + '/users'
const cookies = new Cookies()

export const register = async (user) => {
    const url = baseUrl
    try {
        const { username, password, profile_picture, ...info } = user
        const auth = Buffer.from(username + ':' + password, 'ascii').toString('base64')
        const response = await superagent.post(url, { ...info, imageBase64: await profile_picture.text() }).set('Authorization', 'Basic ' + auth)
        const { token } = response.body
        cookies.set('token', token)
        cookies.set('username', username)
        return response.statusCode
    } catch (err) { return err.status }
}

export const login = async ({ username, password }) => {
    const url = baseUrl
    try {
        const auth = Buffer.from(username + ':' + password, 'ascii').toString('base64')
        const response = await superagent.get(url).set('Authorization', 'Basic ' + auth)
        const { token } = response.body
        cookies.set('token', token)
        cookies.set('username', username)
        return response.statusCode
    } catch (err) { return err.status } // remove
}

export const logout = () => {
    cookies.remove('username')
    cookies.remove('token')
    window.location.href = '/'
}