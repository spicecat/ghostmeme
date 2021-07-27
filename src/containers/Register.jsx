import React, { useState, useEffect } from 'react'

import { register } from '../services/userService'
import { registerSchema } from '../services/schemas'

import Form from '../components/Form'
import Alert from '../components/Alert'
import captcha from '../assets/captcha.jpg'

export const Register = () => {
    const [statusCode, setStatusCode] = useState(100)

    useEffect(() => {
        if ([201, 202].includes(statusCode)) window.location.href = '/'
    }, [statusCode])

    return (
        <>
            <Alert statusCode={statusCode} />
            <br />
            <Form name='Register' action={async values => {
                setStatusCode(102)
                setStatusCode(await register(values))
            }
            } schema={registerSchema} />
            <img src={captcha} alt='CAPTCHA' />
        </>
    )
}

export default Register