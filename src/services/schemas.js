import * as Yup from 'yup'

export const fieldInfo = {
    password: 'password',
    confirmPassword: 'password',
    profilePicture: 'file',
    createdAfter: 'date',
    createdBefore: 'date',
    expiredAt: 'date',
    uploadImage: 'file'
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const validateFileType = file => !file || ["image/jpg", "image/jpeg", "image/gif", "image/png"].includes(file.type)
const validateFileSize = file => !file || file.size < 1000000

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
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
    profilePicture: Yup.mixed()
        .nullable()
        .test('fileType', 'Only JPG, JPEG, PNG, GIF allowed', validateFileType)
        .test('fileSize', 'File must be ≤ 1 MB', validateFileSize),
    captcha: Yup.string()
        .required('CAPTCHA is required')
        .oneOf(['4'], 'Invalid CAPTCHA')
})

export const ResetPasswordSchema = Yup.object({
    password: Yup.string()
        .min(11, 'Password strength: weak')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
})

export const passwordStrength = ({ length }) => {
    if (length <= 10) return 'weak'
    else if (length <= 17) return 'moderate'
    else return 'strong'
}

export const loginSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
})

export const userSearchSchema = Yup.object({
    username: Yup.string(),
    email: Yup.string(),
    phone: Yup.string()
})

export const memeSchema = Yup.object({
    description: Yup.string()
        .required('Description is required')
        .min(1, 'Description must be between 1 and 500 characters')
        .max(500, 'Description must be between 1 and 500 characters'),
    imageUrl: Yup.string(),
    uploadImage: Yup.mixed()
        .nullable()
        .test('fileType', 'Only JPG, JPEG, PNG, GIF allowed', validateFileType)
        .test('fileSize', 'File must be ≤ 130 KB', validateFileSize),
    expiredAt: Yup.date()
})

export const lockedPageSchema = Yup.object({
    password: Yup.string().required('Password is required')
})


export const storySchema = Yup.object({
    description: Yup.string()
        .required('Description is required')
        .min(1, 'Description must be between 1 and 500 characters')
        .max(500, 'Description must be between 1 and 500 characters'),
    imageUrl: Yup.string(),
    uploadImage: Yup.mixed()
        .nullable()
        .test('fileType', 'Only JPG, JPEG, PNG, GIF allowed', validateFileType)
        .test('fileSize', 'File must be ≤ 130 KB', validateFileSize),
})

export const commentSchema = Yup.object({
    description: Yup.string()
        .required('Description is required')
        .min(1, 'Description must be between 1 and 500 characters')
        .max(500, 'Description must be between 1 and 500 characters'),
    imageUrl: Yup.string(),
    uploadImage: Yup.mixed()
        .nullable()
        .test('fileType', 'Only JPG, JPEG, PNG, GIF allowed', validateFileType)
        .test('fileSize', 'File must be ≤ 130 KB', validateFileSize),
})


export const memeSearchSchema = Yup.object({
    owner: Yup.string(),
    description: Yup.string(),
    createdAfter: Yup.date(),
    createdBefore: Yup.date()
})