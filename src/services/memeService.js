import superagent from 'superagent'

import { serverUrl, apiUrl, apiKey } from '../var.js'

export async function getMemes() {
    try { return (await superagent.get(serverUrl,)).body }
    catch (err) { console.log('Error') }
}

export const getAllMemes = async () => {
    try {
        const URL = `${apiUrl}/memes`
        const response = await superagent.get(URL).set('key', apiKey)

        const memesList = response.body.memes.map(meme => ({
            createdAt: meme.createdAt,
            expiredAt: meme.expiredAt,
            description: meme.description,
            private: meme.private,
            imageUrl: meme.imageUrl,
            meme_id: meme.meme_id,
            owner: meme.owner,
            receiver: meme.receiver,
            likes: meme.likes,
            replyTo: meme.replyTo
        }))

        return memesList
    } catch (err) {
        console.error(err)
    }
}

export const getAllUsers = async () => {
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
