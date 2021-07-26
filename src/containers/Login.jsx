import React, { useState, useEffect } from 'react'

import { login } from '../services/userService'
import { loginSchema } from '../services/schemas'

import Form from '../components/Form'
import Alert from '../components/Alert'

export const Login = () => {
    const [statusCode, setStatusCode] = useState(100)

    useEffect(() => {
        if ([201, 202].includes(statusCode)) window.location.href = '/'
    }, [statusCode])

    return (
        <>
            <Alert statusCode={statusCode} />
            <br />
            <Form name='Login' action={async values => {
                setStatusCode(102)
                setStatusCode(await login(values))
            }
            } schema={loginSchema} />
        </>
    )
}

export default Login