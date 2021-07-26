import { useState, useEffect } from 'react'

import { getMemes } from '../services/memeService'

import Meme from './Meme'

export default function Search({ user }) {
    const [memes, setMemes] = useState([])

    const updateMemes = async () => { setMemes(await getMemes()) }

    useEffect(() => {
        updateMemes()
    }, [])

    return !user.loading &&
        <>
            {/* {memes.map(meme => <Meme {...meme} />)} */}
        </>
}