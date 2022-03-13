import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { login } from '../services/userService'
import { loginSchema } from '../services/schemas'

import { Form, Alert } from '../components'

export default function Login() {
    const navigate = useNavigate()
    const [statusCode, setStatusCode] = useState(100)

    useEffect(() => {
        if ([201, 202].includes(statusCode)) navigate('/')
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
                rememberMe={false}
            />
            <br />
            <Link to='/forgot_password'>Forgot Password</Link>
        </>
    )

}