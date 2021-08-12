
import { useState, } from 'react'

// import { resetPassword } from '../services/userService'
// import { resetPasswordSchema } from '../services/schemas'
import { Paper } from '@material-ui/core'
import { searchUsers } from '../services/userService'
const { sha256 } = require('crypto-hash')



export default function ForgotPassword() {

    const [email, setEmail] = useState('')
    const [emailsent, setemailsent] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submitted')
    }


    const handleClick = async () => {
        const hashedEmail = await sha256(email)
        setemailsent(true)

        const link = `http://localhost:3000/reset/${hashedEmail}/${email}`
        console.log('Hi! Please visit ', `${link}`, ' to reset your password. Thank you for using Ghostmeme. -Ghost,Inc')
    }


    const handleEmailInput = (e) => {
        const currentEmailInput = e.target.value
        setEmail(currentEmailInput)
    }

    return (
        <div className="header">
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit} className="FormInputsFP">
                <label htmlFor="email">Email  </label>
                <input onChange={handleEmailInput} type="text" placeholder="please enter your email" id="email" value={email} /> <br />
                <button disabled={email === ''} onClick={handleClick} type="submit"> Send Reset Password Email </button>
                {emailsent && <p> Email sent to {email}! </p>}
            </form>
        </div>
    )
}



//LINK WITH ENCODED USER EMAIL ALLOWS PASSWORD RESET on reset_password/something


