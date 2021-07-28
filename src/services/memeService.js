import superagent from 'superagent'

import { serverUrl, apiUrl, apiKey } from '../var.js'

import { getUser } from './userService'

const retry = async ({ status }, action, ...props) => new Promise(resolve => setTimeout(() => {
    if (status === 555) resolve(action(...props))
    else resolve([])
}, 1500))

const addUsernames = async memes => {
    let result = []
    for (let i in memes) {
        const delay = 600 * i
        result.push(new Promise(async function (resolve) {
            await new Promise(res => setTimeout(res, delay));
            resolve(await new Promise(res => {
                const { username } = getUser(memes[i].owner)
                console.log(delay)
                res({ ...memes[i], username })
            }))
        }))

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
        const regexQuery = {
            description,
            createdAt: { gt: (new Date(created_after)).getTime(), lt: (new Date(created_before)).getTime() },
        }
        const URL = `${apiUrl}'/memes/search?match='${encodeURIComponent(JSON.stringify(query))}`
        // const URL = `${apiUrl}'/memes/search?match='${encodeURIComponent(JSON.stringify(query))}&regexMatch=${encodeURIComponent(JSON.stringify(regexQuery))}`
        console.log(URL, query, regex)
        const response = await superagent.get(URL).set('key', apiKey).set('Content-Type', 'application/json')
        console.log(response.body.memes)
        return addUsernames(response.body.memes.slice(0, 20))
    } catch (err) {
        return retry(err, searchMemes, query, regex)
    }
}

export const searchChatsMemes = async ({ user_id }, query) => searchMemes({ receiver: user_id, private: true, replyTo: null }, query)

export const searchFriendsMemes = async ({ friends }, query) => searchMemes({ receiver: null, private: true, owner: friends.join('|') }, query)

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
