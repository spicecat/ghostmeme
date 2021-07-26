import React, { useEffect } from 'react';

import { redirect } from '../services/userService'

import { memeSchema } from '../services/schemas'

import Form from '../components/Form'

export default function Stories({ user }) {
  useEffect(() => { redirect(user) }, [user])

  return user.loading === undefined &&
    <>
      {user.username}
      {/* <Form name='Login' action={async values => { }} /> */}
    </>
}