export const serverUrl = 'http://localhost:3030'
export const apiUrl = 'https://ghostmeme.api.hscc.bdpa.org/v1'
export const apiKey = process.env.REACT_APP_API_KEY

export const nullifyUndefined = obj => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, v || null]))
export const deleteFromArray = (arr, e) => arr.splice(arr.indexOf(e), 1)

export const retry = async ({ status }, action, ...props) => {
    if (status === 555) return new Promise(resolve => setTimeout(() => { resolve(action(...props)) }, 2300))
    else return
}