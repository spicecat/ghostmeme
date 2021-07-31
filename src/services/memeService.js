import superagent from 'superagent'
import superagentCache from 'superagent-cache'

import { serverUrl, apiUrl, apiKey } from '../var.js'

import { getUser, getUsernames } from './userService'

superagentCache(superagent)

const retry = async ({ status }, action, ...props) => {
    if (status === 555) return new Promise(resolve => setTimeout(() => { resolve(action(...props)) }, 4000))
    else return []
}

const addUsernames = async (memes, friends = {}) => {
    const user_ids = memes.map(meme => meme.owner)
    const users = await getUsernames(user_ids, friends)
    return memes.map(meme => ({ ...meme, username: users[meme.owner] }))
}

export const getMemes = async () => {
    try {
        const URL = `${apiUrl}/memes`
        const response = await superagent.get(URL).set('key', apiKey)
        const { memes } = response.body
        return addUsernames(memes)
    } catch (err) { return retry(err, getMemes) }
}

export const searchMemes = async (baseQuery, query = {}, friends = {}) => {
    try {
        const { owner = '', description, created_after, created_before } = query
        if (created_after || created_before)
            baseQuery.createdAt = {
                ...(created_after && { $gt: (new Date(created_after)).getTime() }),
                ...(created_before && { $lt: (new Date(created_before)).getTime() })
            }
        const regexQuery = {
            ...description && { description }
        }
        const URL = `${apiUrl}/memes/search?match=${encodeURIComponent(JSON.stringify(baseQuery))}&regexMatch=${encodeURIComponent(JSON.stringify(regexQuery))}`
        const response = await superagent.get(URL).set('key', apiKey).forceUpdate(true)
        let { memes } = response.body
        memes = await addUsernames(memes, friends)
        return memes.filter(meme => meme.username.includes(owner))
    } catch (err) { return await retry(err, searchMemes, baseQuery, query) }
}

export const searchChatsMemes = async ({ user_id, friends }, query) => searchMemes({ receiver: user_id, private: true, replyTo: null }, query, friends)

export const searchFriendsMemes = async ({ friends }, query) => searchMemes({ receiver: null, private: true, owner: Object.keys(friends).join('|') }, query, friends)

export const getConversation = async (user1, user2) => {
    const query = encodeURIComponent(JSON.stringify({
        "owner": `${user1}|${user2}`,
        "receiver": `${user1}|${user2}`,
    }))

    const URL = `${apiUrl}/memes/search?match=${query}`
    // console.log(URL)

    try {
        const response = await superagent.get(URL).set('key', apiKey).forceUpdate(true)

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

export const vanishMeme = async (memeID) => {
    const URL = `${apiUrl}/memes/${memeID}`

    try {
        const body = JSON.stringify({
            expiredAt: 0
        })

        return await superagent.put(URL).set('key', apiKey).set('Content-Type', 'application/json').send(body)

    } catch (err) {
        retry(err, vanishMeme, memeID)
    }
}