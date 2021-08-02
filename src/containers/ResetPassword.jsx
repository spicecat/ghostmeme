
import React, { useState, useEffect } from 'react'

import { resetPassword } from '../services/userService'
import { resetPasswordSchema } from '../services/schemas'

import Form from '../components/Form'
import Alert from '../components/Alert'

export default function ResetPassword() {
    const [statusCode, setStatusCode] = useState(100)

    useEffect(() => {
        if ([201, 202].includes(statusCode)) window.location.href = '/'
    }, [statusCode])

    return (
        <>
            <Alert statusCode={statusCode} />
            <br />
            <Form name='Reset Password' action={async values => {
                setStatusCode(102)
                setStatusCode(await resetPassword(values))
            }
            } schema={resetPasswordSchema} rememberMe={false} />
        </>
    )
}
