import React from 'react'
import { login } from '../services/userService'
import { loginSchema } from '../services/schemas'

import Form from '../components/Form'
import PaperContent from '../components/Paper'


export const Login = () => {
    return (
        <>
        Login
        {/* <PaperContent Component={Form} name='Login' action={login} schema={loginSchema} /> */}
        </>
    )
}

export default Login