import superagent from 'superagent'

import { serverUrl } from '../var.js'

export async function getMemes() {
    try { return (await superagent.get(serverUrl,)).body }
    catch (err) { console.log('Error') }
}