import React, { useEffect } from 'react'

import { redirect } from '../services/userService'

export default function Notifications({ user }) {
    useEffect(() => { redirect(user) }, [user])

    return (
        <>
            Notifications
        </>
    )
}