import React, { useEffect } from 'react';

import { redirect } from '../services/userService'

export default function Stories({ user }) {
  useEffect(() => { redirect(user) }, [user])

  return (
    <article>
      <header>
        <div>
          <div>
            <img src='https://t4.ftcdn.net/jpg/02/19/63/31/360_F_219633151_BW6TD8D1EA9OqZu4JgdmeJGg4JBaiAHj.jpg' alt='John D. Veloper' />
          </div>
          <div>
            <span>John Doe</span>
          </div>
        </div>
      </header>
      <div>
        <div>
          <img alt='Icon Living' src='[https://cdn-images-1.medium.com/max/1200/1*dMSWcBZCuzyRDeMr4uE_og.png]' />
        </div>
      </div>
      <div>
        <strong>John D. Veloper </strong> Loving Educative!
      </div>
    </article>
  )
}