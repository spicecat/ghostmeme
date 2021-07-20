import { object, number, string, date, boolean, ref } from 'yup'

export const registerSchema = object({
    name: string()
        .required('Full name is required'),
    email: string()
        .required('Email is required'),
    phone: string()
        .required('Phone number is required'),
    username: string()
        .required('Username is required')
        .min(4, 'Username should be of minimum 4 characters length')
        .matches(/^[a-zA-Z0-9_]+$/, 'Username cannot contain special characters'),
    password: string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    confirm_password: string()
        .oneOf([ref('password'), null], 'Passwords must match')
        .required('Password is required')
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