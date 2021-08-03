
import React, { useState, useEffect } from 'react'

import { resetPassword } from '../services/userService'
import { resetPasswordSchema } from '../services/schemas'

import Form from '../components/Form'
import Alert from '../components/Alert'

export default function ResetPassword() {
    const [statusCode, setStatusCode] = useState(100)

    useEffect(() => {
        if ([201, 202].includes(statusCode)) window.location.href = '/'
    }, [statusCode])

    return (
        <>
            <Alert statusCode={statusCode} />
            <br />
            <Form name='Reset Password' action={async values => {
                setStatusCode(102)
                setStatusCode(await resetPassword(values))
            }
            } schema={resetPasswordSchema} />
        </>
    )
}

// import React, { useState } from 'react'
// import { Auth } from 'aws-amplify'
// import {
//   HelpBlock,
//   FormGroup,
//   Glyphicon,
//   FormControl,
//   ControlLabel,
// } from 'react-bootstrap'
// import LoadingButton from '@material-ui/lab/LoadingButton';
// // import { useFormFields } from '../libs/hooksLib'
// // import { onError } from '../libs/errorLib'
// import './components/index.css'

// export default function ResetPassword() {
//   const [fields, handleFieldChange] = useFormFields({
//     code: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [codeSent, setCodeSent] = useState(false);
//   const [confirmed, setConfirmed] = useState(false);
//   const [isConfirming, setIsConfirming] = useState(false);
//   const [isSendingCode, setIsSendingCode] = useState(false);

//   function validateCodeForm() {
//     return fields.email.length > 0;
//   }

//   function validateResetForm() {
//     return (
//       fields.code.length > 0 &&
//       fields.password.length > 0 &&
//       fields.password === fields.confirmPassword
//     );
//   }

//   async function handleSendCodeClick(event) {
//     event.preventDefault();

//     setIsSendingCode(true);

//     try {
//       await Auth.forgotPassword(fields.email);
//       setCodeSent(true);
//     } catch (error) {
//       onError(error);
//       setIsSendingCode(false);
//     }
//   }

//   async function handleConfirmClick(event) {
//     event.preventDefault();

//     setIsConfirming(true);

//     try {
//       await Auth.forgotPasswordSubmit(
//         fields.email,
//         fields.code,
//         fields.password
//       );
//       setConfirmed(true);
//     } catch (error) {
//       onError(error);
//       setIsConfirming(false);
//     }
//   }

//   function renderRequestCodeForm() {
//     return (
//       <form onSubmit={handleSendCodeClick}>
//         <FormGroup bsSize='large' controlId='email'>
//           <ControlLabel>Email</ControlLabel>
//           <FormControl
//             autoFocus
//             type='email'
//             value={fields.email}
//             onChange={handleFieldChange}
//           />
//         </FormGroup>
//         <LoadingButton
//           block
//           type='submit'
//           bsSize='large'
//           loading={isSendingCode}
//           disabled={!validateCodeForm()}
//         >
//           Send Confirmation
//         </LoadingButton>
//       </form>
//     );
//   }

//   function renderConfirmationForm() {
//     return (
//       <form onSubmit={handleConfirmClick}>
//         <FormGroup bsSize='large' controlId='code'>
//           <ControlLabel>Confirmation Code</ControlLabel>
//           <FormControl
//             autoFocus
//             type='tel'
//             value={fields.code}
//             onChange={handleFieldChange}
//           />
//           <HelpBlock>
//             Please check your email ({fields.email}) for the confirmation code.
//           </HelpBlock>
//         </FormGroup>
//         <hr />
//         <FormGroup bsSize='large' controlId='password'>
//           <ControlLabel>New Password</ControlLabel>
//           <FormControl
//             type='password'
//             value={fields.password}
//             onChange={handleFieldChange}
//           />
//         </FormGroup>
//         <FormGroup bsSize='large' controlId='confirmPassword'>
//           <ControlLabel>Confirm Password</ControlLabel>
//           <FormControl
//             type='password'
//             value={fields.confirmPassword}
//             onChange={handleFieldChange}
//           />
//         </FormGroup>
//         <LoadingButton
//           block
//           type='submit'
//           bsSize='large'
//           loading={isConfirming}
//           disabled={!validateResetForm()}
//         >
//           Confirm
//         </LoadingButton>
//       </form>
//     );
//   }

//   function renderSuccessMessage() {
//     return (
//       <div className='success'>
//         <Glyphicon glyph='ok' />
//         <p>Your password has been reset.</p>
//         <p>
//           <Link to='/login'>
//             Click here to login with your new credentials.
//           </Link>
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className='ResetPassword'>
//       {!codeSent
//         ? renderRequestCodeForm()
//         : !confirmed
//           ? renderConfirmationForm()
//           : renderSuccessMessage()}
//     </div>
//   );
// }