import { useState, useEffect } from "react"
import { register, editProfile } from '../services/userService'
import { loginSchema, lockedPageSchema, registerSchema, EditAccountSchema } from '../services/schemas'
import { Form, Alert } from '../components'

export default function UserProfile({ user }) {
    // const [abletoview, setabletoview] = useState(false)
    const [statusCode, setStatusCode] = useState(100)

    // useEffect(() => {
    //     if ([201, 202].includes(statusCode)) window.location.href = '/myprofile'
    // }, [statusCode])

    // const handleClick = () => { 
    //     console.log(user)
    //     console.log(user.user_id)
    // }




    return (
        <div>
            {/* <>
             <Alert statusCode={statusCode} />
             <br />
            <Form
                name='Unlock'
                action={async values => {
                    setStatusCode(102)
                    setStatusCode(await loginEditUnlock(values))
                }}
                schema={loginSchema}
                initialValues={user}
                rememberMe={false}
            />
    </> */}
            <h1> Edit Account Details</h1>
            <br />
            <Form
                name='Edit Your Account'
                action={async values => {
                    setStatusCode(102)
                    setStatusCode(await editProfile(values))
                }}
                schema={EditAccountSchema}
                initialValues={user}
                rememberMe={false}
            />



        </div>
    )

}