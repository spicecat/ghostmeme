import { object, number, string, date, boolean, ref } from 'yup'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const registerSchema = object({
    name: string()
        .required('Full name is required'),
    email: string()
        .required('Email is required')
        .email('Invalid email'),
    phone: string()
        .matches(phoneRegExp, 'Invalid phone number'),
    username: string()
        .required('Username is required')
        .min(4, 'Username should be of minimum 4 characters length')
        .matches(/^[a-zA-Z0-9_]+$/, 'Username cannot contain special characters'),
    password: string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    confirm_password: string()
        .oneOf([ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    captcha: string()
        .required('CAPTCHA is required')
        .matches('4', 'Invalid CAPTCHA'),
})

export const loginSchema = object({
    username: string().required('Username is required'),
    password: string().required('Password is required')
})

export const memeSchema = object({
    owner: string().required(),
    receiver: string(),
    createdAt: date(),
    expiredAt: date(),
    description: string(),
    likes: number(),
    private: boolean(),
    replyTo: string(),
    imageUrl: string()
})