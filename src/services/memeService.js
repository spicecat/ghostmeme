import superagent from 'superagent'

import { serverUrl, apiUrl, apiKey } from '../var.js'

import { getUser } from './userService'

const retry = async ({ status }, action, ...props) => new Promise(resolve => setTimeout(() => {
    if (status === 555) resolve(action(...props))
    else resolve([])
}, 1500))

const addUsernames = async memes => Promise.all(memes.map(async meme => {
    const { username } = await getUser(meme.owner)
    return { ...meme, username }
}))

export const getMemes = async () => {
    try {
        const URL = `${apiUrl}/memes`
        const response = await superagent.get(URL).set('key', apiKey)
        return addUsernames(response.body.memes)
    } catch (err) { return retry(err, getMemes) }
}

export const searchMemes = async query => {
    try {
        const URL = apiUrl + '/memes/search?match=' + encodeURIComponent(JSON.stringify(query))
        console.log(URL)
        const response = await superagent.get(URL).set('key', apiKey)
        return addUsernames(response.body.memes)
    } catch (err) {
        return retry(err, searchMemes, query)
    }
}

export const getChatsMemes = async ({ user_id }) => searchMemes({ receiver: user_id, private: true, replyTo: null })

export const getFriendsStoriesMemes = async ({ friends }) => searchMemes({ receiver: null, private: true, owner: friends.join('|') })

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


export const createMeme = async (json) => {
    const URL = `${apiUrl}/memes`

    try {
        console.log(json)
        const body = JSON.stringify({
            owner: json.owner,
            receiver: json.receiver,
            expiredAt: json.expiredAt ? Number(json.expiredAt) : Number('-1'),
            description: json.description,
            private: (json.private == 'true') ? true : false,
            replyTo: json.replyTo,
            imageUrl: json.imageUrl,
            imageBase64: json.imageBase64 ? json.imageBase64 : null,
        })
        console.log(body)

        const response = await superagent.post(URL).set('key', apiKey).set('Content-Type', 'application/json').send(body)
    } catch (err) {
        console.log(err)
    }
}

export const getUserInfo = async userID => {
    const URL = `${apiUrl}/users/${userID}`

    try {
        const response = await superagent.get(URL).set('key', apiKey)
        return response.body.user
    } catch (err) {
        console.error(err)
    }
}

export const getUsers = async () => {
    const URL = `${apiUrl}/users`

    try {
        const response = await superagent.get(URL).set('key', apiKey)

        const usersList = response.body.users.map(user => {
            return {
                name: user.name,
                email: user.email,
                phone: user.phone,
                username: user.username,
                imageUrl: user.imageUrl,
                deleted: user.deleted,
                user_id: user.user_id,
                friends: user.friends,
                liked: user.liked,
            }
        })

        return usersList
    } catch (err) {
        console.error(err)
    }
}
