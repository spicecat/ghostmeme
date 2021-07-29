import superagent from 'superagent'

import { serverUrl, apiUrl, apiKey } from '../var.js'

import { getUser, getLocalUser } from './userService'

const retry = async ({ status }, action, ...props) => {
    if (status === 555) return new Promise(resolve => setTimeout(() => { resolve(action(...props)) }, 1500))
    else return []
}

const addUsernames = async memes => {
    const { friends } = await getLocalUser()
    const users = friends.reduce((o, i) => ({ ...o, [i.user_id]: i.username }), {})
    console.log(friends, users)
    let result = []
    const getUsername = async (meme, delay) => {
        if (meme.owner in users) return { ...meme, username: users.owner }
        else return new Promise(async function (resolve) {
            await new Promise(res => setTimeout(res, delay));
            resolve(await new Promise(res => {
                const { username } = getUser(meme.owner)
                console.log(delay)
                users[meme.owner] = username
                res({ ...meme, username })
            }))
        })
    }
    for (let i in memes) {
        const delay = 1000 * i
        result.push(getUsername(memes[i], delay))

    }
    return Promise.all(result)
}

export const getMemes = async () => {
    try {
        const URL = `${apiUrl}/memes`
        const response = await superagent.get(URL).set('key', apiKey)
        return addUsernames(response.body.memes)
    } catch (err) { return retry(err, getMemes) }
}

export const searchMemes = async (query, regex = {}) => {
    try {
        const { owner, description, created_after, created_before } = regex
        if (created_after || created_before)
            query.createdAt = {
                ...(created_after && { $gt: (new Date(created_after)).getTime() }),
                ...(created_before && { $lt: (new Date(created_before)).getTime() })
            }
        const regexQuery = {
            description,
        }
        const URL = `${apiUrl}/memes/search?match=${encodeURIComponent(JSON.stringify(query))}&regexMatch=${encodeURIComponent(JSON.stringify(regexQuery))}`
        console.log(URL, query, regex)
        const response = await superagent.get(URL).set('key', apiKey)
        return addUsernames(response.body.memes)
    } catch (err) {
        const a = await retry(err, searchMemes, query, regex)
        console.log(313, err, err.status, a)
        return a
    }
}

export const searchChatsMemes = async ({ user_id }, regex) => searchMemes({ receiver: user_id, private: true, replyTo: null }, regex)

export const searchFriendsMemes = async ({ friends }, regex) => searchMemes({ receiver: null, private: true, owner: friends.join('|') }, regex)

export const getConversation = async (user1, user2) => {
    const query = encodeURIComponent(JSON.stringify({
        "owner": `${user1}|${user2}`,
        "receiver": `${user1}|${user2}`,
    }))

    const URL = `${apiUrl}/memes/search?match=${query}`
    // console.log(URL)

    try {
        const response = await superagent.get(URL).set('key', apiKey)

        const memesList = response.body.memes.map(meme => ({
            createdAt: new Date(meme.createdAt),
            expiredAt: meme.expiredAt === -1 ? meme.expiredAt : new Date(meme.expiredAt),
            description: meme.description,
            private: meme.private,
            imageUrl: meme.imageUrl,
            meme_id: meme.meme_id,
            owner: meme.owner,
            receiver: meme.receiver,
            likes: meme.likes,
            replyTo: meme.replyTo
        }))

        // console.log(memesList)
        return memesList
    } catch (err) {
        console.error(err)
    }
}


export const createMeme = async json => {
    const URL = `${apiUrl}/memes`

    try {
        console.log(json)
        const body = JSON.stringify({
            owner: json.owner,
            receiver: json.receiver,
            // expiredAt: json.expiredAt ? Number(json.expiredAt) : Number('-1'),
            expiredAt: json.expiredAt ? new Date(json.expiredAt).getTime() : Number('-1'),
            description: json.description,
            private: (json.private == 'true') ? true : false,
            replyTo: json.replyTo,
            imageUrl: json.imageUrl,
            imageBase64: json.imageBase64 ? json.imageBase64 : null,
        })
        console.log(body)

        return await superagent.post(URL).set('key', apiKey).set('Content-Type', 'application/json').send(body)
    } catch (err) {
        retry(err, createMeme, json)
    }
}

// move to userServices
export const getUserInfo = async userID => {
    const URL = `${apiUrl}/users/${userID}`

    try {
        const response = await superagent.get(URL).set('key', apiKey)
        return response.body.user
    } catch (err) {
        console.error(err)
    }
}

// move to userServices
export const getUsers = async () => {
    const URL = `${apiUrl}/users`

    try {
        const response = await superagent.get(URL).set('key', apiKey)

        return response.body.users

    } catch (err) {
        console.error(err)
    }
}
