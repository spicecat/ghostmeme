import React, { useEffect } from 'react';

import { redirect } from '../services/userService'

import { memeSchema } from '../services/schemas'

import Form from '../components/Form'
import PaperContent from '../components/Paper'

export default function Stories({ user }) {
  useEffect(() => { redirect(user) }, [user])

  const StoriesContent = update =>
    <>
      {user.username}
      {/* <Form name='Login' action={async values => { }} /> */}
    </>
  return (
    <>
      <PaperContent Component={StoriesContent} />
    </>
  )
}