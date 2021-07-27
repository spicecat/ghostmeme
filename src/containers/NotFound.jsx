import { Link } from 'react-router-dom'

export const NotFound = () => {

    return (
        <>
            Page not found (404)
            <br />
            <Link to='/'>Return Home</Link>
        </>
    )
}

export default NotFound