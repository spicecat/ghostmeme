import { useState , useEffect} from "react"
import { getLocalUser} from '../services/userService'
import Form from '../components/Form'
import { login, register } from '../services/userService'
import { lockedPageSchema, registerSchema } from '../services/schemas'
import Alert from '../components/Alert'

export default function UserProfile({user}) {
    const [abletoview, setabletoview] = useState(false)
    const [statusCode, setStatusCode] = useState(100)

    const handleClick = () => { 
        console.log(user)
        console.log(user.user_id)
    }

    useEffect(() => {
        if ([201, 202].includes(statusCode)) window.location.href = '/'
    }, [statusCode])
    


return (
    
    <div>
    <>
            <Alert statusCode={statusCode} />
            <br />
            <Form
                name='Edit Profile'
                action={async values => {
                    setStatusCode(102)
                    setStatusCode(await register(values))
                }}
                schema={registerSchema}
                rememberMe={false}
            />
    </>


       {abletoview &&  
        <div>
        <p> hyi!</p>
        <button onClick={handleClick}> test</button>
        </div>
       }
    </div>
    )

}