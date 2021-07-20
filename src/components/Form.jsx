import React from 'react'
import { upperFirst } from 'lodash/string'
import { useFormik } from 'formik'
import { Button, TextField, Typography } from '@material-ui/core'


export default function Form({ name, action, schema }) {
    const fields = Object.keys(schema.fields)
    const formik = useFormik({
        initialValues: fields.reduce((o, i) => ({ ...o, [i]: "" }), {}),
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
                        type={['password', 'confirm_password'].includes(field) ? 'password' : ''}
                        value={formik.values[field]}
                        onChange={formik.handleChange}
                        error={Boolean(formik.touched[field] && formik.errors[field])}
                        helperText={formik.touched[field] && formik.errors[field]}
                    />
                )}
            </div>
            <br />
            <Button type='submit' variant='contained' color='primary'>{name}</Button>
        </form>
    )
}