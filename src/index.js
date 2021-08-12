import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'reactive-react-redux'

import { deleteFromArray } from './var.js'

import App from './App'

const initialState = {
    user: { loading: true },
    friends: null,
    outgoingFriendRequests: [],
    incomingFriendRequests: [],
    likes: [],
    receivedChatsMemes: [],
    sentChatsMemes: [],
    friendsMemes: [],
    storyMemes: [],
    mentions: [],
    arr: [1, 2, 3]
}
const reducer = (state = initialState, { type, target, value }) => {
    switch (type) {
        case 'set': return { [target]: value, ...state }
        case 'push': return { [target]: state[target].concat(value), ...state }
        case 'delete': {
            deleteFromArray(state[target], value)
            return state
        }
        case 'add': {
            state[target][value[0]] = value[1]
            return state
        }
        default: return state
    }
}
const store = createStore(reducer)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))