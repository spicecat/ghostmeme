import superagent from 'superagent'

import { serverUrl, apiUrl, apiKey } from '../var.js'

export async function getMemes() {
    try { return (await superagent.get(serverUrl,)).body }
    catch (err) { console.log('Error') }
}

export const getAllMemes = async () => {
    const URL = `${apiUrl}/memes`

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

        return memesList
    } catch (err) {
        console.error(err)
    }
}
