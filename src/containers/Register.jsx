import React from 'react'

import { register } from '../services/userService'
import { registerSchema } from '../services/schemas'

import Form from '../components/Form'
import PaperContent from '../components/Paper'

export default function Register() {
    return (
        <>
        <PaperContent Component={Form} name='Register' action={register} schema={registerSchema} />
        </>
    )
}