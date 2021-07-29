import React from 'react'
import { upperFirst } from 'lodash/string'
import { useFormik } from 'formik'
import { Button, TextField, Typography, FormControlLabel, Checkbox } from '@material-ui/core'

import { fieldInfo, passwordStrength } from '../services/schemas'

export default function Form({ name, action, schema, search = false }) {
    const fields = Object.keys(schema.fields)
    const formik = useFormik({
        initialValues: fields.reduce((o, i) => ({ ...o, [i]: '' }), {}),
        validationSchema: schema,
        onSubmit: async values => action(values)
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            {search || <Typography>{name}</Typography>}
            {fields.map(field =>
                <span key={name + field}>
                    <TextField
                        size='small'
                        name={field}
                        label={upperFirst(field.split(/(?=[A-Z\s])/).join('_').replaceAll('_', ' '))}
                        type={fieldInfo[field]}
                        {...{ fullWidth: !search }}
                        {...fieldInfo[field] === 'date' && { InputLabelProps: { shrink: true } }}
                        {...fieldInfo[field] === 'file' ?
                            { onChange: e => formik.setFieldValue(field, e.target.files[0]) } :
                            { onChange: formik.handleChange, value: formik.values[field] }}
                        error={Boolean(formik.touched[field] && formik.errors[field])}
                        helperText={formik.touched[field] && (formik.errors[field] || (field === 'password' && name === 'Register' && `Password strength: ${passwordStrength(formik.values.password)}`))}
                    />
                    {search && <>&nbsp;&nbsp;</>}
                </span>
            )}
            {search || <><br /><br /><br /></>}
            <Button type='submit' variant='contained' color='primary'>{search ? 'Search' : name}</Button>
            &nbsp;&nbsp;&nbsp;
            {search || <FormControlLabel
                control={<Checkbox checked={formik.rememberMe} onChange={formik.handleChange} name='rememberMe' />}
                label='Remember Me'
            />}
        </form>
    )
}