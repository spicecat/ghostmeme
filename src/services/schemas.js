import * as Yup from 'yup' // { yup.object, number, yup.string, date, boolean, ref } 

export const fieldInfo = {
    password: 'password',
    confirm_password: 'password',
    profile_picture: 'file'
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const validateFileType = file => {
    console.log(file)
    return file === undefined || ["image/jpg", "image/jpeg", "image/gif", "image/png"].includes(file.type)
}
const validateFileSize = file => {
    console.log(file)
    return file === undefined || file.size < 2097152
}
export const registerSchema = Yup.object({
    name: Yup.string()
        .required('Full name is required'),
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email'),
    phone: Yup.string()
        .matches(phoneRegExp, 'Invalid phone number'),
    username: Yup.string()
        .required('Username is required')
        .min(4, 'Username should be of minimum 4 characters length')
        .matches(/^[a-zA-Z0-9_]+$/, 'Username cannot contain special characters'),
    password: Yup.string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    profile_picture: Yup.mixed()
        .nullable()
        .test('fileType', 'Only JPG, JPEG, PNG, GIF allowed', validateFileType)
        .test('fileSize', 'File must be ≤ 5 MB', validateFileSize),
    captcha: Yup.string()
        .required('CAPTCHA is required')
        .matches('4', 'Invalid CAPTCHA')
})

export const loginSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
})

export const memeSchema = Yup.object({
    owner: Yup.string().required(),
    receiver: Yup.string(),
    createdAt: Yup.date(),
    expiredAt: Yup.date(),
    description: Yup.string(),
    likes: Yup.number(),
    private: Yup.boolean(),
    replyTo: Yup.string(),
    imageUrl: Yup.string()
})