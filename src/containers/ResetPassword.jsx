import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Form } from '../components'
// import { ResetPasswordSchema } from '../services/schemas'
import Button from '@material-ui/core/Button'
const { sha256 } = require('crypto-hash')
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
  const [matching, setmatching] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submitted')
  }

  const params = useParams()


  const something = async () => {
    const emailhash = await sha256(params.email)
    if (emailhash === params.emailHash) { setvalid(true) }
  }

  something()

  //  const matchingcheck=() => { 
  //     if (password===conf) {setmatching('true')}
  // }

  useEffect(() => {
    const currentPasswordStrength = checkPasswordStrength(password)
    setPasswordStrength(currentPasswordStrength)
    if (password === conf) { setmatching(true) } else { setmatching(false) }
    console.log('ran')
  }, [password]);

  useEffect(() => {
    if (password === conf) { setmatching(true) } else { setmatching(false) }
    console.log('ra2n')
  }, [conf]);


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
            <label htmlFor="newpassword">New password</label> <br />
            <input type="password" onChange={(e) => setpassword(e.target.value)} id='new password' /> <br />
            <p> Password strength: {passwordStr} </p>
            {passwordStr === 'weak' && <p>Password must contain at least 11 characters</p>}
            <label htmlFor="confirm password">Comfirm Password</label> <br />
            <input type="password" onChange={(e) => setconf(e.target.value)} id='confirmpassword' /> <br />
            {matching && <p>Passwords match! </p>}
            {!matching && <p>Passwords do not match! </p>}
            <br />
            <Button variant="contained" onClick={onClickHandler} disabled={passwordStr === 'weak' || password !== conf} > Reset Password</Button>
          </form>
          {reset && <p>If an there account associated with {params.email}, then its password has been successfully reset. Please wait at least 45 seconds before logging in.</p>}
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
