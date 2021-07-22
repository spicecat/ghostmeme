import React from 'react'

import { register } from '../services/userService'
import { registerSchema } from '../services/schemas'

import Form from '../components/Form'
import PaperContent from '../components/Paper'
import captcha from '../assets/captcha.jpg'

export const Register = () => {
    const RegisterContent = update =>
        <>
            <Form name='Register' action={async values => update(await register(values))} schema={registerSchema} />
            <img src={captcha} alt='CAPTCHA' />
        </>

    return (
        <>
            <PaperContent Component={RegisterContent} />
        </>
    )
}

export default Register