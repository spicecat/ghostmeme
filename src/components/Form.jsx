
import { upperFirst } from 'lodash/string'
import { useFormik } from 'formik'
import { Button, TextField, Typography, FormControlLabel, Checkbox } from '@material-ui/core'

import captchaSrc from '../assets/captcha.jpg'

import { fieldInfo, passwordStrength } from '../services/schemas'

const Captcha = () =>
    <div>
        <img src={captchaSrc} alt='CAPTCHA' />
        <br /><br />
    </div>
const formatLabel = field => upperFirst(field.split(/(?=[A-Z\s])/).join('_').replaceAll('_', ' '))

export default function Form({ name, action, schema, rememberMe = false, search = false, inline = search }) {
    const fields = Object.keys(schema.fields), captcha = fields.includes('captcha')
    const formik = useFormik({
        initialValues: fields.reduce((o, i) => ({ ...o, [i]: '' }), {}),
        validationSchema: schema,
        onSubmit: async values => action(values)
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            {inline || <Typography>{name}</Typography>}
            {fields.map(field =>
                <span key={name + field}>
                    <TextField
                        size='small'
                        name={field}
                        label={name === 'Login' && field === 'username' ? 'Username or Email' : formatLabel(field)}
                        type={fieldInfo[field]}
                        {...{ fullWidth: !inline }}
                        {...(fieldInfo[field] === 'date' || fieldInfo[field] === 'file') && { InputLabelProps: { shrink: true } }}
                        {...fieldInfo[field] === 'file' ?
                            { onChange: e => formik.setFieldValue(field, e.target.files[0]) } :
                            { onChange: formik.handleChange, value: formik.values[field] }}
                        error={Boolean(formik.touched[field] && formik.errors[field])}
                        helperText={formik.touched[field] && (formik.errors[field] || (name === 'Register' && field === 'password' && `Password strength: ${passwordStrength(formik.values.password)}`))}
                    />
                    {inline && <>&nbsp;&nbsp;</>}
                </span>
            )}
            {inline || <><br /><br /></>}
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