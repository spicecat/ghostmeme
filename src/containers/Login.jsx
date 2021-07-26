import React from 'react'
import { login } from '../services/userService'
import { loginSchema } from '../services/schemas'

import Form from '../components/Form'
import PaperContent from '../components/Paper'


export const Login = () => {
    const LoginContent = update =>
        <>
            <Form name='Login' action={async values => {
                update(102)
                update(await login(values))
            }
            } schema={loginSchema} />
        </>

    return (
        <>
            <PaperContent Component={LoginContent} />
        </>
    )
}

export default Login