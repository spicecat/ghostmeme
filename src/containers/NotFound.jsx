import { Link } from 'react-router-dom'
import PaperContent from '../components/Paper'

export const NotFound = () => {
    const NotFoundContent = () =>
        <>
            Page not found (404)
            <br />
            <Link to='/'>Return Home</Link>
        </>

    return (
        <>
            <PaperContent Component={NotFoundContent} />
        </>
    )
}

export default NotFound