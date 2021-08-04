import superagent from 'superagent'
import superagentCache from 'superagent-cache'

import { serverUrl, apiUrl, apiKey, nullifyUndefined, retry } from '../var.js'

import { getUsernames } from './userService'

superagentCache(superagent)

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

export const isExpired = ({ expiredAt }) => expiredAt !== -1 && expiredAt < Date.now()

export const searchMemes = async (baseQuery, query = {}, friends = {}) => {
    try {
        const { owner = '', description, createdAfter, createdBefore } = query
        if (createdAfter || createdBefore)
            baseQuery.createdAt = {
                ...(createdAfter && { $gt: (new Date(createdAfter)).getTime() }),
                ...(createdBefore && { $lt: (new Date(createdBefore)).getTime() })
            }
        const regexQuery = {
            ...description && { description }
        }
        const URL = `${apiUrl}/memes/search?match=${encodeURIComponent(JSON.stringify(baseQuery))}&regexMatch=${encodeURIComponent(JSON.stringify(regexQuery))}`
        const response = await superagent.get(URL).set('key', apiKey).forceUpdate(true)
        let { memes } = response.body
        memes = await addUsernames(memes, friends)
        memes = memes.filter(meme => meme.username.includes(owner))
        for (const meme of memes) {
            meme.createdAt = new Date(meme.createdAt)
            meme.expiredAt = meme.expiredAt === -1 ? -1 : new Date(meme.expiredAt)
        }
        return memes
    } catch (err) { return retry(err, searchMemes, baseQuery, query, friends) }
}

export const searchChatsMemes = async ({ user_id, friends }, query) => searchMemes({ receiver: user_id, private: true, replyTo: null }, query, friends)
export const searchFriendsMemes = async ({ friends }, query) => searchMemes({ receiver: null, private: true, owner: Object.keys(friends).join('|') }, query, friends)

export const getConversation = async (user1, user2) => searchMemes({ owner: `${user1}|${user2}`, receiver: `${user1}|${user2}`, private: true })
export const getStoryMemes = async ({ user_id }) => searchMemes({ owner: user_id, receiver: null, private: true })

const postMeme = async body => {
    const URL = `${apiUrl}/memes`
    try {
        return await superagent.post(URL, body).set('key', apiKey).set('Content-Type', 'application/json')
    } catch (err) { return retry(err, postMeme, body) }
}

export const createMeme = async ({ user_id: owner }, receiver, { description, imageUrl, uploadImage: imageBase64, expiredAt }) =>
    postMeme(nullifyUndefined({
        owner,
        receiver,
        expiredAt: expiredAt ? new Date(expiredAt).getTime() : -1,
        description,
        private: true,
        replyTo: null,
        imageUrl,
        imageBase64
    }))

export const vanishMeme = async meme_id => {
    const URL = `${apiUrl}/memes/${meme_id}`
    try {
        return await superagent.put(URL, { expiredAt: 0 }).set('key', apiKey).set('Content-Type', 'application/json')
    } catch (err) { return retry(err, vanishMeme, meme_id) }
}