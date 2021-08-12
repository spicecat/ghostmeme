import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { login } from '../services/userService'
import { loginSchema } from '../services/schemas'

import Form from '../components/Form'
import Alert from '../components/Alert'

export default function Login() {
    const [statusCode, setStatusCode] = useState(100)

    useEffect(() => {
        if ([201, 202].includes(statusCode)) window.location.href = '/'
    }, [statusCode])

    return (
        <>
            <Alert statusCode={statusCode} />
            <br />
            <Form
                name='Login'
                action={async values => {
                    setStatusCode(102)
                    setStatusCode(await login(values))
                }}
                schema={loginSchema}
                rememberMe={true}
            />
            <br />
            <Link to='/forgot_password'>Forgot Password</Link>
        </>
    )

}