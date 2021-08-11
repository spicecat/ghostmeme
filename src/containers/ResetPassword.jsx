import {useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Form from '../components/Form'
import { ResetPasswordSchema } from '../services/schemas'
const {sha256} = require('crypto-hash')
const axios = require('axios')

const checkPasswordStrength = (password) => {
    if (password.length <= 10) {
      return "weak"
    }
  
    if (password.length > 17) {
      return "strong"
    }
  
    return "moderate"
  }    



export default function ResetPassword() {
const [password, setpassword] = useState('')
const [conf, setconf] = useState(null) 
const [passwordStr, setPasswordStrength] = useState(null) 
const [valid, setvalid] = useState(false) 
const [reset, setreset] = useState(false) 

const handleSubmit = (e) => {
    e.preventDefault() 
    console.log('submitted')
   }

    const params = useParams() 
    

 const something = async () => { 
     const emailhash= await sha256(params.email) 
     if (emailhash === params.emailHash){setvalid(true)} 
 }

 something()

useEffect(() => {
        const currentPasswordStrength = checkPasswordStrength(password)
        setPasswordStrength(currentPasswordStrength)
      }, [password]);

const onClickHandler = () => { //this will reset the password. This is the last thing to fill and then this requirement is complete
    axios.post('http://localhost:3030/users/updatePassword', {
        email: params.email,
        password,
    })
    setreset(true)
}

    return (
        <>
        {!valid && <p> Invalid link. Please try again. </p>}
        {valid &&
        <div> 
        <h1>Reset Password</h1> 
        <form onSubmit={handleSubmit} className="FormInputsFP">
           <label htmlFor="newpassword">New password</label>
           <input onChange={(e) => setpassword(e.target.value)} id='new password'/> <br/>
           <p> Password strength: {passwordStr} </p>
           <label htmlFor="confirm password">Comfirm Password</label> 
           <input onChange ={(e) => setconf(e.target.value)} id='confirmpassword'/> 
           <button onClick= {onClickHandler} disabled={passwordStr==='weak' || password!== conf } > Reset Password</button>
       </form>
       {reset && <p>if an there account associated with {params.email}, then its password has been successfully reset.</p> }
       </div>  
        }
       {/* <Form
                name='Reset password'
                action={async values => {
                    await somefn(values)
                }}
                schema={ResetPasswordSchema}
                rememberMe={false}
            /> */}
       </>
    )
}
    