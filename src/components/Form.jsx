import React from 'react'
import { upperFirst } from 'lodash/string'
import { useFormik } from 'formik'
import { Button, TextField, Typography } from '@material-ui/core'

import { fieldInfo, passwordStrength } from '../services/schemas'

export default function Form({ name, action, schema }) {
    const fields = Object.keys(schema.fields)
    const formik = useFormik({
        initialValues: fields.reduce((o, i) => ({ ...o, [i]: '' }), {}),
        validationSchema: schema,
        onSubmit: async values => action(values)
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <Typography>{name}</Typography>
            <div>
                {fields.map(field =>
                    <TextField
                        key={field}
                        fullWidth
                        id={field}
                        name={field}
                        label={upperFirst(field.replaceAll('_', ' '))}
                        type={fieldInfo[field]}
                        {...fieldInfo[field] === 'file' ?
                            { onChange: e => formik.setFieldValue(field, e.target.files[0]) } :
                            { onChange: formik.handleChange, value: formik.values[field] }}
                        error={Boolean(formik.touched[field] && formik.errors[field])}
                        helperText={formik.touched[field] && (formik.errors[field] || (field === 'password' && `Password strength: ${passwordStrength(formik.values.password)}`))}
                    />
                )}
            </div>
            <br />
            <Button type='submit' variant='contained' color='primary'>{name}</Button>
        </form>
    )
}