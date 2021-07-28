import * as Yup from 'yup'

export const fieldInfo = {
    password: 'password',
    confirm_password: 'password',
    profile_picture: 'file'
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const validateFileType = file => file === undefined || ["image/jpg", "image/jpeg", "image/gif", "image/png"].includes(file.type)
const validateFileSize = file => file === undefined || file.size < 131072

export const registerSchema = Yup.object({
    name: Yup.string()
        .required('Full name is required')
        .min(3, 'Name must be between 3 and 30 characters')
        .max(30, 'Name must be between 3 and 30 characters'),
    // .matches(/^[a-zA-Z0-9_]+$/, 'Name cannot contain special characters'),
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email')
        .min(5, 'Email must be between 5 and 50 characters')
        .max(50, 'Email must be between 5 and 50 characters'),
    phone: Yup.string()
        .matches(phoneRegExp, 'Invalid phone number'),
    username: Yup.string()
        .required('Username is required')
        .min(5, 'Username must be between 5 and 20 characters')
        .max(20, 'Username must be between 5 and 20 characters')
        .matches(/^[a-zA-Z0-9_]+$/, 'Username cannot contain special characters'),
    password: Yup.string()
        .min(11, 'Password strength: weak')
        .required('Password is required'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    profile_picture: Yup.mixed()
        .nullable()
        .test('fileType', 'Only JPG, JPEG, PNG, GIF allowed', validateFileType)
        .test('fileSize', 'File must be ≤ 130 KB', validateFileSize),
    captcha: Yup.string()
        .required('CAPTCHA is required')
        .matches('4', 'Invalid CAPTCHA')
})

export const passwordStrength = ({ length }) =>
    length <= 10 ? 'weak' : length <= 17 ? 'moderate' : 'strong'

export const loginSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
})

export const memeSchema = Yup.object({
    // owner: Yup.string().required(),
    receiver: Yup.string(),
    // createdAt: Yup.date(),
    // expiredAt: Yup.date(),
    description: Yup.string()
        .required('Description is required')
        .min(1, 'Description must be between 1 and 500 characters')
        .max(500, 'Description must be between 1 and 500 characters'),
    // likes: Yup.number(),
    // private: Yup.boolean(),
    replyTo: Yup.string(),
    imageUrl: Yup.string()
})