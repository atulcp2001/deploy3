import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    // console.log('The token is',token)
    let isCoach = false
    let isAdmin = false
    let status = "Guest"

    if (token) {
        const decoded = jwtDecode(token)
        // console.log('The decoded token', decoded)
        const { username, roles } = decoded.UserInfo
        // console.log(username, roles)

        isCoach = roles.includes('Coach')
        isAdmin = roles.includes('Admin')

        if (isCoach) status = "Coach"
        if (isAdmin) status = "Admin"

        return { username, roles, status, isCoach, isAdmin }
    }

    return { username: '', roles: [], isCoach, isAdmin, status }
}
export default useAuth