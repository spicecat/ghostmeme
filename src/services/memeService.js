import superagent from 'superagent'

import { serverUrl, apiUrl, apiKey } from '../var.js'
// export async function getMemes() {
//     try { return (await superagent.get(serverUrl,)).body }
//     catch (err) { console.log('Error') }
// }

export const getMemes = async () => {
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

export const getConversation = async (user1, user2) => {
    const query = encodeURIComponent(JSON.stringify({
        "owner": `${user1}|${user2}`,
        "receiver": `${user1}|${user2}`,
    }))

    const URL = `${apiUrl}/memes/search?match=${query}`
    // console.log(URL)

    try {
        const response = await superagent.get(URL).set('key', apiKey)

        const memesList = response.body.memes.map(meme => {
            return {
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
            }
        })

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
            expiredAt: Number(json.expiredAt),
            description: json.description,
            private: (json.private) == 'true' ? true : false,
            replyTo: json.replyTo,
            imageUrl: json.imageUrl,
            imageBase64: json.imageBase64,
        })
        console.log(body)

        const response = await superagent.post(URL).set('key', apiKey).set('Content-Type', 'application/json').send(body)
    } catch (err) {
        console.log(err)
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
