import superagent from 'superagent'
import superagentCache from 'superagent-cache'
import { identity, map, pickBy } from 'lodash'

import { serverUrl, apiUrl, apiKey, nullifyUndefined, delay, retry } from '../var.js'

import { getUsernames } from './userService'

superagentCache(superagent, null, { preventDuplicateCalls: true })

const addUsernames = async (memes, usernames) => {
    const users = usernames || await getUsernames(map(memes, 'owner'))
    memes.map(meme => meme.username = users[meme.owner])
    return memes.map(meme => ({ ...meme, username: users[meme.owner] }))
}

export const isExpired = expiredAt => expiredAt !== -1 && expiredAt < Date.now()

export const getMemes = async (query, usernames) => {
    try {
        const URL = `${apiUrl}/memes/search?match=${encodeURIComponent(JSON.stringify(query))}`
        await delay(600)
        const response = await superagent.get(URL).set('key', apiKey).forceUpdate(true)
        const memes = await addUsernames(response.body.memes, usernames)
        for (const meme of memes) {
            meme.createdAt = new Date(meme.createdAt)
            meme.expiredAt = meme.expiredAt === -1 ? -1 : new Date(meme.expiredAt)
        }
        return memes
    } catch (err) { return retry(err, getMemes, query, usernames) || [] }
}
export const getVisibleMemes = async ({ user_id, username }, friends) => {
    const receivedChatsMemes = keyMemes(await getMemes({ receiver: user_id, private: true, replyTo: null }), 'owner')
    const { null: localStoryMemes = [], ...sentChatsMemes } = keyMemes(await getMemes({ owner: user_id, private: true, replyTo: null }, { [user_id]: username }), 'receiver')
    const storyMemes = localStoryMemes.concat(await getMemes({ owner: Object.keys(friends).join('|'), receiver: null, private: true, replyTo: null }, friends))
    const comments = await getComments(storyMemes)
    const mentions = getMentions(storyMemes, comments)

    const meme_idKeyedStoryMemes = {}
    storyMemes.map(meme => meme_idKeyedStoryMemes[meme.meme_id] = meme)
    const keyedComments = keyMemes(comments, 'replyTo')
    Object.entries(keyedComments).map(([meme_id, comments]) => meme_idKeyedStoryMemes[meme_id].comments = comments)
    const ownerKeyedStoryMemes = keyMemes(storyMemes, 'owner')
    return { receivedChatsMemes, sentChatsMemes, storyMemes: ownerKeyedStoryMemes, mentions }
}
const keyMemes = (memes, key) => {
    const keys = {}
    map(memes, key).map(meme_id => keys[meme_id] = [])
    memes.map(meme => keys[meme[key]].push(meme))
    return keys
}
const getComments = async (memes) => {
    const meme_ids = map(memes, 'meme_id')
    return getMemes({ receiver: null, private: true, replyTo: meme_ids.join('|') })
}

const validate = (v, k, d) => {
    if (k === 'createdAfter') return v > d
    else if (k === 'createdBefore') return v < d
    else return v === d || v.match(new RegExp(d))
}
export const searchMemes = (query = {}, memes) => Object.entries(pickBy(query, identity)).reduce((o, [k, v]) => o.filter(meme => validate(meme[k], k, v)), memes)

const getMentions = (username, ...memes) => searchMemes({ description: `@${username}[^0-9a-zA-Z]` }, memes.reduce((o, i) => o.concat(i)))

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
})
const postMeme = async meme => {
    const URL = `${apiUrl}/memes`
    try {

        const response = await superagent.post(URL, meme).set('key', apiKey).set('Content-Type', 'application/json')
        return response.body.success
    } catch (err) { return retry(err, postMeme, meme) }
}
export const createMeme = async (user_id, receiver, { description, imageUrl, uploadImage, expiredAt }, replyTo = null) =>
    postMeme(nullifyUndefined({
        owner: user_id,
        receiver,
        expiredAt: expiredAt ? new Date(expiredAt).getTime() : -1,
        description,
        private: true,
        replyTo,
        imageUrl,
        imageBase64: await toBase64(uploadImage)
    }))

export const likeMeme = async (meme_id, user_id) => {
    const URL = `${apiUrl}/memes/${meme_id}/likes/${user_id}`
    try {
        return await superagent.put(URL).set('key', apiKey)
    } catch (err) { return retry(err, likeMeme, meme_id, user_id) }
}

export const unlikeMeme = async (meme_id, user_id) => {
    const URL = `${apiUrl}/memes/${meme_id}/likes/${user_id}`
    try {
        return await superagent.delete(URL).set('key', apiKey)
    } catch (err) { return retry(err, unlikeMeme, meme_id, user_id) }
}

export const vanishMeme = async meme_id => {
    const URL = `${apiUrl}/memes/${meme_id}`
    try {
        return await superagent.put(URL, { expiredAt: 0 }).set('key', apiKey).set('Content-Type', 'application/json')
    } catch (err) { return retry(err, vanishMeme, meme_id) }
}