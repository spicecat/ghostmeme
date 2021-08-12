import { useEffect } from 'react'

import { List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

export default function Notifications({ user, incomingFriendRequests, mentions }) {

    return <>
        {JSON.stringify(incomingFriendRequests)}
        {JSON.stringify(mentions)}
    </>
}