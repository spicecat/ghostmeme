import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { redirect } from '../services/userService'
import { searchMemes } from '../services/memeService'

export default function Stories({ user }) {
  useEffect(() => { redirect(user) }, [user])
  const [UsersMemesArray, setUserMemesArray] = useState([])
  const [valid, setValid] = useState(false)

  const GetsUsersMemes = async () => {
    try {
      setUserMemesArray(await searchMemes({ owner: user.user_id }))
      setValid(true)
      console.log('got it!')
    }
    catch {
      console.log('error!')
    }
  }
  const mapper = (ix) => {
    return (


      <article className="Post" >
        <header>
          <div className="Post-user">
            <div className="Post-user-profilepicture">
              <img src={ix.imageUrl} alt="Me and my Friends" />
              <p>{ix.description}</p>
            </div>
            <div className="Post-user-nickname">
              <span>{ix.username}</span>
            </div>
          </div>
        </header>
        <div className="Post-image">
          <div className="Post-image-bg">
            <img alt="Icon Living" src={ix.imageUrl} />
          </div>
        </div>
        <div className="Post-caption">
          <strong>John D. Veloper </strong> Loving Educative!
        </div>

      </article>

    )

  }

  const TitleItems = UsersMemesArray.map(mapper)

  return (
    <>
      <h1>{user.username}'s Stories!</h1> <br />
      <button onClick={GetsUsersMemes} > Get up to date on your posts!</button>
      {valid && (<ul> {TitleItems}</ul>)}
    </>
  )
}