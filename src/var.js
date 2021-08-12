import { identity } from 'lodash'

export const serverUrl = 'http://localhost:3030'
export const apiUrl = 'https://ghostmeme.api.hscc.bdpa.org/v1'
export const apiKey = process.env.REACT_APP_API_KEY

export const nullifyUndefined = obj => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, v || null]))
export const deleteFromArray = (arr, e) => arr.splice(arr.indexOf(e), 1)

export const delay = async (delay, action = identity, props = []) => new Promise(res => setTimeout(() => res(action(...props)), delay))
export const retry = async ({ status }, action, ...props) => {
    if (status === 555) return delay(1300, action, props)
    else return
}

export const toBase64 = file => new Promise(resolve => {
    try {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
    }
    catch { resolve(file) }
})