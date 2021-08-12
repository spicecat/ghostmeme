import { useState } from 'react'
import { upperFirst } from 'lodash/string'
import { useFormik } from 'formik'
import { Button, Checkbox, FormControlLabel, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

import captchaSrc from '../assets/captcha.jpg'

import { fieldInfo, passwordStrength } from '../services/schemas'

const Captcha = () =>
    <div>
        <img src={captchaSrc} alt='CAPTCHA' />
        <br /><br />
    </div>
const formatLabel = field => upperFirst(field.split(/(?=[A-Z\s])/).join('_').replaceAll('_', ' '))

export default function Form({ name, action, schema, initialValues = {}, rememberMe = false, search = false, inline = search }) {
    const [showPassword, setShowPassword] = useState(false)
    const fields = Object.keys(schema.fields), captcha = fields.includes('captcha')
    const formik = useFormik({
        initialValues: fields.reduce((o, i) => ({ ...o, [i]: initialValues[i] || '' }), {}),
        validationSchema: schema,
        onSubmit: async values => action(values)
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            {!inline && <Typography>{name}</Typography>}
            {fields.map(field =>
                <span key={name + field}>
                    <TextField
                        size='small'
                        name={field}
                        label={name === 'Login' && field === 'username' ? 'Username or Email' : formatLabel(field)}
                        type={((field === 'password' && showPassword && 'text') || fieldInfo[field])}
                        style={{ width: inline ? `${inline * 100 / (fields.length + 1) - 5}%` : '100%' }}
                        {...(fieldInfo[field] === 'date' || fieldInfo[field] === 'file') && { InputLabelProps: { shrink: true } }}
                        {...fieldInfo[field] === 'file' ?
                            { onChange: e => formik.setFieldValue(field, e.target.files[0]) } :
                            fieldInfo[field] === 'date' ? {
                                onChange: e => {
                                    const d = new Date(e.target.value)
                                    formik.setFieldValue(field, new Date(d.getTime() + d.getTimezoneOffset() * 60 * 1000))
                                }
                            } :
                                { onChange: formik.handleChange, value: formik.values[field] }}
                        error={Boolean(formik.touched[field] && formik.errors[field])}
                        helperText={formik.touched[field] && (formik.errors[field] || (name === 'Register' && field === 'password' && `Password strength: ${passwordStrength(formik.values.password)}`))}
                        {...field === 'password' && {
                            InputProps: {
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <Tooltip title={`${showPassword ? 'Hide' : 'Show'} password`} placement='left'>
                                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>)
                            }
                        }}
                    />
                    {inline && <>&nbsp;&nbsp;</>}
                </span>
            )
            }
            {!inline && <><br /><br /></>}
            {captcha && <Captcha />}
            <Button type='submit' variant='contained' color='primary'>{search ? 'Search' : name}</Button>
            {rememberMe &&
                <>
                    &nbsp;&nbsp;&nbsp;
                    <FormControlLabel
                        name='rememberMe'
                        label='Remember Me'
                        control={<Checkbox checked={formik.rememberMe} onChange={formik.handleChange} />}
                    />
                </>}
        </form>
    )
}